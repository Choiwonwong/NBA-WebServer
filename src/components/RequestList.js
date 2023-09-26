import React, { useState } from "react";
import "./RequestList.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import HorizontalLinearAlternativeLabelStepper from "./stepper";
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function RequestList() {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (rowId) => {
    if (expandedRows.includes(rowId)) {
      setExpandedRows(expandedRows.filter((id) => id !== rowId));
    } else {
      setExpandedRows([...expandedRows, rowId]);
    }
  };

  const isRowExpanded = (rowId) => expandedRows.includes(rowId);

  // Your fictitious request list data
  const requestListData = [
    {
      id: 1,
      title: "test1",
      repo: "https://github.com/CHOIWONWENG/test0531.git",
      branch: "main",
      state: "Provisioning",
      message: null,
      createdAt: "2023-09-19T10:30:00",
      updatedAt: "2023-09-19T11:45:00",
      emessage: null, // Add an error message here
    },
    {
      id: 2,
      title: "test2",
      repo: "https://github.com/CHOIWONWENG/test0531.git",
      branch: "Master",
      state: "Build error",
      emessage: "Insufficient registration permission",
      createdAt: "2023-09-19T09:15:00",
      updatedAt: "2023-09-19T09:40:00",
    },
    {
      id: 3,
      title: "test3",
      repo: "https://github.com/CHOIWONWENG/test0531.git",
      branch: "blue",
      state: "Normal deployment",
      message: null,
      createdAt: "2023-09-18T15:20:00",
      updatedAt: "2023-09-18T16:30:00",
      emessage: null, // Add an error message here
    },
    // Additional request data
  ];

  return (
    <div className="container">
      <Link to="/" className="quest-title">
        Quest
      </Link>
      <p className="quest-noti">
        <span className="highlight">Q</span>uick{" "}
        <span className="highlight">U</span>nified{" "}
        <span className="highlight">E</span>asy{" "}
        <span className="highlight">S</span>imple{" "}
        <span className="highlight">T</span>ool
      </p>
      <div className="divider"></div>
      <p className="quest-text">Request List</p>

      <table className="request-table">
        <thead>
          <tr>
            <th></th> {/* Empty column for the expand buttons/icons */}
            <th>ID</th>
            <th>Title</th>
            <th>Github Repo</th>
            <th>Progress</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {requestListData.map((item) => (
            <React.Fragment key={item.id}>
              <tr className={`request-table-row`}>
                <td>
                  <button
                    className={`expand-button ${
                      isRowExpanded(item.id) ? "expanded" : ""
                    }`}
                    onClick={() => toggleRow(item.id)}
                  >
                    <FontAwesomeIcon
                      icon={
                        isRowExpanded(item.id) ? faChevronDown : faChevronDown
                      }
                    />
                  </button>
                </td>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.repo}</td>
                <td>{item.state}</td>
                <td>{item.createdAt}</td>
                <td>{item.updatedAt}</td>
              </tr>
              {isRowExpanded(item.id) && (
                <tr className="expanded-content">
                  <td colSpan="7">
                    <Container fixed>
                      <Box sx={{ height: "30vh", marginTop: "2%" }}>
                        <HorizontalLinearAlternativeLabelStepper />
                        <Box sx={{ width: "80%", marginTop: "2%" }}>
                          asdfadsf
                          <Divider orientation="vertical" variant="middle" />
                          asdfasdf
                        </Box>
                      </Box>
                    </Container>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestList;

{
  /* <Divider orientation="vertical" variant="middle" flexItem /> */
}
// {/* {item.emessage && (
//   <div>
//     <strong>Error Message:</strong> {item.emessage}
//   </div>
// )} */}
