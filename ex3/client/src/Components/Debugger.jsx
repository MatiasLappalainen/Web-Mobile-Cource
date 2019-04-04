import React from 'react';

const styles = {
  position: 'abolute',
  background: '#2F4F4F',
  color: 'white',
  right: '0px',
  width: '100%',
  height: '100%'
};

const Debugger = ({ data }) => {
  console.log(styles);
  return <pre style={styles}>{JSON.stringify(data, undefined, 2)}</pre>;
};

export default Debugger;
