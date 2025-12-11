// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Habits from "./pages/Habits";
// import Goals from "./pages/Goals";
// import Badges from "./pages/Badges";
// import Users from "./pages/Users";

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/habits" element={<Habits />} />
//             <Route path="/goals" element={<Goals />} />
//             <Route path="/badges" element={<Badges />} />
//             <Route path="/users" element={<Users />} />
//           </Routes>
//         </main>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import Goals from "./pages/Goals";
import Badges from "./pages/Badges";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
  {/* redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
            {/* Protected */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/habits"
              element={
                <PrivateRoute>
                  <Habits />
                </PrivateRoute>
              }
            />
            <Route
              path="/goals"
              element={
                <PrivateRoute>
                  <Goals />
                </PrivateRoute>
              }
            />
            <Route
              path="/badges"
              element={
                <PrivateRoute>
                  <Badges />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;