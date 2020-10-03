import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import IssueForm from "./IssueForm";
import { fetchIssue } from "./api";
import ConfirmDeleteIssueModal from "./ConfirmDeleteIssueModal";

export default function IssueDetails({ labels, deleteIssue, editIssue }) {
  const { id } = useParams();
  const history = useHistory();
  const [issue, setIssue] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
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

  function showDeleteConfirmationModal() {
    setIsConfirmationShown(true);
  }

  function hideDeleteConfirmationModal() {
    setIsConfirmationShown(false);
  }

  function confirmDeletion() {
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
        <p>Issue not found</p>
      </div>
    );
  }

  return (
    <div>
      <IssueForm labels={labels} issue={issue} onSubmit={handleSubmit} />
      <br />

      {isConfirmationShown && (
        <ConfirmDeleteIssueModal
          onClose={hideDeleteConfirmationModal}
          onConfirm={confirmDeletion}
        />
      )}

      <div className="text-right">
        <button
          type="button"
          className="btn btn-danger"
          onClick={showDeleteConfirmationModal}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
