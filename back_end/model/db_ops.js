const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

const DB_NAME = 'movie_app';

var users;

function DB_ops(client) {
  this.client = client;
  users = client.db().collection(DB_NAME);
}

DB_ops.prototype.newUser = (username, pw) => {
  const details = { _id: username,
                    pw: pw,
                    favorites:[]}
  return users.insertOne(details)
    .then((user)=>{
      return new Promise((resolve, reject) => {
        resolve(user.insertedId);
      })
    }).catch((err)=> {
      return new Error(err);
    })
}

DB_ops.prototype.loginUser = (username, pw) => {
  const details = {_id: username,
                    pw: pw};
  return users.find(details).toArray()
    .then((user)=>{
      return new Promise((resolve, reject) => {
        resolve(user[0]);
      })
    }).catch((err) => {
      return new Error(err);
    })
}

DB_ops.prototype.updateUser = (username, favorites) => {
  return users.updateOne({_id:username}, {$set:{favorites: favorites}})
    .then((user)=>{
      return new Promise((resolve, reject) => {
        resolve(user.matchedCount);
      })
    }).catch((err)=> {
      return new Error(err);
    })
}

DB_ops.prototype.getUserfavorites = (username) => {
  const details = {_id:username};
  return users.find(details).toArray()
    .then(user => {
      return new Promise((resolve, reject) => {
        resolve(user);
      })
    }).catch((err)=>{
      return new Error(err);
    })
}


module.exports = {
  DB_ops: DB_ops,
};
