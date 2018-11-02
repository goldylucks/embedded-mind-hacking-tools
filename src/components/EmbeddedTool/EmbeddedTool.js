// @flow

import React, { Component } from "react";
import axios from "axios";
import mixpanel from "mixpanel-browser";

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
    this.fetchTool();
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
  onUpdateProgress = multiFormState => {
    // TODO handle completion of tool
    console.log("onUpdateProgress", multiFormState);
    if (window.parent !== window) {
      window.parent.postMessage(multiFormState, "*");
    }
    this.trackStepChange(multiFormState);
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
      console.log("onMessage evt that caused the error", evt);
    }
  };
  async fetchTool() {
    if (!supportedSlugs.includes(this.toolSlug)) {
      this.setState({ isLoaded: true, error: "Tool doesn't exist" });
      this.trackToolSlugDoesntExist(this.toolSlug);
      return;
    }
    try {
      const { data: tool } = await axios.get(this.toolApiEndpoint);
      if (tool.hasReview) {
        tool.steps = tool.steps.concat(reviewSteps);
      }
      console.log("Tool Loaded", tool);
      this.setState({ isLoaded: true, tool });
      window.addEventListener("message", this.onMessage);
      this.trackLoaded();
    } catch (err) {
      console.log("Error loading tool", err.response);
      this.setState({ isLoaded: true, error: err.message });
    }
  }

  trackLoaded() {
    window.ga("send", {
      hitType: "event",
      eventCategory: "Mind Tool",
      eventAction: "Tool Loaded",
      eventLabel: this.toolTitle,
    });
    mixpanel.track("Tool Loaded", {
      toolTitle: this.toolTitle,
      toolSlug: this.toolSlug,
    });
  }

  trackToolSlugDoesntExist() {
    window.ga("send", {
      hitType: "event",
      eventCategory: "Mind Tool",
      eventAction: "Tool slug doesn't exist",
      eventLabel: this.toolSlug,
    });
    mixpanel.track("Tool slug doesnt exist", {
      toolSlug: this.toolSlug,
    });
  }

  trackStepChange(multiFormState) {
    window.ga("send", {
      hitType: "event",
      eventCategory: "Mind Tool",
      eventAction: `Go To Step ${multiFormState.currentStepNum}`,
      eventLabel: this.toolTitle,
    });
    mixpanel.track("Go to step", {
      toolTitle: this.toolTitle,
      toolSlug: this.toolSlug,
      step: Number(multiFormState.currentStepNum),
    });
  }

  get toolSlug() {
    return window.location.pathname.split("/")[2];
  }

  get toolApiEndpoint() {
    return `https://www.adamgoldman.me/api/tools/${this.toolSlug}`;
  }

  get toolTitle() {
    return this.state.tool.title;
  }
}

export default EmbeddedTool;
