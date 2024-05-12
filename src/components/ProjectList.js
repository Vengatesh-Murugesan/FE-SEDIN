import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Card } from "react-bootstrap";
import "./styles/project-list.css";
import { getProjects } from "../service/apiService";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const { success, data, error } = await getProjects();
      if (success) {
        setProjects(data);
      } else {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handleCloseError = () => {
    setError(null);
  };

  const renderErrorBanner = () => {
    return (
      <Alert variant="danger" dismissible onClose={handleCloseError}>
        {error}
      </Alert>
    );
  };

  const renderAddProjectButton = (params) => {
    return (
      <Link to="/projects/add">
        <Button variant="light">Add New Project</Button>
      </Link>
    );
  };

  const renderProjectCard = () => {
    return projects.map((project) => (
      <Card className="mt-3" key={project._id}>
        <Card.Body>
          <Card.Title>{project?.name}</Card.Title>
          <Card.Text>{project?.description}</Card.Text>
          <Link to={`/projects/${project._id}`}>
            <Button variant="primary">View Project</Button>
          </Link>
        </Card.Body>
      </Card>
    ));
  };

  return (
    <div className="project-list-container">
      {error && renderErrorBanner()}
      <h1 className="project-list-title">Projects</h1>
      {renderAddProjectButton()}

      {projects?.length === 0 ? (
        <Card className="mt-3">
          <Card.Body>No Project Found</Card.Body>
        </Card>
      ) : (
        <div className="card-container">{renderProjectCard()}</div>
      )}
    </div>
  );
}

export default ProjectList;
