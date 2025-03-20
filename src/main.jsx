import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './Context/AuthContext.jsx'
import UserContext from './Context/UserContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
      <UserContext>
        <App />
      </UserContext>
    </AuthContext>
  </BrowserRouter>
)
