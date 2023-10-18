import React, { useState } from "react";
import "./MainCard.css";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

function RequestCard(props) {
  const [selectedFileName, setSelectedFileName] = useState(""); // State to store selected file name
  const [fileError, setFileError] = useState(""); // State to store file error message
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFileName(selectedFile.name);
    setFileError("");
    setIsLoading(false); // Reset loading state

    if (selectedFile.name !== "Quest.yaml") {
      setFileError("'Quest.yaml'을 입력해주세요.");
      event.target.value = null; // Reset the file input
    } else {
      setFileError("");
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      // Send the POST request to the server
      // Example:
      // axios.post("http://localhost:8000/requests/check", formData)
      //   .then(response => {
      //     // Handle the response here
      //     setIsLoading(false); // Stop loading when the response is received
      //   })
      //   .catch(error => {
      //     // Handle errors here
      //     setIsLoading(false); // Stop loading on error
      //   });
    }
  };

  return (
    <Container className="my-5">
      <Row className="p-4 pb-0 pe-lg-2 pt-lg-4 align-items-center rounded-5 border shadow-lg card">
        <Col lg={11.5} className="p-4 p-lg-5 pt-lg-4">
          <h1 className="display-4 fw-bold lh-1">{props.title}</h1>
          <p
            className="lead"
            style={{
              fontSize: 24,
              paddingTop: "1rem",
            }}
          >
            {props.description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </Col>
        <hr style={{ width: "90%" }} />
        <Form.Group
          controlId="formFileLg"
          className="mb-3"
          style={{ width: "50%" }}
        >
          <Form.Control type="file" size="lg" onChange={handleFileChange} />
        </Form.Group>
        {fileError && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {fileError}
          </p>
        )}
        {isLoading ? (
          <p style={{ textAlign: "center" }}>
            <Spinner style={{ margin: "1.5rem" }} animation="border" />
            <div style={{ fontSize: 20, fontWeight: "bold" }}>
              Quest.yaml의 내용을 검사중입니다.
            </div>
          </p>
        ) : null}
      </Row>
    </Container>
  );
}

export default RequestCard;

// import React, { useState } from "react";
// import "./MainCard.css";
// import { Container, Row, Col } from "react-bootstrap";
// import Form from "react-bootstrap/Form";

// function RequestCard(props) {
//   const [selectedFileName, setSelectedFileName] = useState(""); // State to store selected file name
//   const [fileError, setFileError] = useState(""); // State to store file error message

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setSelectedFileName(selectedFile.name);

//     if (selectedFile.name !== "Quest.yaml") {
//       setFileError("'Quest.yaml'을 입력해주세요.");
//       event.target.value = null;
//     } else {
//       setFileError("");

//       // const reader = new FileReader();
//       // reader.onload = (e) => {
//       //   const fileContent = e.target.result;
//       //   console.log("File Content: ", fileContent);
//       // };
//       // reader.readAsText(selectedFile);
//     }
//   };

//   return (
//     <Container className="my-5">
//       <Row className="p-4 pb-0 pe-lg-2 pt-lg-4 align-items-center rounded-5 border shadow-lg card">
//         <Col lg={11.5} className="p-4 p-lg-5 pt-lg-4">
//           <h1 className="display-4 fw-bold lh-1">{props.title}</h1>
//           <p
//             className="lead"
//             style={{
//               fontSize: 24,
//               paddingTop: "1rem",
//             }}
//           >
//             {props.description.split("\n").map((line, index) => (
//               <React.Fragment key={index}>
//                 {line}
//                 <br />
//               </React.Fragment>
//             ))}
//           </p>
//         </Col>
//         <hr style={{ width: "90%" }} />
//         <Form.Group
//           controlId="formFileLg"
//           className="mb-3"
//           style={{ width: "50%" }}
//         >
//           <Form.Control type="file" size="lg" onChange={handleFileChange} />
//         </Form.Group>
//         {fileError && (
//           <p style={{ color: "red", textAlign: "center", fontSize: 20 }}>
//             {fileError}
//           </p>
//         )}
//       </Row>
//     </Container>
//   );
// }

// export default RequestCard;
