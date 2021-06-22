import React from 'react'
const Abstract = require("./Abstract.mp3");
const Car = require("./Car.mp3");
const Desert = require("./Desert.mp3");
const Duff = require("./Duff.mp3");
const Head = require("./Head.mp3");
const House = require("./House.mp3");
const ProgPils = require("./ProgPils.mp3");
const TwoHouses = require("./TwoHouses.mp3");

interface Musicoptions {
    Option: typeof Abstract,
    Mute: boolean
}

export const songs = {
    Abstract: Abstract,
    Car: Car,
    Desert: Desert,
    Duff: Duff,
    Head: Head,
    House: House,
    ProgPils: ProgPils,
    TwoHouse: TwoHouses
}

export default function Sound(props: Musicoptions) {
    return (
        <div>
            <audio src={props.Option} autoPlay loop muted={props.Mute} />
        </div>
    );
}
