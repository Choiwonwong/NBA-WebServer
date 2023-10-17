import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "./pages/MainPage";
import RequestPage from "./pages/RequestPage";
import RequestListPage from "./pages/RequestListPage";
import RequestDetailPage from "./pages/RequestDetailPage";
import DocumentPage from "./pages/DocumentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/request-list" element={<RequestListPage />} />
        <Route path="/request-detail/:id" element={<RequestDetailPage />} />
        <Route path="/document" element={<DocumentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
