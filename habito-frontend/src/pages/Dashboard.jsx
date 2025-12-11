// export default function Dashboard() {
//   return (
//     <div className="space-y-8">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold text-aquadark mb-2">
//           Welcome to Habito 
//         </h1>
//         <p className="text-lg text-gray-600">
//           Track your habits, achieve your goals, and earn badges!
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="bg-gradient-to-br from-aqua to-aquablue text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
//           <div className="flex items-center mb-4">
//             <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
//               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold">Habits</h3>
//           </div>
//           <p className="text-aqualight">Build and maintain healthy habits</p>
//         </div>

//         <div className="bg-gradient-to-br from-aquadark to-aqua text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
//           <div className="flex items-center mb-4">
//             <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
//               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold">Goals</h3>
//           </div>
//           <p className="text-aqualight">Set and achieve your objectives</p>
//         </div>

//         <div className="bg-gradient-to-br from-aquablue to-aquadark text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 md:col-span-2 lg:col-span-1">
//           <div className="flex items-center mb-4">
//             <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
//               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold">Badges</h3>
//           </div>
//           <p className="text-aqualight">Earn rewards for your progress</p>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-aquadark mb-4">Quick Stats</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div className="text-center">
//             <div className="text-3xl font-bold text-aqua">12</div>
//             <div className="text-gray-600">Active Habits</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-aquadark">5</div>
//             <div className="text-gray-600">Goals Achieved</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-aquablue">8</div>
//             <div className="text-gray-600">Badges Earned</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { motion } from "framer-motion";
import { TrendingUp, Target, Award, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/api"; // 💡 Updated import
import { FaTasks } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";


export default function Dashboard() {
 // const userId = 1; // replace with logged-in user id
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.user_id || 1; // fallback to 1 if no user

  const [stats, setStats] = useState({
    habits: 0,
    goals: 0,
    badges: 0,
  });

  useEffect(() => {
    loadStats();
  }, [userId]);

  const loadStats = async () => {
    try {
      const res = await getDashboardStats(userId);
      setStats(res);
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    }
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-aquadark mb-2 tracking-tight">
          Welcome to Habito
        </h1>
        <p className="text-lg text-gray-600">
          Track habits, reach goals, and earn rewards 🚀
        </p>
      </motion.div>

      {/* FEATURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-aqua to-aquablue text-white"
        >
          <div className="flex items-center mb-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold">Habits</h3>
          </div>
          <p className="text-aqualight">Build habits. Track consistency.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-aquadark to-aqua text-white"
        >
          <div className="flex items-center mb-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold">Goals</h3>
          </div>
          <p className="text-aqualight">Set and achieve your objectives.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-aquablue to-aquadark text-white"
        >
          <div className="flex items-center mb-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold">Badges</h3>
          </div>
          <p className="text-aqualight">Earn rewards for consistency.</p>
        </motion.div>
      </div>

      {/* QUICK STATS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-aquadark mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-aqua" />
          Quick Stats
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <motion.div whileHover={{ y: -4 }} className="text-center p-4 rounded-xl bg-aqualight">
            <div className="text-4xl font-bold text-aqua">{stats.habits}</div>
            <div className="text-gray-700">Active Habits</div>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="text-center p-4 rounded-xl bg-[#e3eefc]">
            <div className="text-4xl font-bold text-aquadark">{stats.goals}</div>
            <div className="text-gray-700">Goals Achieved</div>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="text-center p-4 rounded-xl bg-[#d5e6f8]">
            <div className="text-4xl font-bold text-aquablue">{stats.badges}</div>
            <div className="text-gray-700">Badges Earned</div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
