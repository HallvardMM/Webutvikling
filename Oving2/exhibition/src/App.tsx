import React, { useState } from 'react';
import './App.css';
import DropDown from './components/DropDown';
import Exhibition from './components/Exhibition';
import { ThemeContext, Theme } from './context/ThemeContext';
import StorageKeysContext from './context/StorageContext';

export default function App() {
  //Get theme and set theme state used to set state in context
  const [theme, setTheme] = useState(Theme.Blue);

  return (
    <ThemeContext.Provider value={{ Theme: theme, update: setTheme }}>
      <ThemeContext.Consumer>
        {(value) => (
          <div
            className='App'
            id='App'
            style={{ backgroundColor: value.Theme.BackgroundColor }}
          >
            <StorageKeysContext.Provider
              value={['favoritArt', 'speedOfRotation']}
            >
              <div className='DropDown'>
                <DropDown></DropDown>
              </div>
              <div className='Main'>
                <h1 className='mainTitle'>Worlds Greatest Art Exhibition!</h1>
                <Exhibition></Exhibition>
                <h2 className='about'>About the exhibition</h2>

                <h4 className='text'>Info</h4>

                <p className='text'>
                  This exhibition is made to combine different artistic mediums
                  to a large art piece. The exhibition contains eight art
                  pieces with a picture made in SVG, a title, sound and the
                  first line from a poem randomly collected from{' '}
                  <a
                    href='https://poetrydb.org/index.html'
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    poetryDB.
                  </a>
                </p>

                <h4 className='text'>Additions</h4>

                <p className='text'>
                  By user request we added the possibility to save a art piece.
                  You can do so by favoriting an image by clicking the star
                  button. Next time you look at the picture the star button is
                  marked and the poem is the same as the saved one. If you unfavorit a new poem wil be added next time.
                </p>
                <p className='text'>
                  Rotation is default 10s and can be changed in settings. The change will be saved until you close your browser.
                  Apply be pressing enter after writing in a number from 1s to how high you want in seconds.
                  You can pause with pause-button and it will automatically pause if you change picture manually.
                </p>
                <p className='text'>
                  In settings you can change color theme and it will stay the same until you refresh the page.
                </p>
                <p className='text'>
                  It is added fitting music to the art. If you want to enjoy the art in silence you can press the sound-button and mute.
                </p>

                <ul>
                  <b className='text'>Credits for the music and sound</b>
                  <li className='text'>
                    Abstract: Piano Horror - Francisco Alvear{' '}
                    <a
                      href='https://mixkit.co/free-stock-music/'
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      Link to song
                    </a>
                  </li>
                  <li className='text'>
                    Car: Car sounds from 1:00 - 1:08{' '}
                    <a
                      href='https://www.youtube.com/watch?v=hWrwloX6H9U&ab_channel=19Bozzy92'
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      Link to sounds
                    </a>
                  </li>
                  <li className='text'>
                    Desert: Sun and His Daughter - Eugenio Mininni{' '}
                    <a
                      href='https://mixkit.co/free-stock-music/'
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      Link to song
                    </a>
                  </li>
                  <li className='text'>
                    Duff: Comical - Ahjay Stelino{' '}
                    <a
                      href='https://mixkit.co/free-stock-music/'
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      Link to song
                    </a>
                  </li>
                  <li className='text'>
                    Head: Hip Hop 02 - Lily J{' '}
                    <a
                      href='https://mixkit.co/free-stock-music/'
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      Link to song
                    </a>
                  </li>
                  <li className='text'>
                    House: Spirit in the Woods - Alejandro Magaña (A. M.){' '}
                    <a
                      href='https://mixkit.co/free-stock-music/'
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      Link to song
                    </a>
                  </li>
                  <li className='text'>
                    ProgPils: Games Worldbeat - Bernardo R.{' '}
                    <a
                      href='https://mixkit.co/free-stock-music/'
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      Link to song
                    </a>
                  </li>
                  <li className='text'>
                    TwoHouse: Sugar Baby - Dock Boggs{' '}
                    <a
                      href='http://www.openmusicarchive.org/search.php'
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      Link to song
                    </a>
                  </li>
                </ul>
              </div>
            </StorageKeysContext.Provider>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );
}
