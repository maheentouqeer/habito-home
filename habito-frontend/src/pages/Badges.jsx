import { useEffect, useState } from "react";
import { getBadges } from "../api/api";

export default function Badges() {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    getBadges().then((res) => setBadges(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-aquadark mb-4">Your Badges</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {badges.map((b) => (
          <div key={b.badge_id} className="bg-aquablue text-white p-6 rounded-xl shadow">
            <p className="font-bold text-lg">{b.badge_name}</p>
            <p>{b.badge_description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
