import React from 'react';
import './ProfileDashboard.css';

const ProfileDashboard = ({ profile }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Professional Profile Dashboard</h1>
          <p>Welcome to your professional profile</p>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Main Profile Card */}
        <div className="profile-card main-profile">
          <div className="profile-header">
            <div className="avatar">
              {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div className="profile-info">
              <h2>{profile.name}</h2>
              <p className="headline">{profile.headline}</p>
              <p className="location">{profile.location}</p>
              <div className="contact-info">
                <span>📧 {profile.email}</span>
                {profile.phone && <span>📞 {profile.phone}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        {profile.education && profile.education.length > 0 && (
          <div className="profile-card">
            <h3>Education</h3>
            {profile.education.map((edu, index) => (
              <div key={index} className="education-item">
                <h4>{edu.school}</h4>
                <p className="degree">{edu.degree} in {edu.field}</p>
                <p className="date">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
                {edu.description && (
                  <p className="description">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Experience Section */}
        {profile.experience && profile.experience.length > 0 && (
          <div className="profile-card">
            <h3>Work Experience</h3>
            {profile.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <h4>{exp.position}</h4>
                <p className="company">{exp.company} • {exp.location}</p>
                <p className="date">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </p>
                {exp.description && (
                  <p className="description">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills Section */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="profile-card">
            <h3>Skills</h3>
            <div className="skills-container">
              {profile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Interests Section */}
        {profile.interests && profile.interests.length > 0 && (
          <div className="profile-card">
            <h3>Interests</h3>
            <div className="interests-container">
              {profile.interests.map((interest, index) => (
                <span key={index} className="interest-tag">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Section */}
        {profile.achievements && (
          <div className="profile-card">
            <h3>Achievements & Awards</h3>
            <div className="achievements-content">
              {profile.achievements.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="btn-primary" onClick={() => window.print()}>
            Print Profile
          </button>
          <button className="btn-secondary" onClick={() => window.location.reload()}>
            Create New Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;