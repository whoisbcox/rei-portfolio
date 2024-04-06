import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  process.env.NODE_ENV === 'production' ? (
    App
  ) : (
    <React.StrictMode>
      {App}
    </React.StrictMode>
  )
);
