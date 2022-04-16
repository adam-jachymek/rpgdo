import { useState } from 'react';
import { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './main.sass';
import './index.css'
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';
import { ThemeContext } from './ThemeContext';
import classNames from 'classnames';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    // Add React Context and consume it in a few components.
    <ThemeContext.Provider value={{darkMode,setDarkMode}}>
      <div className={classNames("app", {"app-dark": darkMode})}>
        <div className="container">
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
