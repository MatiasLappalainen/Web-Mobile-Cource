const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Require mongo module so we can have cleaner code,
// and have some structure in the project
// Done for good practices
const mongo = require('./mongo.js');

const PORT = process.env.PORT || 3001;

const data = require('./data.json');

app.use(express.static(path.join(__dirname, './client/build/')));
console.log(__dirname);
app.use(bodyParser.json());

console.log(process.argv);

app.get('/api/persons', (req, res) => {
  mongo
    .fetchData({})
    .then(person => {
      res.send(person);
    })
    .catch(err => {
      res.send({ error: 'Error in fetching data' });
    });
});

// returns person with id same as in the url
// ex http://localhost:3001/api/persons/1
app.get('/api/persons/:id', (req, res) => {
  mongo
    .fetchData({ id: parseInt(req.params.id) })
    .then(res => {
      res.send(res);
    })
    .catch(err => {
      // if there's no such a id send status code 404 indicating that there's no content
      if (!res) res.status(404);
    });
});

// deletes data from mongodb
app.delete('/api/persons/:id', (req, res) => {
  // must parseInt since req.params is a string
  const id = parseInt(req.params.id);

  mongo
    .deleteData(id)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/api/persons', (req, res) => {
  let isValid = true;

  // Create if even when data has already id
  // Not using the Math.random because it's not safe
  // this will return the last elements id and add one to it
  // which should be more safe

  // Get name and number from req.body
  const { name, number } = req.body;

  mongo.getCollectionLength().then(response => {
    req.body.id = response;

    // Loops through data and checks that everything is unique
    mongo.fetchData().then(response => {
      // Bad practice but oh well
      let unique = true;
      response.forEach(el => {
        if (el.name === name || el.number === number) {
          unique = false;
        }
      });
      console.log(unique);
      if (!unique) {
        res.send({ error: 'name must be unique' });
        return;
      }

      // Check if data is valid and there's no undefined entrie
      if (name && number) {
        mongo
          .sendData(req.body)
          .then(response => {
            res.send(response);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        res.send('One or more fields are undefined');
      }
    });
  });
});

app.listen(PORT, () => console.log('Server listening on port: ', PORT));
