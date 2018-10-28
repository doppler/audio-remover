import React, { Component } from "react";
import "./App.css";
import DirectoryPicker from "./DirectoryPicker";
import Dropzone from "react-dropzone";
import AcceptedFiles from "./AcceptedFiles";

class App extends Component {
  constructor() {
    super();
    this.state = {
      targetDirectory: "",
      acceptedFiles: [],
      processedFiles: []
    };
  }

  componentDidMount() {
    this.setState({
      targetDirectory: localStorage.getItem("targetDirectory")
    });
  }

  handleDirectorySelection = event => {
    const path = event.target.files[0].path;
    localStorage.setItem("targetDirectory", path);
    this.setState({
      targetDirectory: path
    });
  };

  handleFileDrop = acceptedFiles => {
    this.setState({
      acceptedFiles: acceptedFiles
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
          <AcceptedFiles acceptedFiles={this.state.acceptedFiles} />
        ) : (
          <Dropzone onDrop={this.handleFileDrop} />
        )}
      </div>
    );
  }
}

export default App;
