import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'
import './rebrand.css'
import './completion.css'
import { loadPublicContent } from './lib/public-content'

function ReadyApp(){const [version,setVersion]=React.useState(0);React.useEffect(()=>{let active=true;void loadPublicContent().then(()=>{if(active)setVersion(1)});return()=>{active=false}},[]);return <App key={version}/>}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><BrowserRouter><ReadyApp /></BrowserRouter></React.StrictMode>
)
