import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  Calendar, 
  Repeat, 
  CheckCircle2,
  Clock,
  Flame,
  Search
} from "lucide-react";
import { getHabits, addHabit, deleteHabit } from "../services/api";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const frequencyColors = {
  Daily: "bg-aqua-100 text-aqua-700",
  Weekly: "bg-teal-100 text-teal-700",
  Monthly: "bg-amber-100 text-amber-700",
};

const frequencyIcons = {
  Daily: Clock,
  Weekly: Calendar,
  Monthly: Repeat,
};

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [form, setForm] = useState({
    habit_name: "",
    description: "",
    frequency: "Daily"
  });

  useEffect(() => {
    loadHabits();
  }, []);

  useEffect(() => {
    const filtered = habits.filter((h) =>
      h.habit_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredHabits(filtered);
  }, [search, habits]);

  const loadHabits = async () => {
    try {
      const res = await getHabits();
      setHabits(res.data);
      setFilteredHabits(res.data);
    } catch (error) {
      console.error("Error loading habits:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.habit_name.trim()) return;

    setSubmitting(true);
    try {
      await addHabit({
        user_id: 1,
        habit_name: form.habit_name,
        description: form.description || "My habit",
        frequency: form.frequency,
      });
      setForm({ habit_name: "", description: "", frequency: "Daily" });
      setModalOpen(false);
      loadHabits();
    } catch (error) {
      console.error("Error adding habit:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (habitId) => {
    try {
      await deleteHabit(habitId);
      loadHabits();
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
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
          <h1 className="text-4xl font-bold text-gray-800">Your Habits</h1>
          <p className="text-gray-600 mt-1">Build consistency, one habit at a time</p>
        </div>
        <Button icon={Plus} onClick={() => setModalOpen(true)}>
          Add Habit
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div variants={item} className="max-w-md">
        <Input
          placeholder="Search habits..."
          icon={Search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center py-4">
          <p className="text-3xl font-bold gradient-text">{habits.length}</p>
          <p className="text-sm text-gray-500">Total Habits</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-3xl font-bold text-aqua-600">
            {habits.filter(h => h.frequency === "Daily").length}
          </p>
          <p className="text-sm text-gray-500">Daily</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-3xl font-bold text-teal-600">
            {habits.filter(h => h.frequency === "Weekly").length}
          </p>
          <p className="text-sm text-gray-500">Weekly</p>
        </Card>
        <Card className="text-center py-4">
          <div className="flex items-center justify-center gap-1">
            <Flame className="w-6 h-6 text-orange-500" />
            <span className="text-3xl font-bold text-orange-500">7</span>
          </div>
          <p className="text-sm text-gray-500">Day Streak</p>
        </Card>
      </motion.div>

      {/* Habits Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-aqua-200 border-t-aqua-500 rounded-full animate-spin" />
        </div>
      ) : filteredHabits.length === 0 ? (
        <motion.div variants={item}>
          <Card className="text-center py-12">
            <div className="w-20 h-20 bg-aqua-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-aqua-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No habits yet</h3>
            <p className="text-gray-500 mb-4">Start building great habits today!</p>
            <Button icon={Plus} onClick={() => setModalOpen(true)}>
              Create Your First Habit
            </Button>
          </Card>
        </motion.div>
      ) : (
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredHabits.map((h) => {
              const FreqIcon = frequencyIcons[h.frequency] || Clock;
              return (
                <motion.div
                  key={h.habit_id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card className="group hover-lift border-l-4 border-aqua-400">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-aqua-gradient rounded-xl flex items-center justify-center shadow-glow">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{h.habit_name}</h3>
                          <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${frequencyColors[h.frequency]}`}>
                            <FreqIcon className="w-3 h-3" />
                            {h.frequency}
                          </span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(h.habit_id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                    <p className="text-gray-600 text-sm">{h.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Add Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add New Habit">
        <form onSubmit={handleAdd} className="space-y-4">
          <Input
            label="Habit Name"
            placeholder="e.g., Morning Meditation"
            value={form.habit_name}
            onChange={(e) => setForm({ ...form, habit_name: e.target.value })}
            required
          />
          <Input
            label="Description"
            placeholder="What's this habit about?"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Frequency</label>
            <select
              value={form.frequency}
              onChange={(e) => setForm({ ...form, frequency: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-aqua-400 focus:ring-2 focus:ring-aqua-400/20"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" loading={submitting} className="flex-1">
              Add Habit
            </Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
