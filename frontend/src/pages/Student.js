import React, { useState } from 'react';

const Student = () => {
  return (
    <div>
      <h1>Welcome to the Student Page</h1>
    </div>
  );
};

// Exemple
const courses = [
  { id: 1, name: 'Mathématiques Avancées' },
  { id: 2, name: 'Physique Quantique' },
  { id: 3, name: 'Introduction à la Programmation' },
];

const EvaluationPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [evaluationData, setEvaluationData] = useState({
    quantitative: {},
    qualitative: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setEvaluationData({ quantitative: {}, qualitative: '' });
    setSubmitted(false);
  };

  const handleQuantitativeChange = (questionId, value) => {
    setEvaluationData((prev) => ({
      ...prev,
      quantitative: { ...prev.quantitative, [questionId]: value },
    }));
  };

  const handleQualitativeChange = (e) => {
    setEvaluationData((prev) => ({ ...prev, qualitative: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Evaluation submitted:', evaluationData);
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Evaluation page</h1>

      <h2>Courses completed</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <button onClick={() => handleCourseSelect(course)}>
              {course.name}
            </button>
          </li>
        ))}
      </ul>

      {selectedCourse && (
        <div style={{ marginTop: '20px' }}>
          <h2>Evaluation for : {selectedCourse.name}</h2>

          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div>
                <h3>Questions</h3>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '10px' }}>
                    1. Course content:
                  </label>
                  <div style={{ position: 'relative', display: 'inline-block', width: '50%' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: `${((evaluationData.quantitative[1] || 0) - 1) * 25}%`,
                        top: '-20px',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#f0f0f0',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      {evaluationData.quantitative[1] || ''}
                    </span>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={evaluationData.quantitative[1] || '1'}
                      onChange={(e) => handleQuantitativeChange(1, e.target.value)}
                      style={{ width: '50%' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '10px' }}>
                    2. Quality of teaching:
                  </label>
                  <div style={{ position: 'relative', display: 'inline-block', width: '50%' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: `${((evaluationData.quantitative[2] || 0) - 1) * 25}%`,
                        top: '-20px',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#f0f0f0',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      {evaluationData.quantitative[2] || '0'}
                    </span>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={evaluationData.quantitative[2] || '1'}
                      onChange={(e) => handleQuantitativeChange(2, e.target.value)}
                      style={{ width: '50%' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '10px' }}>
                    3. Quality of exercises:
                  </label>
                  <div style={{ position: 'relative', display: 'inline-block', width: '50%' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: `${((evaluationData.quantitative[3] || 0) - 1) * 25}%`,
                        top: '-20px',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#f0f0f0',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      {evaluationData.quantitative[3] || '0'}
                    </span>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={evaluationData.quantitative[3] || '1'}
                      onChange={(e) => handleQuantitativeChange(3, e.target.value)}
                      style={{ width: '50%' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '10px' }}>
                    4. Teacher availability:
                  </label>
                  <div style={{ position: 'relative', display: 'inline-block', width: '50%' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: `${((evaluationData.quantitative[4] || 0) - 1) * 25}%`,
                        top: '-20px',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#f0f0f0',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      {evaluationData.quantitative[4] || '0'}
                    </span>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={evaluationData.quantitative[4] || '1'}
                      onChange={(e) => handleQuantitativeChange(4, e.target.value)}
                      style={{ width: '50%' }}
                    />
                  </div>
              </div>
              </div>
              
              <div style={{ marginTop: '20px' }}>
                <h3>your comments on the course</h3>
                <label>
                  your comments :
                  <textarea
                    value={evaluationData.qualitative}
                    onChange={handleQualitativeChange}
                    rows="5"
                    cols="50"
                  />
                </label>
              </div>

              <button type="submit" style={{ marginTop: '20px' }}>
                submit the evaluation
              </button>
            </form>
          ) : (
            <p>Thank you for your rating!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EvaluationPage;
