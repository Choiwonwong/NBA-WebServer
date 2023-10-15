import React, { useEffect, useState } from "react";

function App() {
  const [logData, setLogData] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:8080/api/requests/1/provision/logs"
    );

    eventSource.onmessage = (event) => {
      setLogData((prevLogData) => [...prevLogData, event.data]);
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
    };

    const pingInterval = setInterval(() => {
      eventSource.dispatchEvent(new Event("ping"));
    }, 5000); // Send a "ping" message every 5 seconds

    // Add an event listener to send a disconnect message when the page is about to unload
    window.addEventListener("beforeunload", () => {
      eventSource.close(); // Close the SSE connection
      // You can also send a disconnect message to the server here if needed
    });

    return () => {
      clearInterval(pingInterval);
      eventSource.close();
    };
  }, []); // Empty dependency array to ensure it runs only once

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

// import React, { useEffect, useState } from "react";

// function App() {
//   const [logData, setLogData] = useState([]);

//   useEffect(() => {
//     const eventSource = new EventSource(
//       "http://localhost:8080/api/requests/1/provision/logs"
//     );

//     eventSource.onmessage = (event) => {
//       setLogData((prevLogData) => [...prevLogData, event.data]);
//     };

//     eventSource.onerror = (error) => {
//       console.error("SSE Error:", error);
//       eventSource.close();
//     };

//     return () => {
//       eventSource.close();
//     };
//   }, []);

//   return (
//     <div className="App">
//       <h1>Received Messages:</h1>
//       <ul>
//         {logData.map((log, index) => (
//           <li key={index}>{log}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
