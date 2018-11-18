import {
  FB_GROUP,
  MESSENGER_LINK_TALK_AT_END_OF_MODULE,
  MODULES_PAGE,
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
    saveAnswersToDb: true,
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
    title: "Next steps",
    description: "What would you like to do next my friend?",
    answers: [
      {
        text: "Share on the FB group",
        linkNew: FB_GROUP,
      },
      {
        text: "Talk to me about your experience",
        linkNew: MESSENGER_LINK_TALK_AT_END_OF_MODULE,
      },
      {
        text: "Choose next mind journey experience",
        linkNew: MODULES_PAGE,
      },
    ],
  },
];
