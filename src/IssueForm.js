import React, { useState, useContext } from "react";
import { LabelsContext } from "./contexts";

export default function IssueForm({
  onSubmit,
  issue = { title: "", label: 2 },
}) {
  const [title, setTitle] = useState(issue.title);
  const [labelId, setLabelId] = useState(issue.label);
  const labels = useContext(LabelsContext);

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(title, labelId);

    setTitle("");
    setLabelId(2);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleLabelChange(event) {
    const labelId = Number(event.target.value);
    setLabelId(labelId);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="form-control"
          id="title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="label">Label</label>
        <select
          className="form-control"
          id="label"
          value={labelId}
          onChange={handleLabelChange}
        >
          {labels.map((label) => {
            return (
              <option key={label.id} value={label.id}>
                {label.name}
              </option>
            );
          })}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}
