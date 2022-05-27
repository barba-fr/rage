import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Home from './home/Home'
import Studio from './studio/Studio'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="studio" element={<Studio />} />
      </Routes>
    </div>
  );
}

export default App