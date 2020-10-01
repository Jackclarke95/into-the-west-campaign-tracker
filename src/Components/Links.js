import React from "react";
import "./Links.scss";
import data from "../Data/Data.json";

function Links() {
  return (
    <span className="panel links-panel">
      <h2>Links</h2>
      <div className="link-lists">
        {data["link-groups"].map((linkGroup, i) => {
          return (
            <div key={i}>
              <h3>{linkGroup.name}</h3>
              <ul>
                {linkGroup.links.map((link, j) => {
                  return (
                    <li key={j}>
                      <a rel="noopener noreferrer" target="_blank" href={link.url}>
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </span>
  );
}

export default Links;
