import React from "react";

const DirectoryPicker = ({ targetDirectory, handleDirectorySelection }) => {
  return (
    <div id="DirectoryPicker">
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
  <>
    <input
      className="DirectoryInput"
      id="directory-input"
      type="file"
      onChange={handleDirectorySelection}
      webkitdirectory=""
    />
    <label className="DirectoryInput-label" for="directory-input">
      Choose a target directory
    </label>
  </>
);

const DirectoryDisplay = ({ targetDirectory, handleDirectorySelection }) => (
  <>
    <span>{targetDirectory}</span>
    <button
      onClick={() =>
        handleDirectorySelection({ target: { files: [{ path: "" }] } })
      }
    >
      Change
    </button>
  </>
);
export default DirectoryPicker;
