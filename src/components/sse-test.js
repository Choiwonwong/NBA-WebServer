import React, { useEffect, useState } from "react";

function App() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/sse");

    eventSource.onmessage = (event) => {
      setCurrentTime(event.data);
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
      <h1>현재 시간:</h1>
      <p>{currentTime}</p>
    </div>
  );
}

export default App;
