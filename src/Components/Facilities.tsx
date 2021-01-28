import * as React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "../Style/Facilities.scss";

const Facilities = (props) => {
  let facilities = props.facilities;
  let downtimeActivities = props.downtimeActivities;

  if (!facilities || !downtimeActivities) {
    return <span className="panel facilities-panel">Loading...</span>;
  } else {
    return (
      <span className="panel facilities-panel">
        <div className="header-and-button">
          <h2>Westeridge Facilities</h2>
        </div>
        {facilities ? (
          <Table>
            <Thead key="thead">
              <Tr>
                <Th className="column name">Facility</Th>
                <Th className="column tier-level">Current Tier Level</Th>
                <Th className="column uses">Total Uses</Th>
                <Th className="column uses-to-level-up">Uses Until Level Up</Th>
                <Th className="column gold-invested">Gold Invested</Th>
              </Tr>
            </Thead>
            <Tbody>
              {facilities.map((f) => {
                return (
                  <Tr>
                    <Td className="column name">
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
                    </Td>
                    <Td className="column tier-level">
                      {calculateTierLevel(f, downtimeActivities)}
                    </Td>
                    <Td className="column uses">
                      {calculateFacilityUses(f, downtimeActivities)}
                    </Td>
                    <Td className="column uses-to-level-up">
                      {calculateUsesToNextLevel(f, downtimeActivities)}
                    </Td>
                    <Td className="column gold-invested">
                      {f["gold-invested"]}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        ) : (
          <div>Loading...</div>
        )}
      </span>
    );
  }
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

  if (facilityUses > 25 && facility["gold-invested"] >= 40000) {
    return 3;
  } else if (facilityUses > 10 && facility["gold-invested"] >= 15000) {
    return 2;
  } else return 1;
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
