import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'

const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl)

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App/>
  // </StrictMode>,
)
