import React, { useState, useCallback } from 'react';
import noteContext from './noteContext';

const NoteState = ({ children }) => {
  const host = process.env.REACT_APP_API_HOST || 'http://localhost:5000';
  const [notes, setNotes] = useState([]);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'auth-token': token } : {};
  };

  const getNotes = useCallback(async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    if (!response.ok) return;
    const json = await response.json();
    setNotes(json);
  }, [host]);

  const addNote = async (title, description, tag = 'General') => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    if (!response.ok) return;
    const note = await response.json();
    setNotes((prev) => [note, ...prev]);
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    if (!response.ok) return;
    setNotes((prev) => prev.filter((note) => note._id !== id));
  };

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    if (!response.ok) return;
    setNotes((prev) =>
      prev.map((note) => (note._id === id ? { ...note, title, description, tag } : note))
    );
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {children}
    </noteContext.Provider>
  );
};

export default NoteState;
