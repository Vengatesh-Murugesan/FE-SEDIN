export const API_BASE_URL = "https://sedin-backend.onrender.com/api/v1/";
export const PROJECTS_API = `${API_BASE_URL}projects`;
export const PROJECT_API = (projectId) =>
  `${API_BASE_URL}projects/${projectId}`;
export const ADD_TASK = `${API_BASE_URL}tasks`;

export const DELETE_TASK = (id) => `${API_BASE_URL}tasks/${id}`;
export const FETCH_PROJECT_TASK = (id) => `${API_BASE_URL}tasks/project/${id}`;
