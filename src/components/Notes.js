import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

export const Notes = ({ searchQuery = '' }) => {
  const navigate = useNavigate();
  const { notes, getNotes, deleteNote, editNote } = useContext(noteContext);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    getNotes();
  }, [getNotes, navigate]);

  const startEdit = (note) => {
    setError('');
    setEditing({
      id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag || 'General',
    });
  };

  const handleEditChange = (e) => {
    setEditing({ ...editing, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editing) return;
    if (editing.title.length < 3 || editing.description.length < 5) {
      setError('Title needs 3+ chars and description 5+.');
      return;
    }
    await editNote(editing.id, editing.title, editing.description, editing.tag);
    setEditing(null);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-4">
      <AddNote />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Your notes</h5>
        <small className="text-muted">{filteredNotes.length} of {notes.length} saved</small>
      </div>

      {notes.length === 0 && <div className="text-muted">No notes yet. Add one above.</div>}
      {notes.length > 0 && filteredNotes.length === 0 && (
        <div className="text-muted text-center py-4">No notes found matching "{searchQuery}"</div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {filteredNotes.map((note) => (
          <NoteItem key={note._id} note={note} onEdit={startEdit} onDelete={handleDelete} />
        ))}
      </div>

      {editing && (
        <div className="card mt-4">
          <div className="card-body">
            <h6 className="card-title">Edit note</h6>
            <form onSubmit={handleEditSubmit} className="row g-3">
              <div className="col-md-6">
                <label htmlFor="edit-title" className="form-label">Title</label>
                <input
                  type="text"
                  id="edit-title"
                  name="title"
                  className="form-control"
                  value={editing.title}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="edit-tag" className="form-label">Tag</label>
                <input
                  type="text"
                  id="edit-tag"
                  name="tag"
                  className="form-control"
                  value={editing.tag}
                  onChange={handleEditChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="edit-description" className="form-label">Description</label>
                <textarea
                  id="edit-description"
                  name="description"
                  className="form-control"
                  rows="3"
                  value={editing.description}
                  onChange={handleEditChange}
                  required
                ></textarea>
              </div>
              {error && <div className="text-danger small">{error}</div>}
              <div className="col-12 d-flex gap-2">
                <button type="submit" className="btn btn-success btn-update">Update</button>
                <button type="button" className="btn btn-outline-secondary btn-cancel" onClick={() => setEditing(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
