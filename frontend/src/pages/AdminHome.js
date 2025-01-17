import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import Header from "../pages/header";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import pour la traduction
import "../styles/admin.css";

const AdminHome = () => {
  const { t } = useTranslation(); // Hook pour les traductions
  const [modules, setModules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredModules, setFilteredModules] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch("https://advancedprog-anut.onrender.com/api/v1/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch modules");
        }
        const data = await response.json();
        setModules(data.courses);
        setFilteredModules(data.courses);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, []);

  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = modules.filter(
      (module) =>
        module.course_name.toLowerCase().includes(term) ||
        module.course_id.toLowerCase().includes(term)
    );
    setFilteredModules(filtered);
  };

  const handleCreateEvaluation = (course) => {
    navigate(`/admin/create-evaluation/${course.course_id}`);
  };

  if (isLoading) {
    return <p>{t("loading")}</p>;
  }

  if (error) {
    return <p>{t("error")}: {error}</p>;
  }

  const beingEvaluatedModules = filteredModules.filter(
    (module) => module.is_being_evaluated
  );
  const notEvaluatedModules = filteredModules.filter(
    (module) => !module.is_being_evaluated
  );

  return (
    <div className="admin-home-container">
      <Header />
      <main className="admin-content">
        <Box className="search-bar">
          <Typography variant="h4" gutterBottom>
            {t("modules.title")}
          </Typography>
          <TextField
            variant="outlined"
            placeholder={t("modules.searchPlaceholder")}
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </Box>

        {/* Modules being evaluated */}
        <Box className="module-section">
          <Typography variant="h5" gutterBottom>
            {t("modules.evaluated")}
          </Typography>
          <Box className="module-list">
            {beingEvaluatedModules.length > 0 ? (
              beingEvaluatedModules.map((module) => (
                <Card className="module-card" key={module._id}>
                  <CardContent>
                    <Typography variant="h6" className="module-title">
                      {module.course_name}
                    </Typography>
                    <Typography variant="subtitle1" className="module-code">
                      {t("modules.code")}: {module.course_id}
                    </Typography>
                    <Typography variant="body2" className="module-dates">
                      {t("modules.startDate")}: {module.start_date.split("T")[0]}
                    </Typography>
                    <Typography variant="body2" className="module-dates">
                      {t("modules.endDate")}: {module.end_date.split("T")[0]}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      className="view-results-button"
                      onClick={() => navigate(`/admin/results/${module.course_id}`)}
                    >
                      {t("modules.viewResults")}
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" className="no-modules">
                {t("modules.noEvaluated")}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Modules not yet evaluated */}
        <Box className="module-section">
          <Typography variant="h5" gutterBottom>
            {t("modules.notEvaluated")}
          </Typography>
          <Box className="module-list">
            {notEvaluatedModules.length > 0 ? (
              notEvaluatedModules.map((module) => (
                <Card className="module-card" key={module._id}>
                  <CardContent>
                    <Typography variant="h6" className="module-title">
                      {module.course_name}
                    </Typography>
                    <Typography variant="subtitle1" className="module-code">
                      {t("modules.code")}: {module.course_id}
                    </Typography>
                    <Typography variant="body2" className="module-dates">
                      {t("modules.startDate")}: {module.start_date.split("T")[0]}
                    </Typography>
                    <Typography variant="body2" className="module-dates">
                      {t("modules.endDate")}: {module.end_date.split("T")[0]}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      className="create-evaluation-button"
                      onClick={() => handleCreateEvaluation(module)}
                    >
                      {t("modules.createEvaluation")}
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" className="no-modules">
                {t("modules.noToEvaluate")}
              </Typography>
            )}
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default AdminHome;
