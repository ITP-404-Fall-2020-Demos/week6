import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import IssueForm from "./IssueForm";
import { fetchIssue } from "./api";

export default function IssueDetails({
  issues,
  labels,
  deleteIssue,
  editIssue,
}) {
  const { id } = useParams();
  const history = useHistory();
  const [issue, setIssue] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchIssue(id)
      .then(
        (issue) => {
          setIssue(issue);
        },
        (error) => {
          setError(error);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleDeleteButtonClick() {
    deleteIssue(issue);
    history.push("/");
  }

  function handleSubmit(newTitle, newLableId) {
    editIssue(issue, newTitle, newLableId);
    history.push("/");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
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
