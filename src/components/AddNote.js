import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export const AddNote = () => {
  const { addNote } = useContext(noteContext);
  const [note, setNote] = useState({ title: '', description: '', tag: 'General' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (note.title.length < 3 || note.description.length < 5) {
      setError('Title needs 3+ chars and description 5+.');
      return;
    }
    setError('');
    await addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: 'General' });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Add a note</h5>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
              placeholder="Meeting notes"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              placeholder="Work"
            />
          </div>
          <div className="col-12">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              rows="3"
              placeholder="Action items, decisions, links..."
              required
            ></textarea>
          </div>
          {error && <div className="text-danger small">{error}</div>}
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Save note</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
