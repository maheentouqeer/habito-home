// ============================================
// API SERVICE - DO NOT MODIFY ENDPOINTS
// ============================================

import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: { "Content-Type": "application/json" },
});

// Automatically attach token on every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const signup = (data) => API.post("/register", data);
export const login = async (data) => {
  const res = await API.post("/login", data);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res;
};

// HABITS
export const getHabits = () => API.get("/habits");
export const addHabit = (data) => API.post("/add_habit", data);
export const updateHabit = (id, data) => API.put(`/update_habit/${id}`, data);
export const deleteHabit = (id) => API.delete(`/delete_habit/${id}`);

// USERS
export const getUsers = () => API.get("/users");

// GOALS
export const getGoals = (userId) => API.get(`/goals/${userId}`);

// BADGES
export const getBadges = () => API.get("/badges");

// HABIT LOGS
export const getHabitLogs = (habit_id) => API.get(`/habitlogs/${habit_id}`);
export const addHabitLog = (data) => API.post("/add_log", data);
export const deleteHabitLog = (log_id) => API.delete(`/delete_log/${log_id}`);

// DASHBOARD STATS
export const getDashboardStats = async (userId) => {
  const habits = await API.get("/habits");
  const goals = await API.get(`/goals/${userId}`);
  const badges = await API.get("/badges");

  return {
    habits: habits.data.length,
    goals: goals.data.length,
    badges: badges.data.length,
  };
};

export default API;
