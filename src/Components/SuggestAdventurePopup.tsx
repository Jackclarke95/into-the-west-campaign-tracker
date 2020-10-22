import * as React from "react";
import Popup from "./Popup";
import "../Style/SuggestAdventurePopup.scss";

const SuggestAdventurePopup = (props) => {
  let dungeonMasters = props.players.filter(
    (p) => p["dungeon-master"] === true
  );

  let dmNames = [];

  dungeonMasters.map((dm) => {
    dmNames.push(dm["screen-name"] ?? dm.name);
  });

  // Sort names alphabetically, case-insensitive
  dmNames.sort((a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a == b) return 0;
    return a < b ? -1 : 1;
  });

  return Popup(
    "Suggest an Adventure!",
    suggestAdventureContent(dmNames),
    "suggest-adventure-popup"
  );
};

function suggestAdventureContent(dungeonMasters) {
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
              required={true}
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
              {dungeonMasters.map((dm) => {
                return <option value="dave">{dm}</option>;
              })}
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
            required
            rows={20}
          />
        </div>
        <input type="submit" />
      </form>
    </>
  );
}

export default SuggestAdventurePopup;
