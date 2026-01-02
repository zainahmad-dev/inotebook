import React from 'react';

export const About = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center gap-5">
        <div className="col-lg-6">
          <h1 className="display-4 fw-bold mb-4" style={{ color: '#1e3a8a' }}>
            About Notexia
          </h1>

          <p className="lead text-muted mb-4">
            Notexia is a modern, secure, and intelligent digital notebook designed 
            to help you capture ideas, organize thoughts, and stay productive — all in one place.
          </p>

          <div className="space-y-3">
            <div className="mb-4">
              <h5 className="fw-semibold" style={{ color: '#2563eb' }}>
                📝 Smart Note Management
              </h5>
              <p className="text-muted">
                Easily create, edit, and organize your notes with tags. 
                Notexia keeps your ideas structured and accessible.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fw-semibold" style={{ color: '#2563eb' }}>
                🔒 Privacy First
              </h5>
              <p className="text-muted">
                Your notes belong to you. Notexia ensures data security and privacy 
                so your information stays protected.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fw-semibold" style={{ color: '#2563eb' }}>
                ☁️ Anytime, Anywhere Access
              </h5>
              <p className="text-muted">
                Access your notes from any device. Your data stays synced 
                so your ideas are always within reach.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fw-semibold" style={{ color: '#2563eb' }}>
                ⚡ Fast & Minimal
              </h5>
              <p className="text-muted">
                Built using a modern tech stack, Notexia delivers a fast, clean, 
                and distraction-free note-taking experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
