import React, { Component } from "react";
import axios from "axios";

import reviewSteps from "../MultiStepForm/reviewSteps";
import MultiStepForm from "../MultiStepForm";

const supportedSlugs = ["mark-b4b-rewind", "embedded-example"];

class EmbeddedTool extends Component {
  state = {
    isLoaded: false,
    error: undefined,
    tool: undefined,
  };
  async componentDidMount() {
    const toolSlug = getToolFromUrl();
    if (!supportedSlugs.includes(toolSlug)) {
      this.setState({ isLoaded: true, error: "Tool doesn't exist" });
      return;
    }
    try {
      const { data: tool } = await axios.get(getToolApiPath(toolSlug));
      if (tool.hasReview) {
        tool.steps = tool.steps.concat(reviewSteps);
      }
      console.log("tool", tool);
      this.setState({ isLoaded: true, tool });
      window.addEventListener("message", this.onMessage);
    } catch (err) {
      console.log(err.response);
      this.setState({ isLoaded: true, error: err.message });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("message", this.onMessage);
  }
  render() {
    const { isLoaded, error, tool } = this.state;
    if (!isLoaded) {
      return <h1>Loading ...</h1>;
    }
    if (error) {
      return <h1 style={{ color: "red" }}>{error}</h1>;
    }
    return (
      <MultiStepForm
        {...tool}
        answerByStep={{}}
        currentStepNum={0}
        price={0}
        stepsStack={[]}
        onUpdateProgress={this.onUpdateProgress}
      />
    );
  }
  onUpdateProgress = (...args) => {
    console.log("onUpdateProgress", ...args);
    window.parent.postMessage(...args, "*");
  };
  onMessage = evt => {
    try {
      const message = JSON.parse(evt.data);
      console.log("[MESSAGE FROM PARENT]", message, evt);
    } catch (err) {
      console.error(
        "error receiving message from parent. make sure you send a stringifed valid json",
        err
      );
    }
  };
}

export default EmbeddedTool;

function getToolFromUrl() {
  return window.location.pathname.split("/")[2];
}

function getToolApiPath(toolSlug) {
  return `https://www.adamgoldman.me/api/tools/${toolSlug}`;
}
