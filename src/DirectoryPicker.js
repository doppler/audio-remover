import React from "react";

const DirectoryPicker = ({ targetDirectory, handleDirectorySelection }) => {
  return (
    <div className="DirectoryPicker">
      {targetDirectory ? (
        <DirectoryDisplay
          targetDirectory={targetDirectory}
          handleDirectorySelection={handleDirectorySelection}
        />
      ) : (
        <DirectoryInput handleDirectorySelection={handleDirectorySelection} />
      )}
    </div>
  );
};

const DirectoryInput = ({ handleDirectorySelection }) => (
  <div className="DirectoryInput">
    <input
      className="DirectoryInput"
      id="directory-input"
      type="file"
      onChange={handleDirectorySelection}
      webkitdirectory=""
    />
    <label className="DirectoryInput-label" htmlFor="directory-input">
      Choose a target directory
    </label>
  </div>
);

const DirectoryDisplay = ({ targetDirectory, handleDirectorySelection }) => (
  <div className="DirectoryDisplay">
    <span>Target Directory: {targetDirectory}</span>
    <button
      onClick={() =>
        handleDirectorySelection({ target: { files: [{ path: "" }] } })
      }
    >
      Change
    </button>
  </div>
);
export default DirectoryPicker;
