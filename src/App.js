// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import RequestList from "./components/RequestList";
import RequestDetail from "./components/RequestDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/request" element={<RequestList />} />
        <Route path="/request/:id" element={<RequestDetail />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
