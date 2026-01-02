import React from 'react';

export const NoteItem = ({ note, onEdit, onDelete }) => {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h6 className="card-title mb-0">{note.title}</h6>
              <small className="text-muted">{note.tag || 'General'}</small>
            </div>
            <div className="btn-group btn-group-sm" role="group" aria-label="Note actions">
              <button className="btn btn-outline-primary btn-edit" onClick={() => onEdit(note)}>Edit</button>
              <button className="btn btn-outline-danger btn-delete" onClick={() => onDelete(note._id)}>Delete</button>
            </div>
          </div>
          <p className="card-text mb-0">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
