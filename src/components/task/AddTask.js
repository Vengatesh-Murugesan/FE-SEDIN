import React, { useState, useEffect } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import "./styles/add-task.css";
import { Link, useParams } from "react-router-dom";
import { createOrUpdateTask, getTaskDetails } from "../../service/apiService";

function AddTask() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Started");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null);
  const { projectId, taskId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (taskId) {
        setIsEditMode(true);
        setIsButtonEnabled(true);
        const taskResponse = await getTaskDetails(taskId);
        if (taskResponse.success) {
          const { name, description, status } = taskResponse.data;
          setName(name);
          setDescription(description);
          setStatus(status);
        } else {
          console.error(taskResponse.error);
        }
      }
    };
    fetchData();
  }, [taskId]);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setIsButtonEnabled(event.target.value !== "" && description !== "");
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setIsButtonEnabled(name !== "" && event.target.value !== "");
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const taskData = {
      name: name,
      description: description,
      status: status,
      project: projectId,
    };

    try {
      const response = await createOrUpdateTask(taskData, taskId);
      if (response.success) {
        setShowModal(true);
        if (!isEditMode) {
          setName("");
          setDescription("");
          setStatus("Started");
          setIsButtonEnabled(false);
        }
      } else {
        setError(error);
      }
    } catch (error) {
      setError(error);
    }
  };

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

  const renderSuccessModal = () => {
    return (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEditMode
            ? "Task updated successfully!"
            : "Task created successfully!"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="taskName">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="taskDescription">
          <Form.Label className="form-label">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            className="textarea-control"
            placeholder="Enter task description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="taskStatus">
          <Form.Label className="form-label">Status</Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={handleStatusChange}
            required
          >
            <option value="Started">Started</option>
            <option value="Completed">Completed</option>
          </Form.Control>
        </Form.Group>

        <Button
          type="submit"
          className="submit-button"
          disabled={!isButtonEnabled}
        >
          {isEditMode ? "Update Task" : "Add Task"}
        </Button>
        <Link to={`/projects/${projectId}`} className="btn btn-secondary mt-3">
          Go Back
        </Link>
      </Form>
    );
  };

  return (
    <div className="center-container">
      <div className="form-container add-task-container">
        {error && renderErrorBanner()}
        {renderForm()}
      </div>
      {renderSuccessModal()}
    </div>
  );
}

export default AddTask;
