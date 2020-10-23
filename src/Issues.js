import React, { useState, useEffect, useContext } from "react";
import IssueList from "./IssueList";
import { Link } from "react-router-dom";
import { DataStoreContext } from "./contexts";

export default function Issues() {
  const { issues, labels } = useContext(DataStoreContext);
  const [selectedLabelId, setSelectedLabelId] = useState();
  const [filteredIssues, setFilteredIssues] = useState(issues);

  useEffect(() => {
    setFilteredIssues(issues);
  }, [issues]);

  const options = [{ id: "-", name: "All" }].concat(labels);

  function handleLabelChange(event) {
    const isAllSelected = event.target.value === "-";

    if (isAllSelected) {
      setFilteredIssues(issues);
      setSelectedLabelId("-");
    } else {
      const selectedLabelId = Number(event.target.value);

      const filteredIssues = issues.filter((issue) => {
        return issue.label === selectedLabelId;
      });

      setFilteredIssues(filteredIssues);
      setSelectedLabelId(selectedLabelId);
    }
  }

  return (
    <>
      <div className="text-right mb-3">
        <Link to="/new" className="btn btn-primary">
          Create Issue
        </Link>
      </div>

      <div className="d-flex justify-content-end mb-3">
        <select
          className="form-control w-25"
          value={selectedLabelId}
          onChange={handleLabelChange}
        >
          {options.map((option) => {
            return (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            );
          })}
        </select>
      </div>

      <IssueList issues={filteredIssues} />
    </>
  );
}
