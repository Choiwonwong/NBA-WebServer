import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./Main.css";

function Main() {
  const [formState, setFormState] = useState({
    githubRepo: "",
    githubBranch: "",
    accessKey: "",
    secretKey: "",
    showSecret: false,
  });

  const [validRepoUrl, setValidRepoUrl] = useState(true);
  const [requestData, setRequestData] = useState(null);
  const [shakeFields, setShakeFields] = useState({
    githubRepo: false,
    githubBranch: false,
    accessKey: false,
    secretKey: false,
  });

  const isValidGitHubRepo = (value) => {
    const repoUrlPattern =
      /^(https:\/\/|http:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+.git$/;
    return value === "" || repoUrlPattern.test(value);
  };

  const validateForm = () => {
    const isAnyFieldEmpty =
      formState.githubRepo === "" ||
      formState.githubBranch === "" ||
      formState.accessKey === "" ||
      formState.secretKey === "";

    const isGitHubRepoValid = isValidGitHubRepo(formState.githubRepo);

    return { isAnyFieldEmpty, isGitHubRepoValid };
  };

  const showConfirmationAlert = () => {
    confirmAlert({
      title: "Confirm Request",
      message: "Are you sure you want to make this request?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const requestData = {
              githubRepo: formState.githubRepo,
              githubBranch: formState.githubBranch,
              accessKey: formState.accessKey,
              secretKey: formState.secretKey,
            };
            setRequestData(requestData);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const toggleShowSecret = () => {
    setFormState((prevState) => ({
      ...prevState,
      showSecret: !prevState.showSecret,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "githubRepo") {
      const isValidRepoUrl = isValidGitHubRepo(value);
      setValidRepoUrl(isValidRepoUrl);
    }
  };

  const handleRequestClick = () => {
    const { isAnyFieldEmpty, isGitHubRepoValid } = validateForm();

    if (isAnyFieldEmpty) {
      alert("Please fill in all fields");

      setTimeout(() => {
        setShakeFields({
          githubRepo: formState.githubRepo === "",
          githubBranch: formState.githubBranch === "",
          accessKey: formState.accessKey === "",
          secretKey: formState.secretKey === "",
        });

        setTimeout(() => {
          setShakeFields({
            githubRepo: false,
            githubBranch: false,
            accessKey: false,
            secretKey: false,
          });
        }, 2000);
      }, 100);

      return;
    }

    if (!isGitHubRepoValid) {
      alert("Invalid GitHub Repo URL");

      setShakeFields({
        ...shakeFields,
        githubRepo: true,
      });

      setTimeout(() => {
        setShakeFields({
          ...shakeFields,
          githubRepo: false,
        });
      }, 2000);

      return;
    }

    showConfirmationAlert();
  };

  return (
    <div className="container">
      <Link
        to="/"
        className="quest-title"
        onClick={() => window.location.reload()}
      >
        QUEST
      </Link>

      <p className="quest-noti">
        <span className="highlight">Q</span>uick{" "}
        <span className="highlight">U</span>nified{" "}
        <span className="highlight">E</span>asy{" "}
        <span className="highlight">S</span>imple{" "}
        <span className="highlight">T</span>ool
      </p>

      <div className="divider"></div>

      <p className="quest-text">
        Build & Provision & Deploy Integration Service
      </p>

      <div className={`input-field ${shakeFields.githubRepo ? "shake" : ""}`}>
        <label htmlFor="githubRepo">GitHub Repo</label>
        <input
          type="text"
          id="githubRepo"
          name="githubRepo"
          value={formState.githubRepo}
          onChange={handleChange}
          placeholder="Please Enter GitHub Repo"
          className={!validRepoUrl ? "invalid" : ""}
        />
        {!validRepoUrl && formState.githubRepo !== "" && (
          <p className="error-message">Invalid GitHub Repo URL</p>
        )}
      </div>

      <div className={`input-field ${shakeFields.githubBranch ? "shake" : ""}`}>
        <label htmlFor="githubBranch">Branch Name</label>
        <input
          type="text"
          id="githubBranch"
          name="githubBranch"
          value={formState.githubBranch}
          onChange={handleChange}
          placeholder="Please Enter Branch Name"
        />
      </div>

      <div className={`input-field ${shakeFields.accessKey ? "shake" : ""}`}>
        <label htmlFor="accessKey">Access Key</label>
        <input
          type="text"
          id="accessKey"
          name="accessKey"
          value={formState.accessKey}
          onChange={handleChange}
          placeholder="Please Enter Access Key"
        />
      </div>

      <div className={`input-field ${shakeFields.secretKey ? "shake" : ""}`}>
        <label htmlFor="secretKey">Secret Key</label>
        <input
          type={formState.showSecret ? "text" : "password"}
          id="secretKey"
          name="secretKey"
          value={formState.secretKey}
          onChange={handleChange}
          placeholder="Please Enter Secret Key"
        />
      </div>

      <button className="show-secret-button" onClick={toggleShowSecret}>
        <FontAwesomeIcon icon={formState.showSecret ? faEye : faEyeSlash} />
      </button>

      <div className="divider"></div>
      <button className="request-button" onClick={handleRequestClick}>
        Request
      </button>

      {requestData && (
        <div className="request-data">
          <h3>Test Console</h3>
          <pre>{JSON.stringify(requestData, null, 2)}</pre>
        </div>
      )}

      <div className="divider"></div>
      <Link to="/request" className="request-list-button">
        Check Request List
      </Link>
    </div>
  );
}

export default Main;
