import React, { Component } from "react";
import "./App.css";
import DirectoryPicker from "./DirectoryPicker";

class App extends Component {
  constructor() {
    super();
    this.state = {
      targetDirectory: ""
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

  render() {
    return (
      <div className="App">
        <DirectoryPicker
          targetDirectory={this.state.targetDirectory}
          handleDirectorySelection={this.handleDirectorySelection}
        />
      </div>
    );
  }
}

export default App;
