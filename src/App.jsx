import React, { useState } from 'react';
import Login from './components/User-Auth/Login.jsx';
import MainContent from './components/MainContent';

const App = () => {
  const clientId = "3b8ae22e5ed444a9a65377e81574f55d";
  const [accesToken, setAccessToken] = useState(null);
  console.log("Acces token", accesToken);

  /*      {accesToken ? (
        <>
          <MainContent ></MainContent>
        </>
      ) :*/

  return (
    <div >
      {accesToken ? <MainContent></MainContent> : <Login clientId={clientId} accesToken={accesToken} setAccessToken={setAccessToken} />}
    </div>
  );
};

export default App;