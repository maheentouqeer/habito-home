import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users as UsersIcon, 
  Mail, 
  Calendar,
  Shield,
  Search
} from "lucide-react";
import { getUsers } from "../services/api";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (index) => {
    const colors = [
      "from-aqua-400 to-teal-500",
      "from-purple-400 to-violet-500",
      "from-amber-400 to-orange-500",
      "from-green-400 to-emerald-500",
      "from-blue-400 to-indigo-500",
      "from-rose-400 to-red-500",
    ];
    return colors[index % colors.length];
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
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Manage all registered users</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center py-4">
          <UsersIcon className="w-8 h-8 mx-auto text-aqua-500 mb-2" />
          <p className="text-3xl font-bold gradient-text">{users.length}</p>
          <p className="text-sm text-gray-500">Total Users</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-3xl font-bold text-green-600">
            {users.filter(u => u.is_active !== false).length}
          </p>
          <p className="text-sm text-gray-500">Active</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-3xl font-bold text-amber-600">
            {users.filter(u => {
              const date = new Date(u.created_at);
              const now = new Date();
              return (now - date) / (1000 * 60 * 60 * 24) <= 7;
            }).length}
          </p>
          <p className="text-sm text-gray-500">New This Week</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-3xl font-bold text-purple-600">1</p>
          <p className="text-sm text-gray-500">Admins</p>
        </Card>
      </motion.div>

      {/* Search */}
      <motion.div variants={item} className="max-w-md">
        <Input
          placeholder="Search users by name or email..."
          icon={Search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </motion.div>

      {/* Users Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-aqua-200 border-t-aqua-500 rounded-full animate-spin" />
        </div>
      ) : (
        <motion.div variants={item}>
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-aqua-50 to-teal-50 border-b border-aqua-100">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">User</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Joined</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-12 text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u, index) => (
                      <motion.tr
                        key={u.user_id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 hover:bg-aqua-50/50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getAvatarColor(index)} flex items-center justify-center text-white font-semibold text-sm shadow-md`}>
                              {getInitials(u.name)}
                            </div>
                            <span className="font-medium text-gray-800">{u.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {u.email}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {u.created_at ? new Date(u.created_at).toLocaleDateString() : "N/A"}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            Active
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
