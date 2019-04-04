import React, { useState, useEffect } from 'react';
import Numerot from './Components/Numerot';
import Form from './Components/Form';
import Debugger from './Components/Debugger';
import axios from 'axios';

import './App.css';

// Using hooks again for learning purpose
// Added debugger for easy state tracking with hooks

const App = () => {
  // Define states using hooks
  // initialized is used to create componentDidMount like effect
  const [initialized, setInitialized] = useState(false);
  const [persons, addPersons] = useState([]);
  const [newName, addNewName] = useState('');
  const [number, addNumber] = useState('');

  // Used for looking state in real time,
  // if you don't want the to see json in html
  // just change flag to false
  let debug = true;

  useEffect(() => {
    // Check if component is "initialized"
    if (!initialized) {
      axios
        .get('/api/persons')
        .then(res => {
          // Prevent useless state updates
          if (persons !== res.data) addPersons(res.data);
          else return;
        })
        .catch(err => {
          console.log(err);
        });
    }

    // "Initialize" component
    setInitialized(true);
  });

  // handleSubmit handles adding number to state,
  // and then posts to server using axios.
  // also resets fields and fetches id:s for elements
  const handleSubmit = e => {
    e.preventDefault();

    addPersons([...persons, { name: newName, number: number }]);

    axios
      .post('/api/persons', { name: newName, number: number })
      .then(res => {
        // Resets fields
        addNewName('');
        addNumber('');
        setInitialized(false);
      })
      .catch(err => console.log(err));
  };

  // Handles deleting list element
  // first confirms from user and then deletes if confirmed
  const handleDelete = id => {
    if (!window.confirm('Are you sure you want to delete from phonebook?'))
      return;
    axios
      .delete(`/api/persons/${id}`)
      .then(res => {
        setInitialized(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Form
        handleClick={handleSubmit}
        addName={addNewName}
        addNumber={addNumber}
        number={number}
        name={newName}
      />
      {/*If list is empty don't display anything */}
      <div className="container">
        {persons && <Numerot data={persons} handleClick={handleDelete} />}
        {debug && <Debugger data={persons} />}
      </div>
    </div>
  );
};

export default App;
