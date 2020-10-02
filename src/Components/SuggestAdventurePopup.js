import React from "react";
import Popup from "./Popup";
import "./Style/SuggestAdventurePopup.scss";

function SuggestAdventurePopup() {
  return Popup("Suggest an Adventure!", suggestAdventureContent());
}

function suggestAdventureContent() {
  return (
    <>
      <form>
        <p>
          <span className="required"></span> Denotes a required field
        </p>
        <div>
          <div className="adventure-name">
            <label htmlFor="adventure-name" className="required">
              Adventure Name
            </label>
            <input
              id="adventure-name"
              name="adventure-name"
              type="text"
              required="required"
            />
          </div>
          <div className="max-players">
            <label htmlFor="max-players" className="required">
              Max. Players
            </label>
            <input id="max-players" name="max-players" type="text" />
          </div>
          <div className="dungeon-master">
            <label htmlFor="name">Dungeon Master</label>
            <select id="dungeon-master" name="dungeon-master">
              <option value="no-dm">None/Not Sure</option>
              <option value="jack">Jack</option>
              <option value="jbc">JBC</option>
              <option value="louis">Louis</option>
              <option value="dave">Dave</option>
            </select>
          </div>
        </div>
        <div className="adventure-description">
          <label htmlFor="adventure-description" className="required">
            Description
          </label>
          <textarea
            id="adventure-description"
            name="adventure-description"
            type="text"
            required
            rows="20"
          />
        </div>
        <input type="submit" />
      </form>
    </>
  );
}

export default SuggestAdventurePopup;
