import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Calendar,
  Target,
  Search,
  Clock,
  CheckCircle
} from "lucide-react";
import API, { getGoals } from "../services/api";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import ProgressBar from "../components/ui/ProgressBar";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    goal_title: "",
    goal_description: "",
    target_date: ""
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.user_id || 1;

  useEffect(() => {
    loadGoals();
  }, []);

  useEffect(() => {
    const filtered = goals.filter((g) =>
      g.goal_title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredGoals(filtered);
  }, [search, goals]);

  const loadGoals = async () => {
    try {
      const res = await getGoals(userId);
      setGoals(res.data);
      setFilteredGoals(res.data);
    } catch (error) {
      console.error("Error loading goals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.goal_title.trim() || !form.target_date) return;

    setSubmitting(true);
    try {
      if (editId) {
        await API.put(`/update_goal/${editId}`, {
          goal_title: form.goal_title,
          goal_description: form.goal_description,
          target_date: form.target_date,
        });
      } else {
        await API.post("/add_goal", {
          user_id: userId,
          goal_title: form.goal_title,
          goal_description: form.goal_description,
          target_date: form.target_date,
        });
      }
      resetForm();
      loadGoals();
    } catch (error) {
      console.error("Error saving goal:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({ goal_title: "", goal_description: "", target_date: "" });
    setEditId(null);
    setModalOpen(false);
  };

  const deleteGoal = async (id) => {
    try {
      await API.delete(`/delete_goal/${id}`);
      loadGoals();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const startEdit = (goal) => {
    setEditId(goal.goal_id);
    setForm({
      goal_title: goal.goal_title,
      goal_description: goal.goal_description,
      target_date: goal.target_date,
    });
    setModalOpen(true);
  };

  const getDaysRemaining = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getProgress = (targetDate) => {
    // Simulated progress based on time
    const days = getDaysRemaining(targetDate);
    if (days <= 0) return 100;
    if (days > 30) return Math.floor(Math.random() * 30) + 10;
    return Math.floor(100 - (days / 30) * 100);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Your Goals</h1>
          <p className="text-gray-600 mt-1">Plan, track and achieve your targets</p>
        </div>
        <Button icon={Plus} onClick={() => setModalOpen(true)}>
          Add Goal
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div variants={item} className="max-w-md">
        <Input
          placeholder="Search goals..."
          icon={Search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center py-4">
          <p className="text-3xl font-bold gradient-text">{goals.length}</p>
          <p className="text-sm text-gray-500">Total Goals</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-3xl font-bold text-green-600">
            {goals.filter(g => getDaysRemaining(g.target_date) <= 0).length}
          </p>
          <p className="text-sm text-gray-500">Completed</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-3xl font-bold text-amber-600">
            {goals.filter(g => getDaysRemaining(g.target_date) > 0 && getDaysRemaining(g.target_date) <= 7).length}
          </p>
          <p className="text-sm text-gray-500">Due Soon</p>
        </Card>
        <Card className="text-center py-4">
          <div className="flex items-center justify-center gap-1">
            <Target className="w-6 h-6 text-teal-500" />
            <span className="text-3xl font-bold text-teal-500">
              {goals.filter(g => getDaysRemaining(g.target_date) > 7).length}
            </span>
          </div>
          <p className="text-sm text-gray-500">In Progress</p>
        </Card>
      </motion.div>

      {/* Goals Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-aqua-200 border-t-aqua-500 rounded-full animate-spin" />
        </div>
      ) : filteredGoals.length === 0 ? (
        <motion.div variants={item}>
          <Card className="text-center py-12">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-10 h-10 text-teal-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No goals yet</h3>
            <p className="text-gray-500 mb-4">Set your first goal and start achieving!</p>
            <Button icon={Plus} onClick={() => setModalOpen(true)}>
              Create Your First Goal
            </Button>
          </Card>
        </motion.div>
      ) : (
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredGoals.map((g) => {
              const daysRemaining = getDaysRemaining(g.target_date);
              const progress = getProgress(g.target_date);
              const isCompleted = daysRemaining <= 0;
              const isDueSoon = daysRemaining > 0 && daysRemaining <= 7;

              return (
                <motion.div
                  key={g.goal_id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card className={`group hover-lift border-l-4 ${
                    isCompleted ? "border-green-500" : isDueSoon ? "border-amber-500" : "border-teal-500"
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                          isCompleted 
                            ? "bg-gradient-to-br from-green-400 to-green-600" 
                            : isDueSoon
                            ? "bg-gradient-to-br from-amber-400 to-orange-500"
                            : "bg-teal-gradient"
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                          ) : (
                            <Target className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{g.goal_title}</h3>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {g.target_date}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => startEdit(g)}
                          className="p-2 text-gray-400 hover:text-aqua-600 hover:bg-aqua-50 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteGoal(g.goal_id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{g.goal_description}</p>

                    <ProgressBar percentage={progress} height={6} />

                    <div className="flex items-center justify-between mt-3 text-sm">
                      <span className="text-gray-500">{progress}% complete</span>
                      <span className={`flex items-center gap-1 font-medium ${
                        isCompleted ? "text-green-600" : isDueSoon ? "text-amber-600" : "text-gray-500"
                      }`}>
                        <Clock className="w-4 h-4" />
                        {isCompleted ? "Completed!" : `${daysRemaining} days left`}
                      </span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={resetForm} 
        title={editId ? "Edit Goal" : "Add New Goal"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Goal Title"
            placeholder="e.g., Learn Spanish"
            value={form.goal_title}
            onChange={(e) => setForm({ ...form, goal_title: e.target.value })}
            required
          />
          <Input
            label="Description"
            placeholder="What do you want to achieve?"
            value={form.goal_description}
            onChange={(e) => setForm({ ...form, goal_description: e.target.value })}
          />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Target Date</label>
            <input
              type="date"
              value={form.target_date}
              onChange={(e) => setForm({ ...form, target_date: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-aqua-400 focus:ring-2 focus:ring-aqua-400/20"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={resetForm} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" loading={submitting} className="flex-1">
              {editId ? "Update Goal" : "Add Goal"}
            </Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
