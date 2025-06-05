import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import './styles/app.scss';
import App from './App';
import { createContext, useState } from 'react'; 


export const serverUrl = "https://todo-backend-nodejs-suw5.onrender.com/api/v1";

export const Context = createContext({isAuthenticated: false});

const AppWrapper = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  return(
    <Context.Provider value={{
      isAuthenticated, 
      setIsAuthenticated,
      loading,
      setLoading,
      user,
      setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
}  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
)
