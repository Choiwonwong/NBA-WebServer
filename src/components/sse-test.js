import React, { useEffect, useState } from "react";

function App() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    try {
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
    } catch (error) {
      console.error("Error creating EventSource:", error);
    }
  }, []);

  return (
    <div className="App">
      <h1>Current time:</h1>
      <p>{currentTime}</p>
    </div>
  );
}

export default App;
