import React from 'react';
const Move = ({value, id, onMove}) => (
  <button className='btn' id={id} onClick={onMove}>{value}</button>
)

export default Move;