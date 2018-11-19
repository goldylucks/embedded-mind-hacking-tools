import React from "react";
import ReactMarkdown from "react-markdown";

import YtEmbedd from "../YtEmbedd";

const Markdown = props => (
  <ReactMarkdown
    {...props}
    renderers={{
      link: linkProps => {
        if (linkProps.href === "YtEmbedd") {
          return <YtEmbedd src={linkProps.children} />;
        }

        if (linkProps.href.indexOf("STRIKE") === 0) {
          return <s>{linkProps.children}</s>;
        }

        if (linkProps.href.match("http")) {
          return (
            <a
              href={linkProps.href}
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              {linkProps.children}
            </a>
          );
        }

        if (linkProps.href.match(/NEW$/)) {
          return (
            <a
              href={linkProps.href.replace(/NEW$/, "")}
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              {linkProps.children}
            </a>
          );
        }

        return <p>Markdown: Internal Links are not supported</p>;
      },
    }}
  />
);

export default Markdown;
