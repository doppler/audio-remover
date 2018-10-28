import React from "react";
import { Line } from "rc-progress";

const StatusMonitor = ({ status }) => {
  const { progress } = status;
  return (
    <div className="ProgressMonitor">
      Processing <strong>{status.file}</strong> {progress}%
      <Line percent={progress} />
    </div>
  );
};

export default StatusMonitor;
