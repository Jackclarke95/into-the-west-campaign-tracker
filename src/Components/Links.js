import React from "react";
import "./Links.scss";

function Links() {
  return (
    <span className="panel links-panel">
      <h2>Links</h2>
      <div className="link-lists">
        <div>
          <div>
            <h3>D&amp;D Beyond Campaign 1</h3>
            <ul>
              <li>
                <a
                  target="blank"
                  href="https://www.dndbeyond.com/campaigns/1003579"
                >
                  Campaign Link
                </a>
              </li>
              <li>
                <a
                  target="blank"
                  href="https://ddb.ac/campaigns/join/10035793062304491"
                >
                  Invite Link
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h3>D&amp;D Beyond Campaign 2</h3>
          <ul>
            <li>
              <a
                target="blank"
                href="https://www.dndbeyond.com/campaigns/1207080
                "
              >
                Campaign Link
              </a>
            </li>
            <li>
              <a
                target="blank"
                href="https://ddb.ac/campaigns/join/12070802660007381"
              >
                Invite Link
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3>LegendKeeper</h3>
          <ul>
            <li>
              <a
                target="blank"
                href="https://app.legendkeeper.com/a/worlds/cjz6tm8r3f2nq0796l89hyl6l/atlas/ck8ncyigln39v0790a31w1x6h"
              >
                Map
              </a>
            </li>
            <li>
              <a
                target="blank"
                href="https://app.legendkeeper.com/a/worlds/cjz6tm8r3f2nq0796l89hyl6l/wiki/ck8nlecpwr3q60756mj8rm1qu"
              >
                Westeridge
              </a>
            </li>
            <li>
              <a
                target="blank"
                href="https://app.legendkeeper.com/a/worlds/cjz6tm8r3f2nq0796l89hyl6l/wiki/ck8uslol4dco60790e3bfmsz2"
              >
                Campaign Log
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Homwbrew</h3>
          <ul>
            <li>
              <a
                target="blank"
                href={`https://1drv.ms/b/s!AosWm-HIqV1WhN0OJ7eORi3AQSBBgw`}
              >
                Strongholds and Followers
              </a>
            </li>
            <li>
              <a
                target="blank"
                href="https://1drv.ms/b/s!AosWm-HIqV1WkKMQI61LjkNJ2Tc85w?e=CJSo12"
              >
                Downtime Activities
              </a>
            </li>
          </ul>
        </div>
      </div>
    </span>
  );
}

export default Links;
