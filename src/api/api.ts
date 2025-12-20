import {
  ApiResponse,
  Course,
  Language,
  Resource,
  UserProfile,
  UserRole,
} from "@/types/types";

const BASE_URL = "/api";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: UserProfile;
  token: string;
}

export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorMessage = `Error: ${response.statusText || response.status} (${
      response.url
    })`;
    try {
      const errorData = await response.json();
      errorMessage =
        errorData.error?.message || errorData.message || errorMessage;
    } catch (parseError) {
      console.warn("Failed to parse error JSON", parseError);
    }
    throw new Error(errorMessage);
  }

  const data = (await response.json()) as ApiResponse<T>;
  if (!data.success) {
    throw new Error(data.error?.message || "Operation failed");
  }

  if (!data.data) {
    throw new Error("Response data is undefined");
  }
  return data.data;
};

export const authApi = {
  setAuthToken: (token: string) => {
    localStorage.setItem("auth_token", token);
  },
  getAuthToken: () => {
    return localStorage.getItem("auth_token");
  },
  clearAuthToken: () => {
    localStorage.removeItem("auth_token");
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const authResponse = await handleResponse<AuthResponse>(response);
    authApi.setAuthToken(authResponse.token);
    return authResponse;
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
  }): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const authResponse = await handleResponse<AuthResponse>(response);
    authApi.setAuthToken(authResponse.token);
    return authResponse;
  },

  logout: async (): Promise<void> => {
    authApi.clearAuthToken();
  },

  checkAuth: async (): Promise<UserProfile> => {
    const token = authApi.getAuthToken();
    if (!token) {
      throw new Error("No authentication token");
    }
    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await handleResponse<{ user: UserProfile }>(response);
    return data.user; // Extract the user object from the response
  },

  updateProfile: async (profileData: {
    speciality_id?: string;
    organization_id?: string;
    cv_url?: string;
    objectives?: string;
    learning_style?: "visual" | "auditory" | "reading" | "kinesthetic";
    interests?: string[];
    performance_level?: "beginner" | "intermediate" | "advanced" | "expert";
    preferredLanguage?: Language;
    avatar?: string;
  }): Promise<UserProfile> => {
    const token = authApi.getAuthToken();
    if (!token) {
      throw new Error("No authentication token");
    }
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    const data = await handleResponse<{ user: UserProfile }>(response);
    return data.user;
  },
};

export const courseApi = {
  createCourse: async (courseData: {
    title: string;
    description?: string;
  }): Promise<Course> => {
    const token = authApi.getAuthToken();
    if (!token) {
      throw new Error("No authentication token");
    }
    const response = await fetch(`${BASE_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    });
    const data = await handleResponse<{ course: Course }>(response);
    return data.course;
  },

  getMyCourses: async (): Promise<Course[]> => {
    const token = authApi.getAuthToken();
    if (!token) {
      throw new Error("No authentication token");
    }
    const response = await fetch(`${BASE_URL}/courses/my-courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await handleResponse<{ courses: Course[] }>(response);
    return data.courses;
  },
};


export const resourceApi = {
  uploadResource: async (formData: FormData): Promise<Resource> => {
    const token = authApi.getAuthToken();
    if (!token) {
      throw new Error("No authentication token");
    }
    const response = await fetch(`${BASE_URL}/resources`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await handleResponse<{ resource: Resource }>(response);
    return data.resource;
  },

  getResources: async (): Promise<Resource[]> => {
    const token = authApi.getAuthToken();
    if (!token) {
      throw new Error("No authentication token");
    }
    const response = await fetch(`${BASE_URL}/resources`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await handleResponse<{ resources: Resource[] }>(response);
    return data.resources;
  },

  downloadResource: async (resourceId: string): Promise<void> => {
    const token = authApi.getAuthToken();
    if (!token) {
      throw new Error("No authentication token");
    }
    const response = await fetch(
      `${BASE_URL}/resources/${resourceId}/download`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to download resource");
    }
    const blob = await response.blob();
    const contentDisposition = response.headers.get("Content-Disposition");
    const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);
    const fileName = fileNameMatch ? fileNameMatch[1] : "downloaded_file";
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  },

  shareResource: async (
    resourceId: string,
    email: string
  ): Promise<Resource> => {
    const token = authApi.getAuthToken();
    if (!token) {
      throw new Error("No authentication token");
    }
    const response = await fetch(`${BASE_URL}/resources/share`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ resourceId, email }),
    });
    const data = await handleResponse<{ resource: Resource }>(response);
    return data.resource;
  },
};

