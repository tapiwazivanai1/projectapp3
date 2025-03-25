import { useState, useCallback } from "react";
import api from "../services/api";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T = any>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await apiCall();
      setState({ data, loading: false, error: null });
      return { data, error: null };
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
      return { data: null, error: error as Error };
    }
  }, []);

  return { ...state, execute };
}

// Custom hooks for specific API endpoints

// Auth hooks
export function useLogin() {
  const { loading, error, execute } = useApi();

  const login = useCallback(
    (email: string, password: string, role: string) => {
      return execute(() => api.auth.login(email, password, role));
    },
    [execute],
  );

  return { login, loading, error };
}

export function useRegister() {
  const { loading, error, execute } = useApi();

  const register = useCallback(
    (email: string, password: string, userName: string, role: string) => {
      return execute(() => api.auth.register(email, password, userName, role));
    },
    [execute],
  );

  return { register, loading, error };
}

// Projects hooks
export function useProjects() {
  const { data: projects, loading, error, execute } = useApi<any[]>();

  const fetchProjects = useCallback(() => {
    return execute(() => api.projects.getAll());
  }, [execute]);

  const createProject = useCallback(
    (projectData: any) => {
      return execute(() => api.projects.create(projectData));
    },
    [execute],
  );

  const updateProject = useCallback(
    (id: string, projectData: any) => {
      return execute(() => api.projects.update(id, projectData));
    },
    [execute],
  );

  const deleteProject = useCallback(
    (id: string) => {
      return execute(() => api.projects.delete(id));
    },
    [execute],
  );

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}

export function useProject(id?: string) {
  const { data: project, loading, error, execute } = useApi();

  const fetchProject = useCallback(() => {
    if (!id)
      return Promise.resolve({
        data: null,
        error: new Error("No project ID provided"),
      });
    return execute(() => api.projects.getById(id));
  }, [id, execute]);

  return { project, loading, error, fetchProject };
}

// Contributions hooks
export function useContributions() {
  const { data: contributions, loading, error, execute } = useApi<any[]>();

  const fetchUserContributions = useCallback(() => {
    return execute(() => api.contributions.getUserContributions());
  }, [execute]);

  const fetchProjectContributions = useCallback(
    (projectId: string) => {
      return execute(() =>
        api.contributions.getProjectContributions(projectId),
      );
    },
    [execute],
  );

  const createContribution = useCallback(
    (contributionData: any) => {
      return execute(() => api.contributions.create(contributionData));
    },
    [execute],
  );

  return {
    contributions,
    loading,
    error,
    fetchUserContributions,
    fetchProjectContributions,
    createContribution,
  };
}

// Magazine hooks
export function useMagazineSubmissions() {
  const { data: submissions, loading, error, execute } = useApi<any[]>();

  const fetchSubmissions = useCallback(() => {
    return execute(() => api.magazine.getSubmissions());
  }, [execute]);

  const createSubmission = useCallback(
    (formData: FormData) => {
      return execute(() => api.magazine.createSubmission(formData));
    },
    [execute],
  );

  const updateSubmissionStatus = useCallback(
    (id: string, statusData: any) => {
      return execute(() => api.magazine.updateSubmissionStatus(id, statusData));
    },
    [execute],
  );

  return {
    submissions,
    loading,
    error,
    fetchSubmissions,
    createSubmission,
    updateSubmissionStatus,
  };
}

// Branches hooks
export function useBranches() {
  const { data: branches, loading, error, execute } = useApi<any[]>();

  const fetchBranches = useCallback(() => {
    return execute(() => api.branches.getAll());
  }, [execute]);

  return { branches, loading, error, fetchBranches };
}

export function useBranchMembers(branchId?: string) {
  const { data: members, loading, error, execute } = useApi<any[]>();

  const fetchMembers = useCallback(() => {
    if (!branchId)
      return Promise.resolve({
        data: null,
        error: new Error("No branch ID provided"),
      });
    return execute(() => api.branches.getMembers(branchId));
  }, [branchId, execute]);

  return { members, loading, error, fetchMembers };
}

export function useBranchStats(branchId?: string) {
  const { data: stats, loading, error, execute } = useApi();

  const fetchStats = useCallback(() => {
    if (!branchId)
      return Promise.resolve({
        data: null,
        error: new Error("No branch ID provided"),
      });
    return execute(() => api.branches.getStats(branchId));
  }, [branchId, execute]);

  return { stats, loading, error, fetchStats };
}
