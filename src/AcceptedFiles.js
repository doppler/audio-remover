import React from "react";

const AcceptedFiles = ({ acceptedFiles }) => {
  return (
    <ul>
      {acceptedFiles.map((file, i) => (
        <li key={i}>
          {file.name} {file.path}
        </li>
      ))}
    </ul>
  );
};

export default AcceptedFiles;
