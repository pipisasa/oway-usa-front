import React, { useState } from "react";
import { baseAxios } from "../../utils/baseAxios";
import { useQuery } from "@tanstack/react-query";

function UserSearch() {
  const [query, setQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await baseAxios.get(`/add_user_for_admin/list/`, {
        params: {
          unique_id: query,
        },
      });
      return data;
    },
    queryKey: ["users-search", { query }],
  });

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter unique ID"
      />
      {isLoading && <p>Searching...</p>}
      {!isLoading && !data && <p>No results</p>}
      <ul>
        {data?.results?.map((user) => (
          <li key={user.id}>{user.first_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearch;
