import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Home from './home/Home'
import Studio from './studio/Studio'
import Post from './studio/Post'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="studio" element={<Studio />} />
        <Route exact path="studio/video/:id" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App