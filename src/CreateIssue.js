import React from "react";
import IssueForm from "./IssueForm";
import { useHistory } from "react-router-dom";

export default function CreateIssue({ labels, createIssue }) {
  const history = useHistory();

  function handleSubmit(title, labelId) {
    createIssue(title, labelId);
    history.push("/"); // redirect to the route with path="/"
  }

  return (
    <div className="mt-3">
      <h3>Create Issue</h3>
      <IssueForm labels={labels} onSubmit={handleSubmit} />
    </div>
  );
}
