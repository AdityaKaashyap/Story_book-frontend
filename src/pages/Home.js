import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Home Page</h1>

      <button
        className="button-primary"
        onClick={() => navigate('/userprofile')}
      >
        Edit profile
      </button>

      <br />

      <button
        onClick={() => navigate('/followerfollowing/someUsername')}
      >
        Followers
      </button>
    </div>
  );
};

export default Home;
