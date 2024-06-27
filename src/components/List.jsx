function List({ list, onSelect, onDelete, onNameChange, currentList, onSave }) {
  return (
    <div className="list" key={list.id}>
      <input
        className={
          currentList && currentList.listId === list.listId
            ? "list-field selected"
            : "list-field"
        }
        value={list.name}
        onClick={() => onSelect(list.listId)}
        onChange={(e) => onNameChange(list.listId, e.target.value)}
      />
      <button value={list.listId} className="edit">
        <img
          src="/public/assets/icons/updated.png"
          alt="update"
          onClick={() => onSave(list.listId, list)}
        ></img>
      </button>
      <button
        value={list.listId}
        className="delete"
        onClick={() => onDelete(list.listId)}
      >
        <img src="/public/assets/icons/delete_3807871.png" alt="delete"></img>
      </button>
    </div>
  );
}

export default List;
