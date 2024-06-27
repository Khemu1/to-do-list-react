import "../styles/home.css";
import React, { useEffect, useState } from "react";
import {
  getUserLists,
  useAddList,
  updateList,
  deleteList,
} from "../hooks/APIs";
import ListComp from "./List";
import ListDetail from "./ListDetail";
import { nanoid } from "nanoid";

function Home() {
  const [originalLists, setOriginalLists] = useState([]);
  const [lists, setLists] = useState([]);
  const { data, error, fetchLists } = getUserLists();
  const [currentList, setCurrentList] = useState(null);
  const {
    addList,
    dataStatus: addListStatus,
    error: addListError,
  } = useAddList();
  const { updateDataStatus, updateError, update } = updateList();
  const { deleteStatus, deleteError, deleteL } = deleteList();

const handleAddList = () => {
  const newList = { listId: nanoid(), name: "New List", content: "" };
  setLists((prevLists) => [...prevLists, newList]);
  setOriginalLists((prevOriginalLists) => [...prevOriginalLists, newList]);
  addList(newList.listId, newList);
};

  const isListChanged = (list, originalList) => {
    return (
      list.name !== originalList.name || list.content !== originalList.content
    );
  };


const handleSave = (id) => {
  const newList = lists.find((list) => list.listId === id);
  const originalList = originalLists.find((list) => list.listId === id);

  if (isListChanged(newList, originalList)) {
    update(id, newList);
  } else {
    console.log("No changes to save.");
  }

  setOriginalLists((prevOriginalLists) =>
    prevOriginalLists.map((list) => (list.listId === id ? newList : list))
  );
};

  const handleSelect = (id) => {
    const selectedList = lists.find((list) => list.listId === id);
    setCurrentList(selectedList);
  };

  const handleNameChange = (id, newName) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.listId === id ? { ...list, name: newName } : list
      )
    );
  };

  const handleDelete = (id) => {
    deleteL(id);
    setLists((prevLists) => prevLists.filter((list) => list.listId !== id));
    if (currentList && currentList.id === id) {
      setCurrentList(null);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    if (data) {
      setLists(data);
      const copiedData = JSON.parse(JSON.stringify(data));
      setOriginalLists(copiedData);
    }
  }, [data]);

  return (
    <>
      <main>
        <section>
          <div className="head">
            <h2>Your Tasks</h2>
            <p onClick={handleAddList}>+</p>
          </div>
          <div className="lists">
            {lists.map((list) => (
              <ListComp
                key={list.listId}
                list={list}
                onSelect={handleSelect}
                onDelete={handleDelete}
                onNameChange={handleNameChange}
                currentList={currentList}
                onSave={handleSave}
              />
            ))}
          </div>
        </section>
        <div className="detail">
          <ListDetail
            list={currentList}
            onContentChange={(id, newContent) => {
              setLists((prev) =>
                prev.map((list) =>
                  list.listId === id ? { ...list, content: newContent } : list
                )
              );
              setCurrentList((prev) => ({ ...prev, content: newContent }));
            }}
          />
        </div>
      </main>

      {/* Display errors */}
      {addListError && <p className="error">{addListError}</p>}
      {updateError && <p className="error">{updateError}</p>}
      {deleteError && <p className="error">{deleteError}</p>}
    </>
  );
}

export default Home;
