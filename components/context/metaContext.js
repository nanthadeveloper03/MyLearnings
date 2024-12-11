// context/MetadataContext.js
import React, { createContext, useState, useContext } from 'react';

const MetadataContext = createContext();

export const MetadataProvider = ({ children }) => {
    const [metadata, setMetadata] = useState({
        title: '',
        description: '',
        image: '',
        url: ''
    });

    return (
        <MetadataContext.Provider value={{ metadata, setMetadata }}>
            {children}
        </MetadataContext.Provider>
    );
};

export const useMetadata = () => {
    return useContext(MetadataContext);
};
