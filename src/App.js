import RegisterForm from './pages/Register';
import Navbar from './components/Navigation';
import {Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoutes';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <>
      <Navbar />
    <Routes>
      {/* <Route path="/" element={<About Us />} /> */}    
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/createpost" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
    </Routes>
      </>
  );
}

export default App;
