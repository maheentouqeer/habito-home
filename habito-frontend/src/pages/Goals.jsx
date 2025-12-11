// import { useEffect, useState } from "react";
// import { getGoals } from "../api/api";

// export default function Goals() {
//   const [goals, setGoals] = useState([]);

//   useEffect(() => {
//     getGoals(1).then((res) => setGoals(res.data));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold text-aquadark mb-4">Your Goals</h1>

//       <div className="grid gap-4">
//         {goals.map((g) => (
//           <div key={g.goal_id} className="bg-white p-4 rounded-lg shadow">
//             <p className="font-bold">{g.goal_title}</p>
//             <p className="text-gray-600 text-sm">{g.goal_description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import API, { getGoals } from "../api/api";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);

  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // LOAD GOALS
  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const res = await getGoals(1);
      setGoals(res.data);
      setFilteredGoals(res.data);
    } catch (error) {
      console.error("Error loading goals:", error);
    }
  };

  // SEARCH
  useEffect(() => {
    const filtered = goals.filter((g) =>
      g.goal_title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredGoals(filtered);
  }, [search, goals]);

  // ADD OR UPDATE GOAL
  const handleSubmit = async () => {
    if (!title.trim() || !desc.trim() || !date) return;

    setLoading(true);
    try {
      if (editId) {
        await API.put(`/update_goal/${editId}`, {
          goal_title: title,
          goal_description: desc,
          target_date: date,
        });
      } else {
        await API.post("/add_goal", {
          user_id: 1,
          goal_title: title,
          goal_description: desc,
          target_date: date,
        });
      }

      resetForm();
      loadGoals();
    } catch (error) {
      console.error("Error saving goal:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setDate("");
    setEditId(null);
  };

  // DELETE
  const deleteGoal = async (id) => {
    try {
      await API.delete(`/delete_goal/${id}`);
      loadGoals();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // LOAD FOR EDITING
  const startEdit = (goal) => {
    setEditId(goal.goal_id);
    setTitle(goal.goal_title);
    setDesc(goal.goal_description);
    setDate(goal.target_date);
  };

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-aquadark">Your Goals</h1>
        <p className="text-gray-600 mt-2">Plan, track and achieve your targets</p>
      </div>

      {/* ADD / UPDATE GOAL FORM */}
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-aquadark mb-4">
          {editId ? "Update Goal" : "Add New Goal"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-aqua"
            placeholder="Goal Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-aqua"
            placeholder="Goal Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <input
            type="date"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-aqua"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 bg-gradient-to-r from-aqua to-aquablue text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          {loading ? "Saving..." : editId ? "Update Goal" : "Add Goal"}
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="flex justify-end">
        <input
          className="border p-3 w-60 rounded-lg focus:ring-2 focus:ring-aqua"
          placeholder="Search goals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* GOALS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGoals.map((g) => (
          <div
            key={g.goal_id}
            className="bg-white shadow-lg p-6 rounded-2xl border-l-4 border-aquablue hover:shadow-xl transition-all"
          >
            <h3 className="text-xl font-bold text-aquadark">{g.goal_title}</h3>
            <p className="text-gray-600 mt-1">{g.goal_description}</p>

            <p className="text-sm text-gray-500 mt-2">
              🎯 Target: {g.target_date}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => startEdit(g)}
                className="px-4 py-2 bg-aquablue text-white rounded-lg hover:opacity-90"
              >
                Edit
              </button>

              <button
                onClick={() => deleteGoal(g.goal_id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredGoals.length === 0 && (
        <div className="text-center text-gray-500 py-10 text-lg">
          No goals found
        </div>
      )}
    </div>
  );
}
