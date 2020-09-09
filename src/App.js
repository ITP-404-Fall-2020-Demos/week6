import React, { useState } from "react";
import "./App.css";
import IssueList from "./IssueList";
import IssueForm from "./IssueForm";

function App() {
  const labels = [
    {
      id: 0,
      name: "bug",
      color: "red",
    },
    {
      id: 1,
      name: "documentation",
      color: "blue",
    },
    {
      id: 2,
      name: "question",
      color: "pink",
    },
  ];

  const [issues, setIssues] = useState([
    {
      id: 0,
      title: "Issue 0",
      label: 1,
    },
    {
      id: 1,
      title: "Issue 1",
      label: 2,
    },
    {
      id: 2,
      title: "Issue 2",
      label: 0,
    },
    {
      id: 3,
      title: "Issue 3",
      label: 2,
    },
  ]);

  function createIssue(title, labelId) {
    const newIssue = {
      id: issues.length,
      title,
      label: labelId,
    };

    setIssues(issues.concat(newIssue));
  }

  return (
    <div className="container mt-3">
      <h1>Issues</h1>
      <IssueList issues={issues} labels={labels} />
      <div className="mt-3">
        <h3>Create Issue</h3>
        <IssueForm labels={labels} onSubmit={createIssue} />
      </div>
    </div>
  );
}

export default App;
