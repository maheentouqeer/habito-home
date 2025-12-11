import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Award, 
  Star, 
  Trophy, 
  Zap, 
  Flame, 
  Target,
  Medal,
  Crown
} from "lucide-react";
import { getBadges } from "../services/api";
import Card from "../components/ui/Card";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Badge icons mapping
const badgeIcons = [
  { icon: Star, gradient: "from-yellow-400 to-amber-500" },
  { icon: Trophy, gradient: "from-amber-400 to-orange-500" },
  { icon: Zap, gradient: "from-blue-400 to-indigo-500" },
  { icon: Flame, gradient: "from-red-400 to-rose-500" },
  { icon: Target, gradient: "from-aqua-400 to-teal-500" },
  { icon: Medal, gradient: "from-purple-400 to-violet-500" },
  { icon: Crown, gradient: "from-amber-300 to-yellow-500" },
  { icon: Award, gradient: "from-green-400 to-emerald-500" },
];

export default function Badges() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBadges();
  }, []);

  const loadBadges = async () => {
    try {
      const res = await getBadges();
      setBadges(res.data);
    } catch (error) {
      console.error("Error loading badges:", error);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeStyle = (index) => {
    return badgeIcons[index % badgeIcons.length];
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={item} className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg mb-4">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800">Your Badges</h1>
        <p className="text-gray-600 mt-2">Celebrate your achievements and milestones</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
        <Card className="text-center py-6">
          <Award className="w-8 h-8 mx-auto text-amber-500 mb-2" />
          <p className="text-3xl font-bold gradient-text">{badges.length}</p>
          <p className="text-sm text-gray-500">Total Earned</p>
        </Card>
        <Card className="text-center py-6">
          <Flame className="w-8 h-8 mx-auto text-red-500 mb-2" />
          <p className="text-3xl font-bold text-red-500">7</p>
          <p className="text-sm text-gray-500">Day Streak</p>
        </Card>
        <Card className="text-center py-6">
          <Star className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
          <p className="text-3xl font-bold text-yellow-500">Gold</p>
          <p className="text-sm text-gray-500">Current Level</p>
        </Card>
      </motion.div>

      {/* Badges Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-aqua-200 border-t-aqua-500 rounded-full animate-spin" />
        </div>
      ) : badges.length === 0 ? (
        <motion.div variants={item}>
          <Card className="text-center py-12 max-w-md mx-auto">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No badges yet</h3>
            <p className="text-gray-500">Complete habits and goals to earn badges!</p>
          </Card>
        </motion.div>
      ) : (
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((b, index) => {
            const { icon: BadgeIcon, gradient } = getBadgeStyle(index);
            return (
              <motion.div
                key={b.badge_id}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="relative overflow-hidden group cursor-pointer">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-aqua-400/0 to-aqua-500/0 group-hover:from-aqua-400/10 group-hover:to-aqua-500/10 transition-all duration-300" />
                  
                  <div className="relative flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                    >
                      <BadgeIcon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 mb-1">{b.badge_name}</h3>
                      <p className="text-gray-600 text-sm">{b.badge_description}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                          <Star className="w-3 h-3" />
                          Earned
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sparkle effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute top-2 right-2"
                  >
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Achievement Progress */}
      <motion.div variants={item}>
        <Card className="max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Next Achievements</h3>
          <div className="space-y-4">
            {[
              { name: "7-Day Streak", progress: 70, icon: Flame, color: "from-red-400 to-rose-500" },
              { name: "Goal Master", progress: 45, icon: Target, color: "from-teal-400 to-teal-600" },
              { name: "Habit Hero", progress: 85, icon: Zap, color: "from-blue-400 to-indigo-500" },
            ].map((achievement, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-10 h-10 bg-gradient-to-br ${achievement.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <achievement.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-700">{achievement.name}</span>
                    <span className="text-sm text-gray-500">{achievement.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${achievement.progress}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className={`h-full bg-gradient-to-r ${achievement.color} rounded-full`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
