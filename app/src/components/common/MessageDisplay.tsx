import * as React from "react";

const MessageDisplay = ({
  message,
  description = undefined,
  buttonLabel = "Okay",
  action = undefined,
}) => (
  <div className="loader">
    <h2 className="text-center" style={{ wordBreak: "break-all" }}>
      {message || "Message"}
    </h2>
    {description && <span>{description}</span>}
    <br />
    {action && (
      <button className="button button-small" onClick={action} type="button">
        {buttonLabel || "Okay"}
      </button>
    )}
  </div>
);

export default MessageDisplay;
