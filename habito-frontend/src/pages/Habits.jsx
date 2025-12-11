import { useEffect, useState } from "react";
import { getHabits, addHabit, deleteHabit } from "../api/api";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      const res = await getHabits();
      setHabits(res.data);
    } catch (error) {
      console.error("Error loading habits:", error);
    }
  };

  const handleAdd = async () => {
    if (!newHabit.trim()) return;

    setLoading(true);
    try {
      await addHabit({
        user_id: 1,
        habit_name: newHabit,
        description: description || "My habit",
        frequency: frequency,
      });
      setNewHabit("");
      setDescription("");
      setFrequency("Daily");
      loadHabits();
    } catch (error) {
      console.error("Error adding habit:", error);
    } finally {
      setLoading(false);
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
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-aquadark mb-2">Your Habits</h1>
        <p className="text-lg text-gray-600">
          Build and maintain healthy habits for a better life
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-aquadark mb-6">Add New Habit</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-aqua focus:border-transparent transition-all"
            placeholder="Habit name..."
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <input
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-aqua focus:border-transparent transition-all"
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-aqua focus:border-transparent transition-all"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-gradient-to-r from-aqua to-aquablue text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add Habit"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map((h) => (
          <div
            key={h.habit_id}
            className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-aquablue hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="bg-aqua bg-opacity-10 p-2 rounded-full mr-3">
                  <svg className="w-6 h-6 text-aqua" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-aquadark">{h.habit_name}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{h.frequency}</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(h.habit_id)}
                className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600">{h.description}</p>
          </div>
        ))}
      </div>

      {habits.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No habits yet</h3>
          <p className="text-gray-500">Start building healthy habits by adding your first one above!</p>
        </div>
      )}
    </div>
  );
}


