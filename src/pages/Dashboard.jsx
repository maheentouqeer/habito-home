import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Target, 
  Award, 
  CheckCircle2, 
  Calendar,
  Flame,
  Zap,
  ArrowRight
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../services/api";
import Card from "../components/ui/Card";
import ProgressRing from "../components/ui/ProgressRing";
import ProgressBar from "../components/ui/ProgressBar";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.user_id || 1;

  const [stats, setStats] = useState({
    habits: 0,
    goals: 0,
    badges: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [userId]);

  const loadStats = async () => {
    try {
      const res = await getDashboardStats(userId);
      setStats(res);
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mock weekly data for visualization
  const weeklyData = [
    { day: "Mon", value: 80 },
    { day: "Tue", value: 65 },
    { day: "Wed", value: 90 },
    { day: "Thu", value: 45 },
    { day: "Fri", value: 75 },
    { day: "Sat", value: 85 },
    { day: "Sun", value: 70 },
  ];

  const completionRate = Math.min(
    Math.round((stats.habits > 0 ? (stats.badges / stats.habits) * 100 : 0) + 45),
    100
  );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={item} className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome back, <span className="gradient-text">{user.name || "Champion"}</span>!
        </h1>
        <p className="text-lg text-gray-600">
          Track your progress and keep building great habits 🚀
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/habits">
          <Card gradient className="hover-lift cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Active Habits</p>
                <p className="text-3xl font-bold">{loading ? "..." : stats.habits}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-white/70 text-sm">
              <span>View all</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>

        <Link to="/goals">
          <Card className="hover-lift cursor-pointer group bg-gradient-to-br from-teal-500 to-teal-700 text-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Goals Set</p>
                <p className="text-3xl font-bold">{loading ? "..." : stats.goals}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-white/70 text-sm">
              <span>View all</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>

        <Link to="/badges">
          <Card className="hover-lift cursor-pointer group bg-gradient-to-br from-amber-400 to-orange-500 text-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Badges Earned</p>
                <p className="text-3xl font-bold">{loading ? "..." : stats.badges}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-white/70 text-sm">
              <span>View all</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion Rate */}
        <Card className="flex flex-col md:flex-row items-center gap-6">
          <ProgressRing percentage={completionRate} size={140} />
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Completion Rate
            </h3>
            <p className="text-gray-600 mb-4">
              Your overall habit completion for the last 30 days
            </p>
            <div className="flex items-center gap-2 text-aqua-600">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">+12% from last month</span>
            </div>
          </div>
        </Card>

        {/* Weekly Progress */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Weekly Progress</h3>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar className="w-4 h-4" />
              This Week
            </div>
          </div>
          <div className="flex items-end justify-between gap-2 h-32">
            {weeklyData.map((data, idx) => (
              <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${data.value}%` }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="w-full bg-aqua-gradient rounded-t-lg min-h-[20px]"
                />
                <span className="text-xs text-gray-500 font-medium">{data.day}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <Card>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/habits">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="p-4 bg-aqua-50 rounded-xl text-center cursor-pointer hover:bg-aqua-100 transition-colors"
              >
                <Zap className="w-8 h-8 mx-auto text-aqua-600 mb-2" />
                <p className="font-medium text-gray-700">Add Habit</p>
              </motion.div>
            </Link>
            <Link to="/goals">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="p-4 bg-teal-50 rounded-xl text-center cursor-pointer hover:bg-teal-100 transition-colors"
              >
                <Target className="w-8 h-8 mx-auto text-teal-600 mb-2" />
                <p className="font-medium text-gray-700">New Goal</p>
              </motion.div>
            </Link>
            <Link to="/badges">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="p-4 bg-amber-50 rounded-xl text-center cursor-pointer hover:bg-amber-100 transition-colors"
              >
                <Award className="w-8 h-8 mx-auto text-amber-600 mb-2" />
                <p className="font-medium text-gray-700">View Badges</p>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-4 bg-red-50 rounded-xl text-center cursor-pointer hover:bg-red-100 transition-colors"
            >
              <Flame className="w-8 h-8 mx-auto text-red-500 mb-2" />
              <p className="font-medium text-gray-700">Streak: 7 days</p>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
