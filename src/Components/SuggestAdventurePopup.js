import React from "react";
import ReactDOM from "react-dom";
import "./SuggestAdventurePopup.scss";

function SuggestAdventurePopup() {
  return (
    <div id="popup" onClick={() => dismissPopup()}>
      <div id="popup-content">
        <h2>Suggest an Adventure!</h2>
        text content
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

export default SuggestAdventurePopup;
