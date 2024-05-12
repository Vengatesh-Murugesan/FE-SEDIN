import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert, Card } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./styles/ProjectDetails.css";
import {
  deleteTask,
  getProjectDetails,
  getProjectTasks,
} from "../service/apiService";

function ProjectDetails() {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const projectResponse = await getProjectDetails(projectId);
      if (projectResponse.success) {
        setProject(projectResponse.data);
      } else {
        setError(projectResponse.error);
      }

      const tasksResponse = await getProjectTasks(projectId);
      if (tasksResponse.success) {
        setTasks(tasksResponse.data);
      } else {
        setError(tasksResponse.error);
      }
      setLoading(false);
    };
    fetchData();
  }, [projectId]);

  const handleDeleteTask = async (taskId) => {
    try {
      setLoading(true);
      const deleteResponse = await deleteTask(taskId);
      if (deleteResponse.success) {
        const tasksResponse = await getProjectTasks(projectId);
        if (tasksResponse.success) {
          setTasks(tasksResponse.data);
        } else {
          setError(tasksResponse.error);
        }
      } else {
        setError(deleteResponse.error);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  if (loading || !project) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
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

  const renderProjectCard = (params) => {
    return (
      <Card className="project-card">
        <Card.Body>
          <Card.Title>{project.name}</Card.Title>
          <Card.Text>{project.description}</Card.Text>
        </Card.Body>
      </Card>
    );
  };

  const renderButtons = (params) => {
    return (
      <>
        <Link to="/" className="btn btn-secondary mt-3">
          Go Back
        </Link>
        <Link
          to={`/projects/${projectId}/tasks/add`}
          className="btn btn-success mt-3 ms-3"
        >
          Add Task
        </Link>
      </>
    );
  };

  const renderTaskCards = () => {
    return (
      <div className="task-cards-container">
        {tasks?.length === 0 ? (
          <p>No tasks found for this project.</p>
        ) : (
          tasks?.map((task) => (
            <Card
              key={task._id}
              className={`task-card ${task.status.toLowerCase()}`}
            >
              <Card.Body>
                <Card.Title>{task.name}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <p>Status: {task.status}</p>
                <div className="task-icons">
                  <Link
                    to={`/projects/${projectId}/edit-task/${task._id}`}
                    className="edit-task-link"
                  >
                    <FaEdit />
                  </Link>
                  <span
                    className="delete-icon"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    <FaTrash />
                  </span>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    );
  };

  return (
    <div className="project-details-container">
      <div className="project-details-content">
        {error && renderErrorBanner()}
        <h1 className="project-details-title">Project Details</h1>
        {renderProjectCard()}
        {renderButtons()}
        <h2 className="tasks-title">Tasks</h2>
        {renderTaskCards()}
      </div>
    </div>
  );
}

export default ProjectDetails;
