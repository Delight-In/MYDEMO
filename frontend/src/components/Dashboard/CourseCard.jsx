import React from 'react';
import './CourseCard.css';

const CourseCard = ({ course, onClick }) => {
  return (
    <article className="course-card" onClick={() => onClick(course)}>
      <div className="card-image">
        <img src={course.image} alt={course.title} />
        <div className="card-overlay">
          <span className="enroll-text">Enroll Now</span>
        </div>
      </div>
      
      <div className="card-content">
        <h3>{course.title}</h3>
        <p className="course-description">{course.description}</p>
        
        <div className="course-stats">
          <div className="stat">
            <span className="stat-value">{course.stats.enrolled.toLocaleString()}</span>
            <span className="stat-label">Enrolled</span>
          </div>
          <div className="stat">
            <span className="stat-value">{course.stats.rating}</span>
            <span className="stat-label">Rating</span>
          </div>
        </div>
      </div>
      
      <footer className="card-footer">
        <span className="course-level">Beginner - Advanced</span>
        <span className="course-duration">12 Weeks</span>
      </footer>
    </article>
  );
};

export default CourseCard;