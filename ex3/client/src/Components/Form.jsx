import React from 'react';

const Form = ({ addName, addNumber, handleClick, number, name }) => {
  return (
    <form>
      <div>
        nimi: <input onChange={e => addName(e.target.value)} value={name} />
      </div>
      <div>
        Numero:{' '}
        <input onChange={e => addNumber(e.target.value)} value={number} />
      </div>
      <div>
        <button type="submit" onClick={handleClick}>
          lisää
        </button>
      </div>
    </form>
  );
};

export default Form;
