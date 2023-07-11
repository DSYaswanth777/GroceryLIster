import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/Store.js'
import { Provider } from 'react-redux'
// import 'boot';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
  </Provider>,
    
    </BrowserRouter>
  </React.StrictMode>,
)
