import React, { useState, useEffect, useContext, CSSProperties } from 'react';
import './Exhibition.css';

import Art from './Art';
import Sound, { songs } from './sounds/Sound';
import storageKeysContext from '../context/StorageContext';
import { ThemeContext } from '../context/ThemeContext';

import { ReactComponent as TwoHouses } from '../Pictures/twoHouses.svg';
import { ReactComponent as Desert } from '../Pictures/desert.svg';
import { ReactComponent as House } from '../Pictures/house.svg';
import { ReactComponent as Head } from '../Pictures/head.svg';
import { ReactComponent as Racecar } from '../Pictures/racecar.svg';
import { ReactComponent as Abstract } from '../Pictures/abstract.svg';
import { ReactComponent as ProgPils } from '../Pictures/progPils.svg';
import { ReactComponent as Duff } from '../Pictures/duff.svg';
import { ReactComponent as Pause } from './icons/pause.svg';
import { ReactComponent as Play } from './icons/play.svg';
import { ReactComponent as Star } from './icons/star.svg';
import { ReactComponent as UnStar } from './icons/unstar.svg';
import { ReactComponent as Audio } from './icons/audio.svg';
import { ReactComponent as Mute } from './icons/mute.svg';

import '../Pictures/twoHouses.css';
import '../Pictures/desert.css';
import '../Pictures/house.css';
import '../Pictures/head.css';
import '../Pictures/racecar.css';
import '../Pictures/abstract.css';
import '../Pictures/progPils.css';
import '../Pictures/duff.css';

interface ArtPiece {
    Title: string;
    Picture: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    Music: typeof songs.Abstract;
}

const TheArt: Record<number, ArtPiece> = {
    /*Record with the art installations */
    0: { Title: 'Abstract', Picture: Abstract, Music: songs.Abstract },
    1: { Title: 'Car', Picture: Racecar, Music: songs.Car },
    2: { Title: 'Desert', Picture: Desert, Music: songs.Desert },
    3: { Title: 'Duff', Picture: Duff, Music: songs.Duff },
    4: { Title: 'Head', Picture: Head, Music: songs.Head },
    5: { Title: 'House', Picture: House, Music: songs.House },
    6: { Title: 'ProgPils', Picture: ProgPils, Music: songs.ProgPils },
    7: { Title: 'TwoHouses', Picture: TwoHouses, Music: songs.TwoHouse },
};

const noOutOfBounds = (number: number) => {
    /* Checks if picture is outside of range and creates a sirkling effect */
    switch (number) {
        case -1:
            return 7;
        case 8:
            return 0;
    }
    return number;
};

const useStateWithLocalStorage = (localStorageKey: string) => {
    /*Function for the logic of saving favorites as array as string to localStorage */
    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    );
    useEffect(() => {
        const oldData = localStorage.getItem(localStorageKey);
        if (oldData) {
            const jsonOldData = JSON.parse(oldData);
            if (!Array.isArray(value[0])) {
                /*Don't add old data from LocalStorage */
                localStorage.setItem(
                    localStorageKey,
                    JSON.stringify([...jsonOldData, value])
                );
            }
        } else {
            localStorage.setItem(localStorageKey, JSON.stringify([]));
        }
    }, [value]);

    return [value, setValue];
};

const removeFromLocalStorage = (localStorageKey: string, remove: string) => {
    /*Function for the logic of removing favorites as array as string to localStorage */
    const data = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    for (let i in data) {
        if (data[i][0] === remove) {
            data.splice(i, 1);
            localStorage.setItem(localStorageKey, JSON.stringify(data));
        }
    }
};

const isFavorited = (localStorageKey: string, artNumber: number) => {
    /*Function to check if picture is in localStorage as a favorit */
    const data = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    for (let i in data) {
        if (data[i][0] === artNumber.toString()) {
            return true;
        }
    }
    return false;
};

const getPoetry = (localStorageKey: string, artNumber: number) => {
    /*Function to fetch saved poetry form localstorage */
    const data = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    for (let i in data) {
        if (data[i][0] === artNumber.toString()) {
            return data[i];
        }
    }
    return false;
};

const speedSessionStorage = (sessionStorageKey: string) => {
    /*Fetching rotation speed from sessionStorage and returning number of seconds
      if user tries to input less then 1 sec return 10 sec */
    const speedString = sessionStorage.getItem(sessionStorageKey);
    if (speedString) {
        if (Number(speedString) >= 1) {
            return Number(speedString);
        } else {
            return 10;
        }
    } else {
        return 10;
    }
};

