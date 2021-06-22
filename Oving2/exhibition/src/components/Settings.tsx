import React, { useState, useContext, CSSProperties } from 'react';
import './Settings.css';
import { ThemeContext, Theme } from '../context/ThemeContext';
import storageKeysContext from '../context/StorageContext';

export default function DropDownMenu() {
  const StorageKeys = useContext(storageKeysContext); //Storage keys on form [Local, Session]
  const context = useContext(ThemeContext); //ColorTheme as context
  const [selectValue, setSelectValue] = useState(Theme.Dummy); //State for value in selector

  const settingsColor: CSSProperties = {
    backgroundColor: context.Theme.BoxColor,
    borderColor: context.Theme.FrameColor,
  };

  const handleSelectorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    //Update colortheme in contex and value for selector.
    const value = JSON.parse(event.target.value);
    if (value.backgroundColor !== 'Dummy') {
      setSelectValue(JSON.parse(event.target.value));
      context.update(JSON.parse(event.target.value));
    }
  };

  return (
    <div id='myDropdown' className='DropDownContent' style={settingsColor}>
      <div>Color Theme:</div>
      <select
        className='ThemeSelector'
        value={JSON.stringify(selectValue)}
        onChange={(event) => handleSelectorChange(event)}
      >
        <optgroup className='options'>
          <option value={JSON.stringify(Theme.Dummy)}>--Select--</option>
          <option value={JSON.stringify(Theme.Blue)}>Blue</option>
          <option value={JSON.stringify(Theme.Sand)}>Sand</option>
          <option value={JSON.stringify(Theme.Pink)}>Pink</option>
          <option value={JSON.stringify(Theme.Green)}>Green</option>
        </optgroup>
      </select>
      <div className='DropDownItem'>
        Speed of rotation (sec):{' '}
        <input
          type='number'
          min='1'
          className='Input'
          id='NumberOfSec'
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              let number = (document.getElementById(
                'NumberOfSec'
              )! as HTMLInputElement).value;
              //Using sessionStorage for the speed of rotating art
              sessionStorage.removeItem(StorageKeys[1]);
              sessionStorage.setItem(StorageKeys[1], number);
            }
          }}
        ></input>
      </div>
    </div>
  );
}
