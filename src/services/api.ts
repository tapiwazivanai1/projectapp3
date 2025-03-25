import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl || "", supabaseKey || "");

// API base URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

// Get auth token from local storage
const getToken = () => {
  const user = localStorage.getItem("auth_user");
  if (user) {
    try {
      const parsed = JSON.parse(user);
      return parsed.token;
    } catch (error) {
      console.error("Failed to parse auth user:", error);
      return null;
    }
  }
  return null;
};

// API service object
const api = {
  // Auth endpoints
  auth: {
    login: async (email: string, password: string, role: string) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });
      return handleResponse(response);
    },
    register: async (
      email: string,
      password: string,
      userName: string,
      role: string,
    ) => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userName, role }),
      });
      return handleResponse(response);
    },
    getProfile: async () => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
  },

  // Projects endpoints
  projects: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/projects`);
      return handleResponse(response);
    },
    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/projects/${id}`);
      return handleResponse(response);
    },
    create: async (projectData: any) => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });
      return handleResponse(response);
    },
    update: async (id: string, projectData: any) => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });
      return handleResponse(response);
    },
    delete: async (id: string) => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
  },

  // Contributions endpoints
  contributions: {
    getUserContributions: async () => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/contributions/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    getProjectContributions: async (projectId: string) => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(
        `${API_URL}/contributions/project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return handleResponse(response);
    },
    create: async (contributionData: any) => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/contributions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contributionData),
      });
      return handleResponse(response);
    },
  },

  // Magazine endpoints
  magazine: {
    getSubmissions: async () => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/magazine/submissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    getSubmissionById: async (id: string) => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/magazine/submissions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    createSubmission: async (formData: FormData) => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/magazine/submissions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      return handleResponse(response);
    },
    updateSubmissionStatus: async (id: string, statusData: any) => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(
        `${API_URL}/magazine/submissions/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(statusData),
        },
      );
      return handleResponse(response);
    },
    getSections: async () => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/magazine/sections`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
  },

  // Branches endpoints
  branches: {
    getAll: async () => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/branches`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    getById: async (id: string) => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/branches/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    getMembers: async (id: string) => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/branches/${id}/members`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    getStats: async (id: string) => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/branches/${id}/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
  },
};

export default api;
