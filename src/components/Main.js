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

  const isValidGitHubRepo = (value) => {
    const repoUrlPattern =
      /^(https:\/\/|http:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/;
    return value === "" || repoUrlPattern.test(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "githubRepo") {
      // GitHub URL을 더 정교하게 검증하기 위한 정규 표현식
      const isValidRepoUrl = isValidGitHubRepo(value);
      setValidRepoUrl(isValidRepoUrl);
    }
    // 나머지 필드에 대한 로직은 그대로 유지
  };

  const toggleShowSecret = () => {
    setFormState((prevState) => ({
      ...prevState,
      showSecret: !prevState.showSecret,
    }));
  };

  const handleRequestClick = () => {
    // 입력되지 않은 데이터가 있는지 체크
    const isAnyFieldEmpty =
      formState.githubRepo === "" ||
      formState.githubBranch === "" ||
      formState.accessKey === "" ||
      formState.secretKey === "";

    if (isAnyFieldEmpty) {
      // 입력되지 않은 데이터가 있을 때 사용자에게 알림 메시지 표시
      alert("Please fill in all fields");
      return;
    }

    const isGitHubRepoValid = isValidGitHubRepo(formState.githubRepo);

    if (!isGitHubRepoValid) {
      // GitHub Repo URL 형식이 유효하지 않으면 사용자에게 알림 메시지 표시
      alert("Invalid GitHub Repo URL");
      return;
    }

    // 요청을 다시 확인받는 모달창을 띄우기 위한 함수
    const showConfirmationAlert = () => {
      confirmAlert({
        title: "Confirm Request",
        message: "Are you sure you want to make this request?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              // "Yes"를 클릭했을 때 요청 데이터를 처리하는 로직을 추가
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
            onClick: () => {
              // "No"를 클릭했을 때 아무 동작 없음
            },
          },
        ],
      });
    };

    showConfirmationAlert();
  };

  // 나머지 코드는 이전과 동일

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

      <div className="input-field">
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

      {/* Github Branch 입력 필드 */}
      <div className="input-field">
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

      {/* Access Key 입력 필드 */}
      <div className="input-field">
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

      {/* Secret Key 입력 필드와 아이콘 */}
      <div className="input-field">
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
