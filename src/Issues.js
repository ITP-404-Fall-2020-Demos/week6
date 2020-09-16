import React from "react";
import IssueList from "./IssueList";
import { Link } from "react-router-dom";

export default function Issues({ issues, labels, labelsById }) {
  return (
    <>
      <div className="text-right mb-3">
        <Link to="/new" className="btn btn-primary">
          Create Issue
        </Link>
      </div>
      <IssueList issues={issues} labels={labels} labelsById={labelsById} />
    </>
  );
}
