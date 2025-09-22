import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Signup from './pages/SignupPage';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
