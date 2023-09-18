// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Routes 추가
import Main from './components/Main';
import RequestList from './components/RequestList';
// import RequestDetail from './components/RequestDetail';

function App() {
  return (
    <Router>
      <Routes> {/* Switch 대신 Routes 사용 */}
        <Route path="/" element={<Main />} /> {/* element 속성을 사용하여 컴포넌트 지정 */}
        <Route path="/request" element={<RequestList />} /> 
      </Routes>
    </Router>
  );
}

export default App;
