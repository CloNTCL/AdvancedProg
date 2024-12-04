import React, { useState } from 'react';
import Header from './header';
import { useLocation, useParams } from 'react-router-dom';
import '../styles/admin.css';

const AdminModuleDetails = () => {

    const location = useLocation();
    const { code } = useParams();
    const { name = "Unknown Module", code: moduleCode = code } = location.state || {};

    const [criteria, setCriteria] = useState([
        "Teacher’s availability",
        "Amount of work",
        "Critère 3",
        "Critère 4",
      ]);
    
      const [newQuestion, setNewQuestion] = useState("");
      const [comment, setComment] = useState("");
    
      // Handle adding a new question
      const handleAddQuestion = () => {
        if (newQuestion.trim()) {
          setCriteria([...criteria, newQuestion]);
          setNewQuestion("");
        }
      };
    
      // Handle submitting the form
      const handleSubmit = () => {
        const formData = {
          criteria,
          comment,
        };
        console.log("Form data:", formData);
        alert("Form has been created successfully!");
      };
    
      return (
        <div>
        <Header /> 
        <div className="module-details-container">
          <div className="module-details-content">
            <h2>{name} - {moduleCode}</h2>
            <div className="criteria-box">
              <table className="criteria-table">
                <thead>
                  <tr>
                    <th></th>
                    <th className="module-details-form-text">Not satisfied</th>
                    <th className="module-details-form-text">Very satisfied</th>
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((criterion, index) => (
                    <tr key={index}>
                      <td>{criterion}</td>
                      <td colSpan="2">
                        <input type="range" min="1" max="5" className="slider" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="add-question">
                <input
                  type="text"
                  placeholder="Enter a new question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
                <button onClick={handleAddQuestion}>+ Add a question</button>
              </div>
            </div>
            <div className="comment-section">
              <label htmlFor="comment">Add a comment:</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
              />
            </div>
            <div className="submit-section">
              <button onClick={handleSubmit}>Confirm and create the form</button>
            </div>
          </div>
        </div>
        </div>
      );
    };

export default AdminModuleDetails;
