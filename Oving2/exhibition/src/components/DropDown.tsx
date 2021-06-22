import React, { useState, useContext, CSSProperties } from 'react';
import DropDownMenu from './Settings';
import { ReactComponent as Settings } from './icons/settings.svg';
import { ThemeContext } from '../context/ThemeContext';
import './DropDown.css';

export default function Dropdown() {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const context = useContext(ThemeContext);

  const settingsButtonColor: CSSProperties = {
    backgroundColor: context.Theme.BoxColor,
    color: context.Theme.FrameColor,
    borderColor: context.Theme.FrameColor,

  }

  return (
    <div className='DropDown'>
      <div>
        <button className="settingsButton" style={settingsButtonColor} onClick={() => setDropDownOpen(!dropDownOpen)}><Settings></Settings></button>
      </div>
      <div>{dropDownOpen ? <DropDownMenu /> : <div />}</div>
    </div>
  );
}