export default function Exhibition() {
    const StorageKeys = useContext(
        storageKeysContext
    ); /*[Local,Session] StorageKey from context api */
    const [playing, setPlaying] = useState(
        true
    ); /*state for pause and play of auto scrolling of pictures*/
    const [mute, setMute] = useState(false); /*state for muting music*/
    const [art] = useState(
        TheArt
    ); /*The art saved as a state TODO: add logic for changing to favorits*/
    const [artNumber, setArtNumber] = useState(
        0
    ); /*Which art piece is showing numbers are from "TheArt" record*/
    const [star, setStar] = useState(
        isFavorited(StorageKeys[0], artNumber)
    ); /*State to save if the art is favorited */
    const [error, setError] = useState(
        false
    ); /*Error state if loading for Poetry failes */
    const [isLoaded, setIsLoaded] = useState(
        false
    ); /* Don't show component before poetry is loaded*/
    const [poetry, setPoetry] = useState(
        ''
    ); /*Sets the poetry fetched from PoetryDB*/
    const [poetryTitle, setPoetryTitle] = useState(
        ''
    ); /*Sets the title fetched from PoetryDB*/
    const [poetryAuthor, setPoetryAuthor] = useState(
        ''
    ); /*Sets the author fetched from PoetryDB*/
    const [favorit, setFavorit] = useStateWithLocalStorage(
        StorageKeys[0]
    ); /*Sets the favorited poems*/
    const [TimeoutID, setTimeoutID] = useState(
        -1
    ); /*Time for next rotation of art -1 dummy value */
    const context = useContext(ThemeContext); /* ColorTheme set and get */

    const ButtonColor: CSSProperties = {
        backgroundColor: context.Theme.BoxColor,
        borderColor: context.Theme.FrameColor,
        color: context.Theme.FrameColor,
    };

    const FrameColor: CSSProperties = {
        borderColor: context.Theme.FrameColor,
    };

    useEffect(() => {
        /*Each time the artpiece changes fetch poetry */
        const savedPoetry = getPoetry(StorageKeys[0], artNumber);
        if (!savedPoetry) {
            /*Poetry not saved in LocalStorage fetch random poetry */
            fetch('https://poetrydb.org/random')
                .then((res) => res.json())
                .then(
                    (result) => {
                        if (Array.isArray(result)) {
                            //PoetryDB added breaking changes to return of random New return array
                            setIsLoaded(true);
                            setPoetry(result[0].lines[0]);
                            setPoetryTitle(result[0].title);
                            setPoetryAuthor(result[0].author);
                        } else {
                            //PoetryDB added breaking changes to return of random old return object
                            setIsLoaded(true);
                            setPoetry(result.lines[0]);
                            setPoetryTitle(result.title);
                            setPoetryAuthor(result.author);
                        }
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(true);
                        console.error(error);
                    }
                );
        } else {
            /*Poetry saved in LocalStorage fetch this poetry*/
            setPoetry(savedPoetry[3]);
            setPoetryAuthor(savedPoetry[2]);
            setPoetryTitle(savedPoetry[1]);
            setIsLoaded(true);
        }
    }, [artNumber]);

    useEffect(() => {
        /* Checks if picture is in favorited in localstorage and setStar*/
        setStar(isFavorited(StorageKeys[0], artNumber));
    }, [artNumber]);

    useEffect(() => {
        /* For keeping favorit updated when favoriting a picture */
        setFavorit(favorit);
    }, [star]);

    function changeArt(number: number) {
        /* Used when changing picture.*/
        setArtNumber(noOutOfBounds(number));
        setIsLoaded(false);
    }

    function changeArtManual(number: number) {
        /* When clicking next manually stop rotation*/
        changeArt(number);
        setPlaying(false);
    }

    const addFavorit = (isFavorit: Boolean, artNr: number) => {
        /* Add or remove picture from favorits*/
        if (isFavorit) {
            setFavorit([artNumber.toString(), poetryTitle, poetryAuthor, poetry]);
        } else {
            removeFromLocalStorage(StorageKeys[0], artNr.toString());
        }
        setStar(!star);
    };

    useEffect(() => {
        /*Triggers setTimeout when clicking on the Autoplay-button*/
        if (playing) {
            setTimeoutID(
                window.setTimeout(
                    () => changeArt(artNumber + 1),
                    speedSessionStorage(StorageKeys[1]) * 1000
                )
            );
        } else {
            window.clearTimeout(TimeoutID);
        }
    }, [playing, artNumber]);

    return (
        <div className='Exhibition'>
            <div className='row'>
                <button
                    className='ExhibitionbuttonLeft'
                    style={ButtonColor}
                    onClick={() => changeArtManual(artNumber - 1)}
                >
                    &lt; Prev
          </button>
                <Art
                    error={error}
                    isLoading={!isLoaded}
                    Title={art[artNumber].Title}
                    Poetry={poetry}
                    PoetryAuthor={poetryAuthor}
                    PoetryTitle={poetryTitle}
                    Picture={art[artNumber].Picture}
                    FrameColor={FrameColor}
                ></Art>
                <button
                    className='ExhibitionbuttonRight'
                    style={ButtonColor}
                    onClick={() => changeArtManual(artNumber + 1)}
                >
                    Next &gt;
          </button>
            </div>
            <div className='ExtraButtons'>
                <div>
                    <button
                        className='ExtraButton'
                        style={ButtonColor}
                        onClick={() => setPlaying(!playing)}
                    >
                        {' '}
                        {playing ? <Pause></Pause> : <Play></Play>}{' '}
                    </button>
                    Rotation
                </div>
                <div>
                    <button
                        className='ExtraButton'
                        style={ButtonColor}
                        onClick={() => addFavorit(!star, artNumber)}
                    >
                        {star ? <Star></Star> : <UnStar></UnStar>}{' '}
                    </button>
                    Favorite
                </div>
                <div>
                    <button
                        className='ExtraButton'
                        style={ButtonColor}
                        onClick={() => setMute(!mute)}
                    >
                        {mute ? <Mute></Mute> : <Audio></Audio>}{' '}
                    </button>
                    Sound
                </div>
            </div>
            <Sound Option={art[artNumber].Music} Mute={mute}></Sound>
        </div>
    );
}
