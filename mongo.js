const mongoose = require('mongoose');
const credentials = require('./credentials.json');
const data = require('./data.json');
const _ = require('lodash');

const url = `mongodb://${credentials.user}:${
  credentials.password
}@ds159025.mlab.com:59025/heroku_lp97b5gt`;
const Person = mongoose.model('Person', {
  name: String,
  number: String,
  id: Number
});

mongoose.connect(url);

module.exports = {
  // In order to connection to work you need to create credentials.json file,
  // with field user: 'your username here' and password: 'your password here'

  fetchData(params) {
    return Person.find(params);
  },
  mongoClose() {
    return mongoose.connection.close();
  },
  sendData(data) {
    const person = new Person(data);
    return person.save();
  },
  deleteData(id) {
    return Person.remove({ id: id });
  },
  getCollectionLength() {
    return Person.countDocuments();
  }
};
