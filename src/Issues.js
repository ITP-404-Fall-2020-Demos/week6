import React, { useState, useContext, useMemo } from "react";
import IssueList from "./IssueList";
import { Link } from "react-router-dom";
import { DataStoreContext } from "./contexts";

export default function Issues() {
  const { issues, labels } = useContext(DataStoreContext);
  const [selectedLabelId, setSelectedLabelId] = useState("-");
  const [count, setCount] = useState(0);

  const options = [{ id: "-", name: "All" }].concat(labels);

  function handleLabelChange(event) {
    const { value } = event.target;
    const selectedLabelId = value === "-" ? value : Number(value);
    setSelectedLabelId(selectedLabelId);
  }

  console.log("Issues was rerendered");

  const filteredIssues = useMemo(() => {
    console.log("issues were filtered");
    const isAllSelected = selectedLabelId === "-";

    if (isAllSelected) {
      return issues;
    } else {
      return issues.filter((issue) => {
        return issue.label === selectedLabelId;
      });
    }
  }, [selectedLabelId, issues]);

  return (
    <>
      {count}
      <button onClick={() => setCount(count + 1)}>Click me</button>

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
