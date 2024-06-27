import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export function useLogin(data) {
  const [dataStatus, setDataStatus] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!data) return;

    const abortController = new AbortController();
    const signal = abortController.signal;

    const login = async () => {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          signal: signal,
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          setError(result.errors);
          setDataStatus(false);
          return;
        }
        setDataStatus(true);
      } catch (error) {
        if (signal.aborted) return;
        setDataStatus(false);
        setError(error);
      }
    };

    login();

    return () => {
      abortController.abort();
    };
  }, [data]);

  return { dataStatus, error };
}

export function useRegister(data) {
  const [dataStatus, setDataStatus] = useState(false);
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!data) return;

    const abortController = new AbortController();
    const signal = abortController.signal;

    const register = async () => {
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          signal: signal,
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          setError(result.errors);
          setDataStatus(false);
          return;
        }
        setDataStatus(true);
        navigateTo("/home");
      } catch (error) {
        if (signal.aborted) return;
        setDataStatus(false);
        setError(error);
      }
    };

    register();

    return () => {
      abortController.abort();
    };
  }, [data]);

  return { dataStatus, error };
}

export function getUserLists() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchLists = async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    try {
      const response = await fetch("/api/lists", {
        method: "GET",
        signal: signal,
      });
      const result = await response.json();
      if (response.ok) {
        setData(result);
      } else {
        setError("Couldn't Retrieve Your Lists. Please try again later.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      abortController.abort();
    }
  };
  return { data, error, fetchLists };
}

export function useAddList() {
  const [dataStatus, setDataStatus] = useState(false);
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();

  const addList = async (id, listData) => {
    try {
      const response = await fetch(`/api/addList/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listData),
      });
      const result = await response.json();
      if (response.ok) {
        setDataStatus(true);
      } else {
        navigateTo("/");
        setError(result.error || "Failed to add list.");
      }
    } catch (error) {
      setError(error.message || "Failed to add list.");
    }
  };

  return { addList, dataStatus, error };
}

export function updateList() {
  const [updateDataStatus, setUpdateDataStatus] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const navigateTo = useNavigate();

  const update = async (id, listData) => {
    console.log(id, listData.name);
    try {
      const response = await fetch(`/api/list/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: listData.name,
          content: listData.content,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setUpdateDataStatus(true);
      } else {
        navigateTo("/");
        setUpdateError(result.error || "Failed to update list.");
      }
    } catch (error) {
      setUpdateError(error.message || "Failed to update list.");
    }
  };
  return { update, updateDataStatus, updateError };
}

export function deleteList() {
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const navigateTo = useNavigate();
  const deleteL = async (id) => {
    try {
      const response = await fetch(`/api/list/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (response.ok) {
        setDeleteStatus(true);
      } else {
        navigateTo("/");
        setDeleteError(result.error || "Failed to delete list.");
      }
    } catch (error) {
      setDeleteError(error.message || "Failed to delete list.");
    }
  };
  return { deleteL, deleteStatus, deleteError };
}
