import React from 'react'

//Keys [Local,Session] Can add more complex keys if needed
const StorageKeysContext = React.createContext(["favoritArt", "speedOfRotation"]);

export default StorageKeysContext;