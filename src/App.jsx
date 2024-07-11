import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-bootstrap"

import PlanoContas from "./planoContas.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/planoContas" element={<PlanoContas />} />
      </Routes>
    </Router>
  );
}

export default App;
