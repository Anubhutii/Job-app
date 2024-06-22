// src/JobApplicationForm.js
import React, { useState } from 'react';
import './JobApplicationForm.css';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: '',
  });

  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const positions = ['Developer', 'Designer', 'Manager'];
  const skills = ['JavaScript', 'CSS', 'Python', 'React', 'Node.js'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    const updatedSkills = checked
      ? [...formData.additionalSkills, value]
      : formData.additionalSkills.filter((skill) => skill !== value);
    setFormData({
      ...formData,
      additionalSkills: updatedSkills,
    });
  };

  const validate = () => {
    const errors = {};
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i');

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }
    if ((formData.position === 'Developer' || formData.position === 'Designer') && (!formData.relevantExperience || formData.relevantExperience <= 0)) {
      errors.relevantExperience = 'Relevant Experience is required and must be greater than 0';
    }
    if (formData.position === 'Designer' && (!formData.portfolioUrl.trim() || !urlPattern.test(formData.portfolioUrl))) {
      errors.portfolioUrl = 'Portfolio URL is required and must be a valid URL';
    }
    if (formData.position === 'Manager' && !formData.managementExperience.trim()) {
      errors.managementExperience = 'Management Experience is required';
    }
    if (formData.additionalSkills.length === 0) {
      errors.additionalSkills = 'At least one skill must be selected';
    }
    if (!formData.preferredInterviewTime.trim()) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowSummary(true);
    }
  };

  return (
    <div className="form-container">
      <form className="responsive-form" onSubmit={handleSubmit}>
        <h2>Job Application Form</h2>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="position">Applying for Position:</label>
          <select
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
          >
            <option value="">Select a position</option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>
        {['Developer', 'Designer'].includes(formData.position) && (
          <div className="form-group">
            <label htmlFor="relevantExperience">Relevant Experience (years):</label>
            <input
              type="number"
              id="relevantExperience"
              name="relevantExperience"
              value={formData.relevantExperience}
              onChange={handleChange}
            />
            {errors.relevantExperience && <p className="error">{errors.relevantExperience}</p>}
          </div>
        )}
        {formData.position === 'Designer' && (
          <div className="form-group">
            <label htmlFor="portfolioUrl">Portfolio URL:</label>
            <input
              type="text"
              id="portfolioUrl"
              name="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleChange}
            />
            {errors.portfolioUrl && <p className="error">{errors.portfolioUrl}</p>}
          </div>
        )}
        {formData.position === 'Manager' && (
          <div className="form-group">
            <label htmlFor="managementExperience">Management Experience:</label>
            <input
              type="text"
              id="managementExperience"
              name="managementExperience"
              value={formData.managementExperience}
              onChange={handleChange}
            />
            {errors.managementExperience && <p className="error">{errors.managementExperience}</p>}
          </div>
        )}
        <div className="form-group">
          <label>Additional Skills:</label>
          {skills.map((skill) => (
            <div key={skill}>
              <input
                type="checkbox"
                id={skill}
                name="additionalSkills"
                value={skill}
                checked={formData.additionalSkills.includes(skill)}
                onChange={handleSkillChange}
              />
              <label htmlFor={skill}>{skill}</label>
            </div>
          ))}
          {errors.additionalSkills && <p className="error">{errors.additionalSkills}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="preferredInterviewTime">Preferred Interview Time:</label>
          <input
            type="datetime-local"
            id="preferredInterviewTime"
            name="preferredInterviewTime"
            value={formData.preferredInterviewTime}
            onChange={handleChange}
          />
          {errors.preferredInterviewTime && <p className="error">{errors.preferredInterviewTime}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
      {showSummary && (
        <div className={`popup ${showSummary ? 'show' : ''}`}>
          <div className="popup-inner">
            <h2>Application Summary</h2>
            <p><strong>Full Name:</strong> {formData.fullName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
            <p><strong>Position:</strong> {formData.position}</p>
            {['Developer', 'Designer'].includes(formData.position) && (
              <p><strong>Relevant Experience:</strong> {formData.relevantExperience} years</p>
            )}
            {formData.position === 'Designer' && (
              <p><strong>Portfolio URL:</strong> {formData.portfolioUrl}</p>
            )}
            {formData.position === 'Manager' && (
              <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
            )}
            <p><strong>Additional Skills:</strong> {formData.additionalSkills.join(', ')}</p>
            <p><strong>Preferred Interview Time:</strong> {formData.preferredInterviewTime}</p>
            <button onClick={() => setShowSummary(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
