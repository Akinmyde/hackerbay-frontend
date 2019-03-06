import React from 'react';
const Form = ({onInputChange, onButtonClick, error}) => (
  <form>
    <label className='error'>{error}</label>
    <div>
      <label htmlFor='height'>No of Heigth: </label>
      <input onChange={onInputChange} name='height' id='height' type='text' required />
    </div>
    <div>
      <label htmlFor='width'>No of Width: </label>
      <input onChange={onInputChange} name='width' id='width' type='text' required />
    </div>
    <div>
      <button className='form' onClick={onButtonClick}>Continue</button>
    </div>
  </form>
)

export default Form;