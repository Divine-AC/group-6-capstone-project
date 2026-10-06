import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Jobs from "../pages/candidate/Jobs";
import JobDetails from "../pages/candidate/JobDetails";
import ApplyJob from "../pages/candidate/ApplyJob";
import MyApplications from "../pages/candidate/MyApplications";
import ApplicationDetails from "../pages/candidate/ApplicationDetails";
import Dashboard from "../pages/candidate/Dashboard";
import Profile from "../pages/candidate/Profile";
import EmployerDashboard from "../pages/employer/Dashboard";
import PostJob from "../pages/employer/PostJob";
import MyJobs from "../pages/employer/MyJobs";
import EditJob from "../pages/employer/EditJob";
import JobApplications from "../pages/employer/JobApplications";
import EmployerProfile from "../pages/employer/Profile";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminJobs from "../pages/admin/Jobs";
import AdminApplications from "../pages/admin/Applications";
import AdminReports from "../pages/admin/Reports";

function AppRoutes() {
  return (
    <BrowserRouter>
     <Routes>
  {/* Public routes */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  {/* Candidate routes */}
  <Route
    element={<ProtectedRoute allowedRoles={["candidate"]} />}
  >
    <Route
      path="/candidate/dashboard"
      element={<Dashboard />}
    />
    <Route path="/jobs" element={<Jobs />} />
    <Route path="/jobs/:id" element={<JobDetails />} />
    <Route
      path="/jobs/:id/apply"
      element={<ApplyJob />}
    />
    <Route
      path="/applications"
      element={<MyApplications />}
    />
    <Route
      path="/applications/:id"
      element={<ApplicationDetails />}
    />
    <Route path="/profile" element={<Profile />} />
  </Route>

  {/* Employer routes */}
  {/* Employer routes */}

<Route
  element={<ProtectedRoute allowedRoles={["employer"]} />}
>
    <Route
      path="/employer/dashboard"
      element={<EmployerDashboard />}
    />
    <Route
      path="/employer/jobs"
      element={<MyJobs />}
    />
    <Route
      path="/employer/jobs/new"
      element={<PostJob />}
    />
    <Route
      path="/employer/jobs/:id/edit"
      element={<EditJob />}
    />
    <Route
      path="/employer/jobs/:id/applications"
      element={<JobApplications />}
    />
    <Route
      path="/employer/profile"
      element={<EmployerProfile />}
    />
  </Route>

  {/* Admin routes */}
 {/* Admin routes */}
<Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
  <Route path="/admin/users" element={<AdminUsers />} />
  <Route path="/admin/jobs" element={<AdminJobs />} />
  <Route
    path="/admin/applications"
    element={<AdminApplications />}
  />
  <Route path="/admin/reports" element={<AdminReports />} />
</Route>
</Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

