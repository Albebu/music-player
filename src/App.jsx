// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import LeftSeccion from './components/LeftSeccion/LeftSeccion';
import Controls from './components/Controls/Controls';
import Home from './pages/Home';
import AlbumDetail from './pages/AlbumDetail';
import SongDetails from './pages/SongDetails';

const App = () => {
  const [songInformation, setSongInformation] = useState({});

  return (
    <Router>
      <div className="bg-black h-screen grid grid-rows-[1fr_auto]">
        <div className="grid grid-cols-[1fr_3fr]">
          <div className="flex flex-col">
            <NavBar />
            <LeftSeccion />
          </div>
          <div className="overflow-auto">
            <Routes>
              <Route path="/" element={<Home setSongInformation={setSongInformation}/>} />
              <Route path="/album/:id" element={<AlbumDetail />} />
              <Route path="/song/:id" element={<SongDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
