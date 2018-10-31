import React from "react";
import { Line } from "rc-progress";

const StatusMonitor = ({ status }) => {
  return Object.keys(status).map(filename => {
    return (
      <StatusRow key={filename} filename={filename} status={status[filename]} />
    );
  });
};

export default StatusMonitor;

const StatusRow = ({ filename, status }) => {
  const { progress } = status;
  const percent = progress && progress.percent && Math.round(progress.percent);
  return (
    <div className="ProgressMonitor">
      <p>
        Processing <strong>{filename}</strong> {percent}%
      </p>
      <Line percent={percent} />
    </div>
  );
};
