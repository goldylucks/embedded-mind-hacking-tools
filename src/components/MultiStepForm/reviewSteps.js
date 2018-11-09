/* eslint-disable max-len */

import {
  MESSENGER_LINK_WELCOME,
  MESSENGER_LINK_BOOK_SESSION,
  MESSENGER_LINK_INNER_CIRCLE,
} from "../../constants";

export default [
  {
    title: "Review - most useful",
    description:
      "Which part did you find the most useful, and why?\n (or found more beneficial/healing)",
    type: "long",
    answers: [],
  },
  {
    title: "Review - rate",
    description:
      "How much did you find this process useful/beneficial/healing?",
    type: "stars-review",
  },
  {
    title: "Final comments & suggestions",
    id: "finalComments",
    description: `Do you want to be even MORE awesome than what you already are? 🔥

Help me improve this process! 🙏

(And get a unicorn's blessing 🦄)

Please share with me how was it for you. Any suggestions you might have? Any questions? Critics? Comments? Thoughts?

A single insight could change the lives of hundreds of our fellow humans.

Please don’t hold back. I take everything as constructive feedback.`,
    type: "long",
    answers: [],
  },
  {
    title: "Finish",
    description: "Click the button below to finish this process",
    answers: [
      {
        text: "Click to Finish",
      },
    ],
  },
];
