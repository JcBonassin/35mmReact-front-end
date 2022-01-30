import React, { createContext, useState } from "react";


const PhotoContext = createContext(null);
const PhotoDispatchContext = createContext(null);

function PhotoProvider({ children }) {
    const [photos, setPhotos] = useState([]);
  
    return (
      <PhotoContext.Provider value={photos}>
        <PhotoDispatchContext.Provider value={setPhotos}>
          {children}
        </PhotoDispatchContext.Provider>
      </PhotoContext.Provider>
    );
  }
  
  export { PhotoProvider, PhotoContext, PhotoDispatchContext };