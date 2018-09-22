#!/usr/bin/env nodejs

const assert = require('assert');
const mongo = require('mongodb').MongoClient;
const process = require('process');

//const products = require('./model/initDB');
const model = require('./model/model');
const server = require('./server/server');

const DB_URL = 'mongodb://localhost:27017/movie_app';


function getPort(argv) {
  let port = Number(argv[2]) || 8080;
    return port;
}

const port = getPort(process.argv);


mongo.connect(DB_URL, { useNewUrlParser: true }).
  then(function(client) {
  //  console.log('db', db);
    const m = new model.Model(client);
    server.serve(port, m);
    //db.close();
  }).
  catch((e) => console.error(e));
