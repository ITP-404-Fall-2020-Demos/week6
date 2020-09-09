import React, { useState } from "react";

export default function IssueForm({ labels, onSubmit }) {
  const [title, setTitle] = useState("");
  const [labelId, setLabelId] = useState(2);

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
