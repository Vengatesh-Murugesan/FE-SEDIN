import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import "./styles/add-project.css";
import { Link } from "react-router-dom";
import { createProject } from "../service/apiService";

function AddProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setIsButtonEnabled(event.target.value !== "" && description !== "");
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setIsButtonEnabled(name !== "" && event.target.value !== "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const projectData = {
      name: name,
      description: description,
    };

    const { success, error } = await createProject(projectData);

    if (success) {
      setShowModal(true);
      setName("");
      setDescription("");
      setIsButtonEnabled(false);
    } else {
      setError(error);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  const renderForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="projectName">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter project name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="projectDescription">
          <Form.Label className="form-label">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            className="textarea-control"
            placeholder="Enter project description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          className="submit-button"
          disabled={!isButtonEnabled}
        >
          Add Project
        </Button>
        <Link to="/" className="btn btn-secondary mt-3">
          Go Back
        </Link>
      </Form>
    );
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
        <Modal.Body>Project created successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="center-container">
      <div className="form-container add-project-form">
        {error && renderErrorBanner()}
        {renderForm()}
      </div>
      {renderSuccessModal()}
    </div>
  );
}

export default AddProject;
