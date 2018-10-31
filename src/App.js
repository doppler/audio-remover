import React, { Component } from "react";
import "./App.css";
import DirectoryPicker from "./DirectoryPicker";
import Dropzone from "react-dropzone";
import AcceptedFiles from "./AcceptedFiles";
import StatusMonitor from "./StatusMonitor";

class App extends Component {
  constructor() {
    super();
    this.state = {
      targetDirectory: "",
      acceptedFiles: [],
      processedFiles: [],
      status: {}
    };
  }

  componentDidMount() {
    this.setState({
      targetDirectory: localStorage.getItem("targetDirectory")
    });
    window.ipcRenderer.on("process-status", (event, statusUpdate) => {
      this.handleProcessingStatus(statusUpdate);
    });
  }

  handleProcessingStatus = statusUpdate => {
    const { status } = this.state;
    const { command, originalDuration, progress, saved } = statusUpdate;
    switch (statusUpdate.status) {
      case "start":
        // Object.assign(status[statusUpdate.file], {}, command);
        status[statusUpdate.file] = { command: command };
      case "codecData":
        status[statusUpdate.file].originalDuration = originalDuration;
      case "progress":
        status[statusUpdate.file].progress = progress;
        this.setState({ status });
        break;
      case "end":
        delete status[statusUpdate.file];
        const acceptedFiles = this.state.acceptedFiles.filter(
          file => file.name !== statusUpdate.file
        );
        this.setState({ status, acceptedFiles });
        break;
    }
  };

  handleDirectorySelection = event => {
    const path = event.target.files[0].path;
    localStorage.setItem("targetDirectory", path);
    this.setState({
      targetDirectory: path
    });
  };

  handleFileDrop = acceptedFiles => {
    const files = acceptedFiles.map(file => {
      return {
        name: file.name,
        path: file.path
      };
    });
    this.setState({
      acceptedFiles: acceptedFiles
    });
    window.ipcRenderer.send("process-request", {
      targetDirectory: this.state.targetDirectory,
      files
    });
  };

  render() {
    return (
      <div className="App">
        <DirectoryPicker
          targetDirectory={this.state.targetDirectory}
          handleDirectorySelection={this.handleDirectorySelection}
        />
        {this.state.acceptedFiles.length > 0 ? (
          <>
            <StatusMonitor status={this.state.status} />
            <AcceptedFiles acceptedFiles={this.state.acceptedFiles} />
          </>
        ) : (
          <Dropzone onDrop={this.handleFileDrop} />
        )}
      </div>
    );
  }
}

export default App;
