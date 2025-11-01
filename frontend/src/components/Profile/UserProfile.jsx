import React, { useState, useCallback } from 'react';
import './UserProfile.css';
import ProfileDashboard from './ProfileDashboard';

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('basic');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    headline: '',
    education: [
      { id: 1, school: '', degree: '', field: '', startDate: '', endDate: '', description: '' }
    ],
    experience: [
      { id: 1, company: '', position: '', location: '', startDate: '', endDate: '', description: '', current: false }
    ],
    skills: [],
    interests: [],
    achievements: ''
  });

  const [tempSkill, setTempSkill] = useState('');
  const [tempInterest, setTempInterest] = useState('');

  // Use useCallback for update functions
  const updateEducation = useCallback((id, field, value) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  }, []);

  const updateExperience = useCallback((id, field, value) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  }, []);

  // Move components outside the main render to prevent re-creation
  const Navigation = React.memo(() => (
    <div className="form-navigation">
      <button 
        className={activeSection === 'basic' ? 'nav-btn active' : 'nav-btn'}
        onClick={() => setActiveSection('basic')}
      >
        Basic Info
      </button>
      <button 
        className={activeSection === 'education' ? 'nav-btn active' : 'nav-btn'}
        onClick={() => setActiveSection('education')}
      >
        Education
      </button>
      <button 
        className={activeSection === 'experience' ? 'nav-btn active' : 'nav-btn'}
        onClick={() => setActiveSection('experience')}
      >
        Experience
      </button>
      <button 
        className={activeSection === 'skills' ? 'nav-btn active' : 'nav-btn'}
        onClick={() => setActiveSection('skills')}
      >
        Skills
      </button>
      <button 
        className={activeSection === 'achievements' ? 'nav-btn active' : 'nav-btn'}
        onClick={() => setActiveSection('achievements')}
      >
        Achievements
      </button>
    </div>
  ));

  // Education Methods - keep them simple
  const addEducation = () => {
    const newId = Math.max(...profile.education.map(edu => edu.id), 0) + 1;
    setProfile(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: newId, school: '', degree: '', field: '', startDate: '', endDate: '', description: '' }
      ]
    }));
  };

  const removeEducation = (id) => {
    if (profile.education.length > 1) {
      setProfile(prev => ({
        ...prev,
        education: prev.education.filter(edu => edu.id !== id)
      }));
    }
  };

  // Experience Methods
  const addExperience = () => {
    const newId = Math.max(...profile.experience.map(exp => exp.id), 0) + 1;
    setProfile(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: newId, company: '', position: '', location: '', startDate: '', endDate: '', description: '', current: false }
      ]
    }));
  };

  const removeExperience = (id) => {
    if (profile.experience.length > 1) {
      setProfile(prev => ({
        ...prev,
        experience: prev.experience.filter(exp => exp.id !== id)
      }));
    }
  };

  // Skills & Interests
  const addSkill = () => {
    if (tempSkill.trim() && !profile.skills.includes(tempSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, tempSkill.trim()]
      }));
      setTempSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addInterest = () => {
    if (tempInterest.trim() && !profile.interests.includes(tempInterest.trim())) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, tempInterest.trim()]
      }));
      setTempInterest('');
    }
  };

  const removeInterest = (interestToRemove) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== interestToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setUserData(profile);
      setIsSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setProfile({
      name: '',
      email: '',
      phone: '',
      location: '',
      headline: '',
      education: [{ id: 1, school: '', degree: '', field: '', startDate: '', endDate: '', description: '' }],
      experience: [{ id: 1, company: '', position: '', location: '', startDate: '', endDate: '', description: '', current: false }],
      skills: [],
      interests: [],
      achievements: ''
    });
    setActiveSection('basic');
  };

  // Render education items with stable keys
  const renderEducationItems = () => {
    return profile.education.map((edu, index) => (
      <div key={edu.id} className="education-item">
        <div className="item-header">
          <h4>Education #{index + 1}</h4>
          {profile.education.length > 1 && (
            <button 
              type="button" 
              onClick={() => removeEducation(edu.id)}
              className="remove-item-btn"
            >
              Remove
            </button>
          )}
        </div>
        
        <div className="form-grid">
          <div className="form-group">
            <label>School/University *</label>
            <input
              type="text"
              value={edu.school}
              onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
              placeholder="Stanford University"
              required
            />
          </div>
          <div className="form-group">
            <label>Degree</label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
              placeholder="Bachelor of Science"
            />
          </div>
          <div className="form-group">
            <label>Field of Study</label>
            <input
              type="text"
              value={edu.field}
              onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
              placeholder="Computer Science"
            />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="month"
              value={edu.startDate}
              onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="month"
              value={edu.endDate}
              onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
            />
          </div>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              value={edu.description}
              onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
              placeholder="Academic achievements, relevant coursework, honors..."
              rows="3"
            />
          </div>
        </div>
      </div>
    ));
  };

  // Render experience items with stable keys
  const renderExperienceItems = () => {
    return profile.experience.map((exp, index) => (
      <div key={exp.id} className="experience-item">
        <div className="item-header">
          <h4>Experience #{index + 1}</h4>
          {profile.experience.length > 1 && (
            <button 
              type="button" 
              onClick={() => removeExperience(exp.id)}
              className="remove-item-btn"
            >
              Remove
            </button>
          )}
        </div>
        
        <div className="form-grid">
          <div className="form-group">
            <label>Company *</label>
            <input
              type="text"
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
              placeholder="Google"
              required
            />
          </div>
          <div className="form-group">
            <label>Position *</label>
            <input
              type="text"
              value={exp.position}
              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
              placeholder="Senior Software Engineer"
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={exp.location}
              onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
              placeholder="Mountain View, CA"
            />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="month"
              value={exp.startDate}
              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="month"
              value={exp.endDate}
              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
              disabled={exp.current}
            />
          </div>
          <div className="form-group full-width">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
              />
              I currently work here
            </label>
          </div>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              placeholder="Responsibilities, achievements, technologies used..."
              rows="4"
            />
          </div>
        </div>
      </div>
    ));
  };

  // If profile is submitted, show dashboard
  if (isSubmitted && userData) {
    return <ProfileDashboard profile={userData} />;
  }

  return (
    <div className="linkedin-container">
      <div className="profile-header">
        <div className="header-content">
          <h1>Create Your Professional Profile</h1>
          <p>Complete your profile to get best Carrier Advise</p>
        </div>
      </div>

      <div>
        <div className="profile-card">
          <div className="import-note">
            <h2>fill the form below</h2>
          </div>
        </div>

        <Navigation />

        <form onSubmit={handleSubmit} className="profile-form">
          {/* Basic Info Section */}
          {activeSection === 'basic' && (
            <div className="form-section">
              <h3>Basic Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Professional Headline</label>
                  <input
                    type="text"
                    value={profile.headline}
                    onChange={(e) => setProfile(prev => ({ ...prev, headline: e.target.value }))}
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="City, State, Country"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Education Section */}
          {activeSection === 'education' && (
            <div className="form-section">
              <div className="section-header">
                <h3>Education</h3>
                <button type="button" onClick={addEducation} className="add-section-btn">
                  + Add Education
                </button>
              </div>
              {renderEducationItems()}
            </div>
          )}

          {/* Experience Section */}
          {activeSection === 'experience' && (
            <div className="form-section">
              <div className="section-header">
                <h3>Work Experience</h3>
                <button type="button" onClick={addExperience} className="add-section-btn">
                  + Add Experience
                </button>
              </div>
              {renderExperienceItems()}
            </div>
          )}

          {/* Skills Section */}
          {activeSection === 'skills' && (
            <div className="form-section">
              <h3>Skills & Interests</h3>
              
              <div className="skills-section">
                <div className="form-group">
                  <label>Skills</label>
                  <div className="tags-input">
                    <div className="input-with-button">
                      <input
                        type="text"
                        value={tempSkill}
                        onChange={(e) => setTempSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        placeholder="Add a skill and press Enter"
                      />
                      <button type="button" onClick={addSkill} className="add-btn">Add</button>
                    </div>
                    <div className="tags-container">
                      {profile.skills.map((skill, index) => (
                        <span key={skill} className="tag">
                          {skill}
                          <button type="button" onClick={() => removeSkill(skill)} className="remove-tag">
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Interests</label>
                  <div className="tags-input">
                    <div className="input-with-button">
                      <input
                        type="text"
                        value={tempInterest}
                        onChange={(e) => setTempInterest(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                        placeholder="Add professional or personal interests"
                      />
                      <button type="button" onClick={addInterest} className="add-btn">Add</button>
                    </div>
                    <div className="tags-container">
                      {profile.interests.map((interest) => (
                        <span key={interest} className="tag interest-tag">
                          {interest}
                          <button type="button" onClick={() => removeInterest(interest)} className="remove-tag">
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Achievements Section */}
          {activeSection === 'achievements' && (
            <div className="form-section">
              <h3>Achievements & Awards</h3>
              <div className="form-group">
                <textarea
                  value={profile.achievements}
                  onChange={(e) => setProfile(prev => ({ ...prev, achievements: e.target.value }))}
                  placeholder="Notable achievements, awards, publications, certifications..."
                  rows="6"
                />
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={handleReset} className="reset-btn">
              Clear All
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creating Profile...' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;