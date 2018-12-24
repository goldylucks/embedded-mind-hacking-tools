import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";

import reviewSteps from "../MultiStepForm/reviewSteps";
import MultiStepForm from "../MultiStepForm";

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
        hiddenFields={getHiddenFieldsFromQuery()}
        currentStepNum={0}
        price={0}
        stepsStack={[]}
        onSaveAnswersToDb={this.saveAnswersToDb}
        onUpdateProgress={this.onUpdateProgress}
      />
    );
  }
  onUpdateProgress = multiFormState => {
    console.log(multiFormState);
    // console.log("onUpdateProgress", multiFormState);
    if (window.parent !== window) {
      window.parent.postMessage({ action: "step change" }, "*");
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    // this.trackStepChange(multiFormState);
  };

  saveAnswersToDb = answerByStep => {
    const data = {
      steps: this.state.tool.steps,
      title: this.state.tool.title,
      rating: this.getRatingFromAnswerByStep(answerByStep),
      wpUserId: getKeyFromQuery("wpUserId"),
      firstName: getKeyFromQuery("firstName"),
      lastName: getKeyFromQuery("lastName"),
      answerByStep,
    };
    console.log(data);
    axios
      .post("https://adamgoldman.herokuapp.com/api/toolResponses", data)
      // .post("http://localhost:3001/api/toolResponses", data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getRatingFromAnswerByStep(answerByStep) {
    let rating;
    Object.keys(answerByStep)
      .reverse()
      .forEach(key => {
        const answer = answerByStep[key];
        if (!isNaN(answer) && Number(answer) >= 1 && Number(answer) <= 5) {
          rating = Number(answer);
        }
      });
    return rating;
  }

  onMessage = evt => {
    try {
      // const message = JSON.parse(evt.data);
      console.log("[MESSAGE FROM PARENT]", evt);
    } catch (err) {
      console.error(
        "error receiving message from parent. make sure you send a stringifed valid json",
        err
      );
      console.log("onMessage evt that caused the error", evt);
    }
  };
  async fetchTool() {
    const toolSlug = getKeyFromQuery("toolSlug");
    if (!toolSlug) {
      return console.error("please provide ?toolSlug=SLUG");
    }
    try {
      const { data: tool } = await axios.get(getToolApiPath(toolSlug));
      if (tool.hasReview) {
        tool.steps = tool.steps.concat(reviewSteps);
      }
      this.setState({ isLoaded: true, tool });
      // window.addEventListener("message", this.onMessage);
      // this.trackLoaded();
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
      eventLabel: this.state.tool.title,
    });
  }

  trackToolSlugDoesntExist(toolSlug) {
    window.ga("send", {
      hitType: "event",
      eventCategory: "Mind Tool",
      eventAction: "Tool slug doesn't exist",
      eventLabel: toolSlug,
    });
  }

  trackStepChange(multiFormState) {
    window.ga("send", {
      hitType: "event",
      eventCategory: "Mind Tool",
      eventAction: `Go To Step ${multiFormState.currentStepNum}`,
      eventLabel: this.state.tool.title,
    });
  }
}

export default EmbeddedTool;

function getKeyFromQuery(key) {
  return queryString.parse(window.location.search)[key];
}

function getHiddenFieldsFromQuery() {
  const queryObject = queryString.parse(window.location.search);
  return Object.keys(queryObject).reduce((acc, key) => {
    if (key.startsWith("hf_")) {
      const hf = key.replace("hf_", "");
      acc[hf] = queryObject[key];
    }
    return acc;
  }, {});
}

function getToolApiPath(toolSlug) {
  // return `http://localhost:3001/api/tools/${toolSlug}`;
  return `https://adamgoldman.herokuapp.com/api/tools/${toolSlug}`;
}
