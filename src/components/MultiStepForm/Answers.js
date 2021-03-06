// @flow

import React from "react";
import cx from "classnames";

import ExternalA from "../../components/ExternalA";
import { MESSENGER_LINK_TOOL_CONCERN } from "../../constants";

type Props = {
  answers: Array<any>,
  onSubmit: Function,
  onSubmitOther?: Function,
  path: String,
  isPulsating: Boolean,
};

class Answers extends React.Component {
  state = {
    other: "",
  };

  props: Props;

  render() {
    const { answers, onSubmit, onSaveAnswersToDb, isPulsating } = this.props;
    return (
      <div className={cx("answer-group", { pulsating: isPulsating })}>
        {answers.map((answer, idx) => {
          let html;
          if (answer.isSaveAnswersToDb) {
            onSaveAnswersToDb();
          }
          if (answer.isConcern) {
            html = (
              <ExternalA
                className="btn btn-primary btn-fixed"
                onClick={this.concernClick}
                href={MESSENGER_LINK_TOOL_CONCERN}
              >
                {answer.text}
              </ExternalA>
            );
          } else if (answer.link) {
            html = <p>Internal links are not supported!</p>;
          } else if (answer.linkNew) {
            html = (
              <ExternalA
                className="btn btn-primary btn-fixed"
                href={answer.linkNew}
              >
                {answer.text}
              </ExternalA>
            );
          } else if (answer.isOther) {
            html = (
              <form
                onSubmit={evt => {
                  evt.preventDefault();
                  this.submitOther(idx);
                }}
              >
                <input
                  onChange={evt => {
                    this.setState({ other: evt.target.value });
                  }}
                  placeholder="Other"
                  data-test="other"
                  value={this.state.other}
                  className="btn btn-primary text-left"
                />
                <button>Submit</button>
              </form>
            );
          } else {
            html = (
              <a
                className="btn btn-primary btn-fixed"
                onClick={() => onSubmit(idx)}
              >
                {answer.text}
              </a>
            );
          }

          return (
            <div
              key={idx}
              style={{ marginBottom: 10 }}
              data-test={`answer-${idx}`}
            >
              {html}
            </div>
          );
        })}
      </div>
    );
  }

  submitOther(idx) {
    this.props.onSubmitOther(idx, this.state.other);
    this.setState({ other: "" });
  }

  concernClick = () =>
    global.alert(
      'Let\'s talk about it in messenger, click "get started" if messenger asks you'
    );
}

Answers.defaultProps = {
  onSubmitOther: () => {},
};

export default Answers;
