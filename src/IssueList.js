import React from "react";

export default function IssueList({ issues, labels }) {
  const labelsById = {};

  labels.forEach((label) => {
    labelsById[label.id] = label;
  });

  return (
    <ul className="list-group">
      {issues.map((issue) => {
        // Less efficient way
        // const label = labels.find((label) => {
        //   return label.id === issue.label;
        // });

        const label = labelsById[issue.label];

        return (
          <li
            key={issue.id}
            className="list-group-item d-flex justify-content-between"
          >
            <div>{issue.title}</div>
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
