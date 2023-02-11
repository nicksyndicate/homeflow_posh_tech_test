import React, { useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import App, { reducer, initialState } from './App';
import './index.css';

export const Context = React.createContext(null);
const Provider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      { props.children }
    </Context.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider><App /></Provider>
  </React.StrictMode>
);
