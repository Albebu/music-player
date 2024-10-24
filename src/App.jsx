import React, { useState } from 'react';
import Login from './components/User-Auth/Login';
import MainContent from './components/MainContent';

const App = () => {
  const clientId = "3b8ae22e5ed444a9a65377e81574f55d";
  const [profile, setProfile] = useState(null);

  const handleProfileFetched = (profile) => {
    setProfile(profile);
  };

  return (
    <div>
      <MainContent ></MainContent>
      {/*
      {console.log(profile)}
      {profile ? (
        <>
          <MainContent ></MainContent>
        </>
      ) : (
        <Login clientId={clientId} onProfileFetched={handleProfileFetched} />
      )}
      */}
    </div>
  );
};

export default App;