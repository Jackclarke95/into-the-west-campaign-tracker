import React from "react";
import Popup from "./Popup";
import "../Style/SuggestAdventurePopup.scss";

function SignUpForSessionPopup() {
  return Popup("Suggest an Adventure!", SignUpForSessionContent());
}

function SignUpForSessionContent() {
  const today = new Date();

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
          required="required"
        />
        <>{renderDateBoxes()}</>
        <input
          type="checkbox"
          id="date-2"
          name="date-2"
          value={new Date(today.setDate(today.getDate() + 2)).toLocaleString(
            "en-GB"
          )}
        />
        <label htmlFor="date-2">
          {`${new Date(
            today.setDate(today.getDate() + 2)
          ).toLocaleString("en-GB", { weekday: "long" })}
          ${" - "}   
          ${new Date(today.setDate(today.getDate() + 2)).toLocaleString(
            "en-GB",
            { year: "numeric", month: "numeric", day: "numeric" }
          )}`}
        </label>
        <input type="submit" />
      </form>
    </>
  );
}

function renderDateBoxes() {
  // TODO: Fix this - it's rendering as "[object Object]"

  var i = 1;
  const today = new Date();

  var dateList;

  for (i; i < 15; i++) {
    dateList += (
      <>
        <input
          type="checkbox"
          id="date-1"
          name="date-1"
          value={new Date(today.setDate(today.getDate() + i)).toLocaleString(
            "en-GB"
          )}
        />
        <label htmlFor="date-1">
          {new Date(today.setDate(today.getDate() + i)).toLocaleString("en-GB")}
        </label>
      </>
    );
  }

  console.log(dateList);

  return dateList;
}

export default SignUpForSessionPopup;
