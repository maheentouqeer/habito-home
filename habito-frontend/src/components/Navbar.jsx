// import { Link } from "react-router-dom";
// import { useState } from "react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-aqua shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="text-white text-2xl font-bold tracking-wide hover:text-aquablue transition duration-300">
//               Habito App
//             </Link>
//           </div>
//           <div className="hidden md:flex items-center space-x-8">
//             <Link to="/" className="text-white hover:text-aquablue transition duration-300 font-medium">Dashboard</Link>
//             <Link to="/habits" className="text-white hover:text-aquablue transition duration-300 font-medium">Habits</Link>
//             <Link to="/goals" className="text-white hover:text-aquablue transition duration-300 font-medium">Goals</Link>
//             <Link to="/badges" className="text-white hover:text-aquablue transition duration-300 font-medium">Badges</Link>
//             <Link to="/users" className="text-white hover:text-aquablue transition duration-300 font-medium">Users</Link>
//           </div>
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-white hover:text-aquablue focus:outline-none focus:text-aquablue"
//             >
//               <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
//                 {isOpen ? (
//                   <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
//                 ) : (
//                   <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"/>
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//       {isOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-aquadark">
//             <Link to="/" className="text-white hover:text-aquablue block px-3 py-2 rounded-md text-base font-medium transition duration-300" onClick={() => setIsOpen(false)}>Dashboard</Link>
//             <Link to="/habits" className="text-white hover:text-aquablue block px-3 py-2 rounded-md text-base font-medium transition duration-300" onClick={() => setIsOpen(false)}>Habits</Link>
//             <Link to="/goals" className="text-white hover:text-aquablue block px-3 py-2 rounded-md text-base font-medium transition duration-300" onClick={() => setIsOpen(false)}>Goals</Link>
//             <Link to="/badges" className="text-white hover:text-aquablue block px-3 py-2 rounded-md text-base font-medium transition duration-300" onClick={() => setIsOpen(false)}>Badges</Link>
//             <Link to="/users" className="text-white hover:text-aquablue block px-3 py-2 rounded-md text-base font-medium transition duration-300" onClick={() => setIsOpen(false)}>Users</Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
// ...existing code...
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "null");
      return u?.name || "";
    } catch {
      return "";
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const onStorage = () => {
      setToken(localStorage.getItem("token"));
      try {
        const u = JSON.parse(localStorage.getItem("user") || "null");
        setUserName(u?.name || "");
      } catch {
        setUserName("");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUserName("");
    navigate("/login");
  };

  return (
    <nav className="bg-aqua shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold tracking-wide hover:text-aquablue transition duration-300">
              Habito App
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-aquablue transition duration-300 font-medium">Dashboard</Link>
            <Link to="/habits" className="text-white hover:text-aquablue transition duration-300 font-medium">Habits</Link>
            <Link to="/goals" className="text-white hover:text-aquablue transition duration-300 font-medium">Goals</Link>
            <Link to="/badges" className="text-white hover:text-aquablue transition duration-300 font-medium">Badges</Link>
            <Link to="/users" className="text-white hover:text-aquablue transition duration-300 font-medium">Users</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <>
                <span className="text-white mr-2">Hi{userName ? `, ${userName}` : ""}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-aquadark px-3 py-1 rounded-md font-medium hover:opacity-90 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-aquablue transition duration-300 font-medium">Login</Link>
                <Link to="/signup" className="bg-white text-aquadark px-3 py-1 rounded-md font-medium hover:opacity-90 transition">Signup</Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-aquablue focus:outline-none focus:text-aquablue"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"/>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-aquadark">
            <Link to="/dashboard" className="text-white hover:text-aquablue block px-3 py-2 rounded-md text-base font-medium transition duration-300" onClick={() => setIsOpen(false)}>Dashboard</Link>
            <Link to="/habits" className="text-white hover:text-aquablue block px-3 py-2 rounded-md text-base font-medium transition duration-300" onClick={() => setIsOpen(false)}>Habits</Link>
            <Link to="/goals" className="text-white hover:text-aquablue block px-3 py-2 rounded-md text-base font-medium transition duration-300" onClick={() => setIsOpen(false)}>Goals</Link>
            <Link to="/badges" className="text-white hover:text-aquablue block px-3 py-2 rounded-md text-base font-medium transition duration-300" onClick={() => setIsOpen(false)}>Badges</Link>
            <Link to="/users" className="text-white hover:text-aquablue block px-3 py-2 rounded-md text-base font-medium transition duration-300" onClick={() => setIsOpen(false)}>Users</Link>

            <div className="mt-2 border-t border-white/20 pt-2">
              {token ? (
                <button onClick={() => { setIsOpen(false); handleLogout(); }} className="w-full text-left text-white px-3 py-2 rounded-md">Logout</button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block text-white px-3 py-2 rounded-md">Login</Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="block bg-white text-aquadark px-3 py-2 rounded-md mt-1">Signup</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
