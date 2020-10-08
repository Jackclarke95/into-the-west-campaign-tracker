import * as React from "react";
import Popup from "./Popup";
import "../Style/SignUpForSessionPopup.scss";

function SignUpForSessionPopup() {
  return Popup(
    "Suggest an Adventure!",
    SignUpForSessionContent(),
    "sign-up-for-session-popup"
  );
}

function SignUpForSessionContent() {
  return (
    <>
      <form>
        <p>
          <span className="required"></span> Denotes a required field
        </p>
        <label htmlFor="adventure-name" className="required">
          Character
        </label>
        <input
          id="character-name"
          name="character-name"
          type="text"
          required={true}
        />
        <div className="date-selection-container">{renderDateBoxes()}</div>
        <input type="submit" />
      </form>
    </>
  );
}

function renderDateBoxes() {
  // TODO: Fix this - it's rendering as "[object Object]"

  var i = 1;
  const today = new Date();

  var dateList = [];

  for (i; i < 15; i++) {
    const date = new Date(today.setDate(today.getDate() + i));

    dateList.push(
      <div className="date-option-container">
        <input
          key={i}
          type="checkbox"
          id={`date-${i}`}
          name={`date-${i}`}
          value={date.toLocaleString("en-GB", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })}
        />
        <label htmlFor={`date-${i}`}>
          {date.toLocaleString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })}
        </label>
      </div>
    );
  }

  console.log(dateList);

  return dateList;
}

export default SignUpForSessionPopup;
