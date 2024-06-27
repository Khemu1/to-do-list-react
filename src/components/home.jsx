import "../styles/home.css";
import React, { useContext, useEffect, useState } from "react";
import { getUserLists, useAddList } from "../hooks/APIs";
import { nanoid } from "nanoid";
function Home() {
  const [lists, setLists] = useState([]);
  const { data, error } = getUserLists();
  const [currentList, setCurrentList] = useState(null);
  const {
    addList,
    dataStatus: addListStatus,
    error: addListError,
  } = useAddList();

  const handleAddList = () => {
    const newList = { id: nanoid(), name: "New List", content: "" };
    setLists((prevLists) => [...prevLists, newList]);
    console.log(newList);
    addList(newList.id,newList);
  };
  const handleSave = (id) => {
    const newList = lists.find((list) => list.id === id);
    console.log(newList);
  };
  const handleSelect = (id) => {
    lists.map((list) => {
      if (list.id === id) {
        setCurrentList(list);
      }
    });
  };
  const handleNameChane = (id, newName) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === id ? { ...list, name: newName } : list
      )
    );
  };
  const handleListEdit = (e) => {
    if (currentList) {
      const newContent = e.target.value;
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === currentList.id ? { ...list, content: newContent } : list
        )
      );
      setCurrentList((prev) => ({ ...prev, content: newContent }));
    }
  };
  const handleDelete = (id) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== id));
    if (currentList && currentList.id === id) {
      setCurrentList(null);
    }
  };

  useEffect(() => {
    setLists(data);
  }, []);

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
              <div className="list" key={list.id}>
                <input
                  className={
                    currentList && currentList.id === list.id
                      ? "list-field selected"
                      : "list-field"
                  }
                  value={list.name}
                  onClick={() => handleSelect(list.id)}
                  onChange={(e) => handleNameChane(list.id, e.target.value)}
                />
                <button
                  value={list.id}
                  className="delete"
                  onClick={(e) => handleDelete(e.target.value)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </section>
        <div className="detail">
          {currentList && (
            <>
              <textarea
                name="list-detail"
                id="list-detail"
                className="list-detail"
                value={currentList.content}
                onChange={handleListEdit}
              ></textarea>
              <button
                className="save"
                value={currentList.id}
                onClick={(e) => handleSave(e.target.value)}
              >
                Save
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
}
export default Home;
