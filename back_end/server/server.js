const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fetch = require('isomorphic-fetch');
const bcrypt = require('bcryptjs');

const OK = 200;
const CREATED = 201;
const SEE_OTHER = 303;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;
const NO_CONTENT = 204;

const  token_time = 1*60*1000;

const salt = bcrypt.genSaltSync(10);

const api_key = '24786ae86c770b971c0c4549de40dea7';

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
  app.use(function (req, res, next) {
    res.setHeader('content-type', 'application/json');
    next();
  });
  app.post('/users/:username/registration', newUser(app));
  app.post('/users/:username/login', loginUser(app));
  app.put('/users/:username/favorites', updateUser(app));
  app.get('/users/:username/favorites', getUserfavorites(app));
  app.get('/users/:username/type=:type&page=:page', getmovielist(app));
  app.get('/users/:username/list?', getFavoritelist(app));
}

const createApiUrl = (type, key, page) => {
  return 'https://api.themoviedb.org/3/movie/'+type+'?api_key='+api_key+'&page='+page+'&language=en-US';
}

const getFavoritelist = (app) => {
  return (request, response) => {
    const q = request.query.favorites.split(',');
    const user = request.params.username;
    //console.log('q', q);
    const authToken = request.headers.authorization;
    if(!authToken){
      response.status(BAD_REQUEST).json({'message':'authorization token missing'})
    }
    const token = authToken.split(' ')[1];
    jwt.verify(token, 'key', function(err, decoded){
      if(err){
        response.status(UNAUTHORIZED).json({'message':'authorization token expired or invalid'});
      }else{
        let details = []
        q.forEach(qq=>{
          fetch("https://api.themoviedb.org/3/movie/"+qq+"?api_key=24786ae86c770b971c0c4549de40dea7")
          .then(r=> r.json())
          .then(res=> {
            if(res.status_code!==34)
            details.push(res)})
          });

          let _promises = q.map(qq=>{
            return fetch("https://api.themoviedb.org/3/movie/"+qq+"?api_key=24786ae86c770b971c0c4549de40dea7");
          })
          let results = []
          Promise.all(_promises)
          .then((promisesNew)=>{
            let newP = promisesNew.map(p => {return p.json()});

            Promise.all(newP)
              .then(result=>{
                const rr = result.map(r=>r.id);
                const token = generateToken(user);
                response.status(OK);
                response.json({
                  token,
                  data: result
                })
              })
          })
        }
      });
    }
  }

  const getmovielist = (app) => {
    return (request,response) => {
      const params = request.params;
      const url = createApiUrl(params.type, params.api_key, params.page);
      const authToken = request.headers.authorization;
      if(!authToken){
        response.status(BAD_REQUEST).json({'message':'authorization token missing'})
      }
      const token = authToken.split(' ')[1];
      jwt.verify(token, 'key', function(err, decoded){
        if(err){
          response.status(UNAUTHORIZED).json({'message':'authorization token expired or invalid'});
        }else{
          fetch(url)
          .then(res => res.json())
          .then(data => {
            const token = generateToken(params.username);
            response.status(OK).json({data: data, token});
          })
        }
      })
    }
  }


  const newUser = (app) => {
    return (request, response) => {
      const username = request.params.username;
      const pw = request.body.pw;
      //  console.log(username+'  '+pw);
      const hash = bcrypt.hashSync(pw, salt);
      request.app.locals.model.db_ops.newUser(username, hash)
      .then((res)=>{
        if(res===username){
          const token = generateToken(res._id, request.app.locals.model.secretKey);
          response.status(CREATED).json({user:res, token});
        }else{
          response.sendStatus(CONFLICT);
        }
      })
      .catch((err)=>{
        console.log(new Error(err));
        response.sendStatus(SERVER_ERROR);
      })
    }
  }

  const loginUser = (app) => {
    return (request, response) => {
      const username = request.params.username;
      const pw = request.body.pw;
      //    console.log(username+'  '+pw);
      request.app.locals.model.db_ops.loginUser(username)
      .then((res)=>{
        if(res){
          bcrypt.compare(pw, res.pw)
          .then(valid => {
            if(valid){
            const token = generateToken(res._id);
            response.status(OK).json({
              token,
              user: res
            })
          }else{
          response.sendStatus(NOT_FOUND);
          }
          })
        }else{
          response.sendStatus(NOT_FOUND);
        }
      }).catch((err)=>{
        console.log(new Error(err));
        response.sendStatus(SERVER_ERROR);
      })
    }
  }

  const updateUser = (app) => {
    return (request, response) => {
      //  console.log(request);
      const username = request.params.username;
      const favorites = request.body.favorites;
      const authToken = request.headers.authorization;
      if(!authToken){
        response.status(BAD_REQUEST).json({'message':'authorization token missing'})
      }
      const token = authToken.split(' ')[1];
      jwt.verify(token, 'key', function(err, decoded){
        if(err){
          response.status(UNAUTHORIZED).json({'message':'authorization token expired or invalid'});
        }else{
          request.app.locals.model.db_ops.updateUser(username, favorites)
          .then((res)=>{
            if(res===1){
              const token = generateToken();
              //  console.log(token);
              response.status(OK).json({token});
              //        console.log(response);
            }else{
              response.sendStatus(NOT_FOUND);
            }
          })
        }
      })
    }
  }

  const getUserfavorites = (app) => {
    return (request, response) => {
      const username = request.params.username;
      const authToken = request.headers.authorization;
      if(!authToken){
        response.status(BAD_REQUEST).json({'message':'authorization token missing'})
      }

      const token = authToken.split(' ')[1];
      jwt.verify(token, 'key', function(err, decoded){
        if(err){
          response.status(UNAUTHORIZED).json({'message':'authorization token expired or invalid'});
        }else{
          request.app.locals.model.db_ops.getUserfavorites(username)
          .then((res) => {
            if(res.length!==0) {
              const obj = {'username': res[0]._id, 'favorites': res[0].favorites};
              const token = generateToken(res[0]._id);
              response.status(OK);
              //            console.log(res[0].favorites);
              response.json({
                token,
                data: res[0].favorites });
              }else{
                response.status(NOT_FOUND);
                response.json({
                  data: 'invalid session' });
                }
              }).catch((err)=>{
                console.log(new Error(err));
                response.sendStatus(SERVER_ERROR);
              })
            }
          })
        }
      }

      const generateToken = (username, key) => {
        const payload= {
          username: username
        }

        const token = jwt.sign(payload, 'key', {
          expiresIn: "1m"
        })

        return token;
      }
