import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

const AdminModulesPage = () => {
  const navigate = useNavigate();

  // Example modules list
  const modules = [
    { name: 'Mathematics - L2', code: 'ST299ZE' },
    { name: 'Mathematics - L3', code: 'ST299ZF' },
    { name: 'Mathematics - M1 - SE2', code: 'ST299ZF' },
    { name: 'Java programming - M2 - SE2', code: 'ST299ZEG' },
  ];

  // Navigate to the module details page
  const handleNavigate = (module) => {
    navigate(`/module/${module.code}`, {
      state: { name: module.name, code: module.code }, 
    });
  };

  return (
    <div className="modules-container">
      <div className="modules-content">
        <h2>Modules</h2>
        <div className="search-bar">
          <input type="text" placeholder="Search for modules" />
          <button>🔍</button>
        </div>
        <div className="modules-list">
          {modules.map((module, index) => (
            <button
              key={index}
              className="module-button"
              onClick={() => handleNavigate(module)}
            >
              {module.name} - {module.code}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminModulesPage;
