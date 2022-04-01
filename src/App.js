import './App.css';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Main from './components/Audio/Main';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Table from './components/Audio/Table';
import { AuthProvider, useAuth } from './components/Auth/auth';
import { RequireAuth } from './components/Auth/RequireAuth';
import { Nav } from './components/Navbar/Nav';
import Record from './components/Audio/Record';


function App() {
  const user = localStorage.getItem("Users");
  const auth = useAuth()
  console.warn("user", user)
  return<>
  <AuthProvider>
    
    <Router>
  <Nav />
      

      <Routes>
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<RequireAuth><Table /></RequireAuth>} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Record" element={<Record />} />
      </Routes>
    </Router>
  </AuthProvider>
  </>
}

export default App;
