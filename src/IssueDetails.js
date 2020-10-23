import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import IssueForm from "./IssueForm";
import { fetchIssue } from "./api";
import ConfirmDeleteIssueModal from "./ConfirmDeleteIssueModal";

export default function IssueDetails({ deleteIssue, editIssue }) {
  const { id } = useParams();
  const history = useHistory();
  const [issue, setIssue] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmationShown, setIsConfirmationShown] = useState(false);

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
  }, [id]);

  function confirmDeletion() {
    deleteIssue(issue);
    history.push("/");
  }

  function handleSubmit(newTitle, newLableId) {
    editIssue(issue, newTitle, newLableId);
    history.push("/");
  }

  function showDeleteConfirmation() {
    setIsConfirmationShown(true);
  }

  function hideDeleteConfirmation() {
    setIsConfirmationShown(false);
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
      {isConfirmationShown && (
        <ConfirmDeleteIssueModal
          onClose={hideDeleteConfirmation}
          onConfirm={confirmDeletion}
        />
      )}
      <IssueForm issue={issue} onSubmit={handleSubmit} />
      <br />

      <div className="text-right">
        <button
          type="button"
          className="btn btn-danger"
          onClick={showDeleteConfirmation}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
