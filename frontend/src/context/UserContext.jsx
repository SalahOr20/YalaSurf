import React, { createContext, useState, useContext } from 'react';

// Créez le contexte
const UserContext = createContext();

// Créez un hook personnalisé pour utiliser le contexte
export const useUser = () => useContext(UserContext);

// Créez un fournisseur de contexte
export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
