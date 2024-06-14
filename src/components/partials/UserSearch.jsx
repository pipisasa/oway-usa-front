import { getCookie } from "@/utils/cookieHelpers";
import React, { useState } from "react";

function UserSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const accessToken = getCookie("accessToken");
    setLoading(true);
    const response = await fetch(
      `https://api-owayusa.com/api/add_user_for_admin/list/?unique_id=${query}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setUsers(data.results);
    } else {
      alert("Failed to fetch users");
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter unique ID"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.first_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearch;
