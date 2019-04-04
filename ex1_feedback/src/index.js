import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Static = ({name, value, percentage, identifier}) => <tr key={identifier}><td>{name}</td><td>{value}</td></tr>

const App = () => {

    // Using hooks to challenge myself link: https://reactjs.org/docs/hooks-intro.html
    const [values, setValues] = useState({good: 0, neutral: 0, negative: 0, average: 0, positive: 0})

    function handleClick(key) {
        setValues({[key]: values[key]++, ...values});
        
        const average = Math.floor(((values.good - values.negative) / (values.good + values.neutral + values.negative))*1000) / 1000
        const positive = Math.floor(values.good / (values.good + values.negative + values.neutral)*1000)/10 + " %";

        setValues({...values, average, positive})
    }

    const keys = Object.keys(values)
    return (
        <div className="app">
            <h1>Anna Palautetta</h1>
            <button onClick={() => handleClick("good")}>good</button>
            <button onClick={() => handleClick("neutral")}>neutral</button>
            <button onClick={() => handleClick("negative")}>negative</button>
            <h2>Statiikka</h2>
            <table>
                <tbody>
                    {values.good || values.neutral || values.negative ? 
                        keys.map(el => <Static name={el} value={values[el]} key={el}/>)
                        : <tr><td>Yhtään palautetta ei löytynyt</td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

