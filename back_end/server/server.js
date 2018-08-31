const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const OK = 200;
const CREATED = 201;
const SEE_OTHER = 303;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;
const NO_CONTENT = 204;

const serve = (port, model)=> {
  const app = express();
  app.locals.model = model;
  app.locals.port = port;
  setupRoutes(app);
  app.listen(port, function() {
    console.log(`listening on port ${port}`);
  });
}

module.exports = {
  serve: serve
}


const setupRoutes = (app) => {
  app.use(bodyParser.json());
  app.use(cors());
  app.post('/users/registration', newUser(app));
  app.post('/users/login', loginUser(app));
  app.put('/users/:username', updateUser(app));
  app.get('/users/:username/favourites', getUserFavourites(app));
}

const requestUrl = (req)=> {
  const port = req.app.locals.port;
  return `${req.protocol}://${req.hostname}:${port}${req.originalUrl}`;
}


const newUser = (app) => {
  return (request, response) => {
    const username = request.body.username;
    const pw = request.body.pw;
    //console.log(username+'  '+pw);
    request.app.locals.model.db_ops.newUser(username, pw)
      .then((res)=>{
        res===username? response.sendStatus(CREATED): response.sendStatus(CONFLICT);
      })
      .catch((err)=>{
        console.log(new Error(err));
        response.sendStatus(SERVER_ERROR);
      })
  }
}

const loginUser = (app) => {
  return (request, response) => {
    const username = request.body.username;
    const pw = request.body.pw;
//    console.log(username+'  '+pw);
    request.app.locals.model.db_ops.loginUser(username, pw)
      .then((res)=>{
        res.length!==0? response.sendStatus(OK): response.sendStatus(NOT_FOUND);
      }).catch((err)=>{
        console.log(new Error(err));
        response.sendStatus(SERVER_ERROR);
      })
  }
}

const updateUser = (app) => {
  return (request, response) => {
    const username = request.params.username;
    const favourites = request.body.favourites;
    request.app.locals.model.db_ops.updateUser(username, favourites)
      .then((res)=>{
        res===1? response.sendStatus(NO_CONTENT):response.sendStatus(NOT_FOUND);
      })
  }
}

const getUserFavourites = (app) => {
  return (request, response) => {
    const username = request.params.username;
    request.app.locals.model.db_ops.getUserFavourites(username)
      .then((res) => {
        if(res.length!==0) {
              const obj = {'username': res[0]._id, 'favourites': res[0].favourites};
              response.statusCode = OK;
              response.json(obj);
        }else{
             response.sendStatus(NOT_FOUND);
           }
      }).catch((err)=>{
        console.log(new Error(err));
        response.sendStatus(SERVER_ERROR);
      })
  }
}
