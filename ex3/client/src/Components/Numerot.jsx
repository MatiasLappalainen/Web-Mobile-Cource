import React from 'react';

const Numerot = ({ data, handleClick }) => {
  return (
    <div>
      <h2>Numerot</h2>
      <ul>
        {data &&
          data.map(el => (
            <li key={el.id}>
              {el.name} {el.number}{' '}
              <button key={el.name + el.id} onClick={() => handleClick(el.id)}>
                poista
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Numerot;
