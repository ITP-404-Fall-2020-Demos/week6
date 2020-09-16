import React from "react";
import { Link } from "react-router-dom";

export default function IssueList({ issues, labels, labelsById }) {
  return (
    <ul className="list-group">
      {issues.map((issue) => {
        const label = labelsById[issue.label];

        return (
          <li
            key={issue.id}
            className="list-group-item d-flex justify-content-between"
          >
            <Link to={`/issues/${issue.id}`}>{issue.title}</Link>
            <div>
              <span
                className="badge badge-pill text-white"
                style={{ backgroundColor: label.color }}
              >
                {label.name}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
