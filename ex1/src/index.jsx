import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = ({cource}) => <h1>{cource}</h1>

const Contents = ({parts}) => (parts.map(el => <Part parts={parts}/>))

const Part = ({parts}) => parts.map(el => <p>{el.name} {el.exercises}</p>)

const Total = ({parts}) => <p>Total {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>

const App = () => {
  const course = 'Superadvanced web and mobile programming'
  const parts = [
    {
      name: 'Basics of React',
      exercises: 8
    }, {
      name: 'Using props',
      exercises: 10
    }, {
      name: 'Component states',
      exercises: 12
    }
  ]
  return (
    <div className="App">
      <Header cource={course}/>
      <Contents parts={parts}/>
      <Total parts={parts}/>
    </div>
  );

}

export default App;

ReactDOM.render(
  <App/>, document.getElementById('root'));
