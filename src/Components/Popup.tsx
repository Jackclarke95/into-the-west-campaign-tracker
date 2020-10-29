import * as React from "react";
import * as ReactDOM from "react-dom";
import "../Style/Popup.scss";

/**
 * Popup window component containing a title and content
 *
 * @param {string} title The title for the popup window
 * @param {string} content The content elements of the popup window
 * @param {string} className The class name for the popup window
 *
 * @returns A popup window with the parameters
 */
function Popup(title, content, className) {
  return (
    <div id="popup-overlay" onClick={() => dismissPopup()}>
      <div
        id="popup-window"
        className={className}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dismiss-button" onClick={() => dismissPopup()}></div>
        <h2 className="popup-header">{title}</h2>
        <div className="popup-body">{content}</div>
      </div>
    </div>
  );
}

/**
 * Click handler for dismissing the popup when clicking outside the popup window
 */
function dismissPopup() {
  ReactDOM.unmountComponentAtNode(document.getElementById("popup-root"));
}

export default Popup;