// AI API
const AI_BASE_URL = "https://unuseable-subnatural-janel.ngrok-free.dev";

export interface ExamRequest {
  subject: string;
  num_questions: number;
  user_input: string; // Required field
  examples_exams?: string[];
}

export interface ExamResponse {
  exam: string;
  corrections: string;
}

export interface ExerciseRequest {
  subject: string;
  num_exercises?: number; // Optional, defaults to 5
  user_input: string; // Required field
  examples_exercises?: string[] | null;
}

export interface ExerciseResponse {
  exercises: string;
  solutions: string;
}

export interface QuizOption {
  choice: string; // "a", "b", "c"
  value: string;
  is_correct: boolean;
}

export interface SingleQuiz {
  question: string;
  options: QuizOption[]; // exactly 3 options
}

export interface QuizRequest {
  subject: string;
  num_questions: number;
  user_input: string; // Required field
  examples_exercises?: string[];
}

export interface QuizResponse {
  quizzes: SingleQuiz[];
}

export interface WeeklyScheduleRequest {
  user_input: string; // Required field based on WeeklyInput schema
}

export interface UserRapportRequest {
  user_id: string;
  courses?: string[];
  performance_data?: any;
}

export interface RecommendationItem {
  title: string;
  description: string;
  content_type: string;
  url?: string;
  metadata?: any;
}

export const aiApi = {
  generateExam: async (request: ExamRequest): Promise<ExamResponse> => {
    const response = await fetch(`${AI_BASE_URL}/ai/generate/exam`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Failed to generate exam" }));
      throw new Error(error.detail || "Failed to generate exam");
    }

    return await response.json();
  },

  generateExercise: async (request: ExerciseRequest): Promise<ExerciseResponse> => {
    const response = await fetch(`${AI_BASE_URL}/ai/generate/exercise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Failed to generate exercise" }));
      throw new Error(error.detail || "Failed to generate exercise");
    }

    return await response.json();
  },

  generateQuiz: async (request: QuizRequest): Promise<QuizResponse> => {
    const response = await fetch(`${AI_BASE_URL}/ai/generate/quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Failed to generate quiz" }));
      throw new Error(error.detail || "Failed to generate quiz");
    }

    return await response.json();
  },

  generateWeeklySchedule: async (request: WeeklyScheduleRequest): Promise<any> => {
    const response = await fetch(`${AI_BASE_URL}/ai/generate_weekly_schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Failed to generate schedule" }));
      throw new Error(error.detail || "Failed to generate schedule");
    }

    return await response.json();
  },

  generateUserRapport: async (request: UserRapportRequest): Promise<any> => {
    const response = await fetch(`${AI_BASE_URL}/ai/generate_user_rapport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Failed to generate rapport" }));
      throw new Error(error.detail || "Failed to generate rapport");
    }

    return await response.json();
  },

  getRecommendations: async (
    query: string,
    contentType?: string,
    limit: number = 5
  ): Promise<RecommendationItem[]> => {
    const params = new URLSearchParams({
      query,
      limit: limit.toString(),
    });
    
    if (contentType) {
      params.append("content_type", contentType);
    }

    const response = await fetch(`${AI_BASE_URL}/recomonde/recommend?${params.toString()}`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Failed to get recommendations" }));
      throw new Error(error.detail || "Failed to get recommendations");
    }

    return await response.json();
  },

  addRecommendationItem: async (item: RecommendationItem): Promise<any> => {
    const response = await fetch(`${AI_BASE_URL}/recomonde/add-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Failed to add item" }));
      throw new Error(error.detail || "Failed to add item");
    }

    return await response.json();
  },
};