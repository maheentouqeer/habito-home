import { useEffect, useState } from "react";
import { getUsers } from "../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-aquadark mb-4">All Users</h1>

      <div className="grid gap-4">
        {users.map((u) => (
          <div key={u.user_id} className="bg-white p-4 shadow rounded-lg">
            <p className="font-bold">{u.name}</p>
            <p className="text-gray-600">{u.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
