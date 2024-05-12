import {
  ADD_TASK,
  DELETE_TASK,
  FETCH_PROJECT_TASK,
  PROJECTS_API,
  PROJECT_API,
} from "../const/apiPathConst";

const createProject = async (projectData) => {
  try {
    const response = await fetch(PROJECTS_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (response.ok) {
      return { success: true, data: await response.json() };
    } else {
      return { success: false, error: "Failed to create project" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Error creating project" };
  }
};

const getProjects = async () => {
  try {
    const response = await fetch(PROJECTS_API);
    if (response.ok) {
      return { success: true, data: await response.json() };
    } else {
      return { success: false, error: "Failed to fetch projects" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Error fetching projects" };
  }
};

const getProjectDetails = async (projectId) => {
  try {
    const response = await fetch(PROJECT_API(projectId));
    if (response.ok) {
      return { success: true, data: await response.json() };
    } else {
      return { success: false, error: "Failed to fetch project details" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Error fetching project details" };
  }
};

const getProjectTasks = async (projectId) => {
  try {
    const response = await fetch(FETCH_PROJECT_TASK(projectId));
    if (response.ok) {
      return { success: true, data: await response.json() };
    } else {
      return { success: false, error: "Failed to fetch tasks" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Error fetching tasks" };
  }
};

const deleteTask = async (taskId) => {
  try {
    const response = await fetch(DELETE_TASK(taskId), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: "Failed to delete task" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Error deleting task" };
  }
};

const getTaskDetails = async (taskId) => {
  try {
    const response = await fetch(`${ADD_TASK}/${taskId}`);
    if (response.ok) {
      return { success: true, data: await response.json() };
    } else {
      return { success: false, error: "Failed to fetch task details" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Error fetching task details" };
  }
};

const createOrUpdateTask = async (taskData, taskId = null) => {
  try {
    let response;
    if (taskId) {
      response = await fetch(`${ADD_TASK}/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
    } else {
      response = await fetch(ADD_TASK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
    }

    if (response.ok) {
      return { success: true };
    } else {
      return {
        success: false,
        error: taskId ? "Failed to update task" : "Failed to create task",
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Error creating or updating task" };
  }
};

export {
  createProject,
  getProjects,
  getProjectDetails,
  getProjectTasks,
  deleteTask,
  getTaskDetails,
  createOrUpdateTask,
};
