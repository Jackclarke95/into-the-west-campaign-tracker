import React from "react";
import ReactDOM from "react-dom";
import "./Popup.scss";

/**
 * Popup window component containing a title and content
 *
 * @param {*} title The title for the popup window
 * @param {*} content The content elements of the popup window
 *
 * @returns A popup window with the parameters
 */
function Popup(title, content) {
  return (
    <div id="popup-overlay" onClick={() => dismissPopup()}>
      <div id="popup-window" onClick={(e) => e.stopPropagation()}>
        <div className="dismiss-button" onClick={() => dismissPopup()}>
          +
        </div>
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
