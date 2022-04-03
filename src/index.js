import App from './App'
import { createRoot } from 'react-dom/client';
import React from 'react'


// ReactDOM.render(<React.StrictMode>
//                     <App />
//                 </React.StrictMode>, document.getElementById("root"))



let container = document.getElementById('root')
let root = createRoot(container)
root.render(<App />)