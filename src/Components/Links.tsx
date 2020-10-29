import * as React from "react";
import "../Style/Links.scss";

const Links = (props) => {
  const linkGroups = props.linkGroups;

  return (
    <span className="panel links-panel">
      <h2>Links</h2>
      {linkGroups ? (
        <div className="link-lists">
          {linkGroups.map((linkGroup, i) => {
            return (
              <div key={i}>
                <h3>{linkGroup.name}</h3>
                <ul>
                  {linkGroup.links.map((link, j) => {
                    return (
                      <li key={j}>
                        <a
                          rel="noopener noreferrer"
                          target="_blank"
                          href={link.url}
                        >
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
      ) : (
        <div>Loading...</div>
      )}
    </span>
  );
};

export default Links;
