import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Main.css';

function Main() {
  const [formState, setFormState] = useState({
    githubRepo: '',
    githubBranch: '',
    accessKey: '',
    secretKey: '',
    showSecret: false,
  });
  const [validRepoUrl, setValidRepoUrl] = useState(true);
  const [requestData, setRequestData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'githubRepo') {
      const repoUrlPattern = /^https:\/\/github\.com\/\S+\/\S+$/;
      const isValidRepoUrl = value === '' || repoUrlPattern.test(value);
      setValidRepoUrl(isValidRepoUrl);
    } else {
      // GitHub Repo를 지웠을 때, 다시 입력 가능하도록 제약 조건 해제
      setValidRepoUrl(true);
    }
  };

  const toggleShowSecret = () => {
    setFormState((prevState) => ({
      ...prevState,
      showSecret: !prevState.showSecret,
    }));
  };

  const handleRequestClick = () => {
    const requestData = {
      githubRepo: formState.githubRepo,
      githubBranch: formState.githubBranch,
      accessKey: formState.accessKey,
      secretKey: formState.secretKey,
    };

    setRequestData(requestData);

    console.log(JSON.stringify(requestData, null, 2));
  };

  const isRepoUrlValid = validRepoUrl;
  const isFieldsDisabled = !isRepoUrlValid;

  return (
    <div className="container">
      <Link to="/" className="quest-title">
        QUEST
      </Link>
      <p className="quest-noti">
        <span className="highlight">Q</span>uick <span className="highlight">U</span>nified <span className="highlight">E</span>asy <span className="highlight">S</span>imple <span className="highlight">T</span>ool
      </p>

      <div className="divider"></div>

      <p className="quest-text">Build & Provision & Deploy Integration Service</p>

      <div className="input-field">
        <label htmlFor="githubRepo">GitHub Repo</label>
        <input
          type="text"
          id="githubRepo"
          name="githubRepo"
          value={formState.githubRepo}
          onChange={handleChange}
          placeholder="Please Enter GitHub Repo"
          className={!validRepoUrl ? 'invalid' : ''}
        />
        {!validRepoUrl && formState.githubRepo !== '' && <p className="error-message">Invalid GitHub Repo URL</p>}
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
          disabled={isFieldsDisabled}
          className={isFieldsDisabled ? 'disabled' : ''}
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
          disabled={isFieldsDisabled}
          className={isFieldsDisabled ? 'disabled' : ''}
        />
      </div>

      {/* Secret Key 입력 필드와 아이콘 */}
      <div className="input-field">
        <label htmlFor="secretKey">Secret Key</label>
        <input
          type={formState.showSecret ? 'text' : 'password'}
          id="secretKey"
          name="secretKey"
          value={formState.secretKey}
          onChange={handleChange}
          placeholder="Please Enter Secret Key"
          disabled={isFieldsDisabled}
          className={isFieldsDisabled ? 'disabled' : ''}
        />
      </div>
      <button className="show-secret-button" onClick={toggleShowSecret} disabled={isFieldsDisabled}>
        <FontAwesomeIcon icon={formState.showSecret ? faEye : faEyeSlash} />
      </button>
      <div className="divider"></div>
      <button className="request-button" onClick={handleRequestClick} disabled={isFieldsDisabled}>
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
