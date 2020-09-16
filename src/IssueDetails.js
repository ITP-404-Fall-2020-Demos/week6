import React from "react";
import { useParams, useHistory } from "react-router-dom";
import IssueForm from "./IssueForm";

export default function IssueDetails({
  issues,
  labels,
  deleteIssue,
  editIssue,
}) {
  const { id } = useParams();
  const history = useHistory();

  const issue = issues.find((issue) => {
    return issue.id === Number(id);
  });

  function handleDeleteButtonClick() {
    deleteIssue(issue);
    history.push("/");
  }

  function handleSubmit(newTitle, newLableId) {
    editIssue(issue, newTitle, newLableId);
    history.push("/");
  }

  return (
    <div>
      <IssueForm labels={labels} issue={issue} onSubmit={handleSubmit} />
      <br />

      <div className="text-right">
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteButtonClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
