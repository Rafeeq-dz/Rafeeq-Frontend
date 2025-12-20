import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/auth-context";
import { Layout } from "@/layout.tsx";
import { DashboardLayout } from "@/components/layout/dashboard-layout.tsx";
import { ClassroomsPage } from "@/pages/dashboard/my-learning/classrooms/classrooms";
import { StudyGroupsPage } from "@/pages/dashboard/my-learning/study-groups/index.tsx";
import { ResourcesPage } from "@/pages/dashboard/my-learning/resources/resources";
import { WorkspacePage } from "@/pages/dashboard/my-learning/workspace/workspace";
import { AIToolsPage } from "@/pages/dashboard/ai-hub/ai-tools/index.tsx";
import { LoginPage } from "@/pages/auth/login.tsx";
import { RegisterPage } from "@/pages/auth/register.tsx";
import { JSX, lazy, Suspense } from "react";
import { LandingPage } from "./pages/landing/landing";
import { DashboardPage } from "./pages/dashboard/overview/index";
import { CalendarPage } from "./pages/dashboard/calendar/index";
import { AIHubPage } from "./pages/dashboard/ai-hub/index";
import { OpportunitiesPage } from "./pages/dashboard/ai-hub/opportunities/index";
import { DiscordSyncPage } from "./pages/dashboard/ai-hub/discord-sync/index";
import { MyLearningPage } from "./pages/dashboard/my-learning/index";
import { CoursesPage } from "./pages/dashboard/my-learning/courses/index";
import { WhiteboardPage } from "./pages/dashboard/my-learning/whiteboard/index";
import { SettingsPage } from "./pages/dashboard/settings/index";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const ClassroomPage = lazy(
  () => import("@/pages/dashboard/my-learning/classrooms/[id].tsx")
);
const StudyGroupPage = lazy(
  () => import("@/pages/dashboard/my-learning/study-groups/[id].tsx")
);

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
      </Route>

      <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="overview" element={<DashboardPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        
        {/* AI Hub Routes */}
        <Route path="ai-hub" element={<AIHubPage />} />
        <Route path="ai-hub/ai-tools" element={<AIToolsPage />} />
        <Route path="ai-hub/opportunities" element={<OpportunitiesPage />} />
        <Route path="ai-hub/discord-sync" element={<DiscordSyncPage />} />
        
        {/* My Learning Routes */}
        <Route path="my-learning" element={<MyLearningPage />} />
        <Route path="my-learning/courses" element={<CoursesPage />} />
        <Route path="my-learning/classrooms" element={<ClassroomsPage />} />
        <Route
          path="my-learning/classrooms/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ClassroomPage />
            </Suspense>
          }
        />
        <Route path="my-learning/study-groups" element={<StudyGroupsPage />} />
        <Route
          path="my-learning/study-groups/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <StudyGroupPage />
            </Suspense>
          }
        />
        <Route path="my-learning/resources" element={<ResourcesPage />} />
        <Route path="my-learning/workspace" element={<WorkspacePage />} />
        <Route path="my-learning/whiteboard" element={<WhiteboardPage />} />
        
        {/* Settings */}
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
);

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="Rafeeq-theme">
      <AuthProvider>
        <Toaster position="top-center" richColors />
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}
