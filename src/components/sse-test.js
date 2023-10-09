import React, { useEffect, useState } from "react";

function App() {
  const [logData, setLogData] = useState([]); // 배열로 받아서 여러 내용을 출력

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/api/logs");

    eventSource.onmessage = (event) => {
      setLogData((prevLogData) => [...prevLogData, event.data]); // 이전 데이터와 현재 데이터를 합침
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>Received Messages:</h1>
      <ul>
        {logData.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
