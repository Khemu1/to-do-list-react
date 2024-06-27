import React from "react";

function ListDetail({ list, onContentChange }) {
  if (!list) return null;

  return (
    <div className="detail">
      <textarea
        name="list-detail"
        id="list-detail"
        className="list-detail"
        value={list.content}
        onChange={(e) => onContentChange(list.listId, e.target.value)}
      ></textarea>
    </div>
  );
}

export default ListDetail;
