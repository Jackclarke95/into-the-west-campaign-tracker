import * as React from "react";
import "../Style/Facilities.scss";

const Facilities = (props) => {
  let facilities = props.facilities;
  let downtimeActivities = props.downtimeActivities;

  console.log(downtimeActivities);

  return (
    <div className="panel facilities-panel">
      <div className="header-and-button">
        <h2>Westeridge Facilities</h2>
      </div>
      <table>
        <thead key="thead">
          <tr>
            <th className="column name">Facility</th>
            <th className="column tier-level">Current Tier Level</th>
            <th className="column uses">Total Uses</th>
            <th className="column uses-to-level-up">Uses Until Level Up</th>
          </tr>
        </thead>
        <tbody>
          {facilities.map((f) => {
            return (
              <tr>
                <td className="column name">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/Images/${f.name
                        .toLowerCase()
                        .replace(" ", "-")
                        .replace("'", "")}-icon.svg`
                    }
                    alt="logo"
                  />
                  {f.name}
                </td>
                <td className="column tier-level">
                  {calculateTierLevel(f, downtimeActivities)}
                </td>
                <td className="column uses">
                  {calculateFacilityUses(f, downtimeActivities)}
                </td>
                <td className="column uses-to-level-up">
                  {calculateUsesToNextLevel(f, downtimeActivities)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

function calculateFacilityUses(facility, activities) {
  let matchingFacilities = [];

  activities.map((a) => {
    if (
      a.activity.id === facility.activities["preparation-activity"].id ||
      a.activity.id === facility.activities["discovery-activity"].id
    ) {
      matchingFacilities.push(a);
    }
  });

  return matchingFacilities.length;
}

function calculateTierLevel(facility, activities) {
  let facilityUses = calculateFacilityUses(facility, activities);

  if (facilityUses < 10) {
    return 1;
  } else if (facilityUses < 25) {
    return 2;
  } else return 3;
}

function calculateUsesToNextLevel(facility, activities) {
  let tierLevel = calculateTierLevel(facility, activities);
  let tierUses = calculateFacilityUses(facility, activities);

  if (tierLevel === 1) {
    return 10 - tierUses;
  } else if (tierLevel === 2) {
    return 25 - tierUses;
  } else return "N/A";
}

export default Facilities;
