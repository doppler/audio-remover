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
    window.ipcRenderer.on("process-status", (event, status) => {
      this.handleProcessingStatus(status);
    });
  }

  handleProcessingStatus = status => {
    if (status.saved) {
      this.setState(prevState => ({
        acceptedFiles: prevState.acceptedFiles.filter(file => {
          return file.name === status.file;
        })
      }));
    }
    this.setState({ status });
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
