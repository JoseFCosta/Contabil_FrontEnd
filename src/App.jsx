import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-bootstrap";

import PlanoContas from "./planoContas.jsx";
import MovimentoContabil from "./MovimentoContabil.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/planoContas" element={<PlanoContas />} />
        <Route path="/MovimentoContabil" element={<MovimentoContabil />} />
      </Routes>
    </Router>
  );
}

export default App;
