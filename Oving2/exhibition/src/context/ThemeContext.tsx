import React, { createContext, useState } from 'react';

export interface ColorTheme {
  BackgroundColor: string;
  FrameColor: string;
  BoxColor: string;
}

export const Theme = {
  Blue: { BackgroundColor: "cornflowerblue", FrameColor: "mediumblue", BoxColor: "lightskyblue" },
  Sand: { BackgroundColor: "#f4e1d2", FrameColor: "#50394c", BoxColor: "#ffef96" },
  Pink: { BackgroundColor: "HotPink", FrameColor: "Magenta", BoxColor: "lightPink" },
  Green: { BackgroundColor: "LimeGreen", FrameColor: "DarkGreen", BoxColor: "PaleGreen" },
  Dummy: { BackgroundColor: "Dummy", FrameColor: "Dummy", BoxColor: "Dummy" },
}


// Context.Theme = style Context.update = setTheme
export const ThemeContext = createContext({ Theme: Theme.Blue, update: (value: typeof Theme.Blue) => { } }); 
