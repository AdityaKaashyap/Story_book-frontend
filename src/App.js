import RegisterForm from './pages/Register';
import Navbar from './components/Navigation';
import {Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoutes';
import CreatePost from './pages/CreatePost';
import Logout from './pages/Logout';
import FetchPosts from './pages/Fetchpost';
import FollowerFollowing from './Profiles/FollowerFollowing';
import Userprofile from './Profiles/Userprofile';



function App() {
  return (
    <>
      <Navbar /> 
    <Routes>
      {/* <Route path="/" element={<About Us />} /> */}    
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/userprofile" element={<ProtectedRoute><Userprofile /></ProtectedRoute>} />
      <Route path="/followerfollowing/:username" element={<ProtectedRoute><FollowerFollowing /></ProtectedRoute>} />
      <Route path="/createpost" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
      <Route path="/showposts" element={<ProtectedRoute><FetchPosts /></ProtectedRoute>} />
      <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
    </Routes>
      </>
  );
}

export default App;
