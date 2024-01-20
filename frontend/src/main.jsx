import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { Store } from './Store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
  
      <App />

  </Provider>
)
