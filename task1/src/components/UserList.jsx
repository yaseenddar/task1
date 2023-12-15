import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [pastSearches, setPastSearches] = useState([]);

  useEffect(() => {
    // Fetch users data from the API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    // Filter users based on the search term
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);

    // Update past searches
    setPastSearches((prevSearches) => [...prevSearches, term]);
  };

  const handleSort = () => {
    // Sort users by name
    const sortedUsers = [...filteredUsers].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setFilteredUsers(sortedUsers);
  };

  return (
    <div className="container mx-auto p-4"> {/* Applying Tailwind classes */}
      <input
        className="border border-gray-300 rounded-md p-2 mb-4"
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSort}
      >
        Sort by Name
      </button>
      <ul className="mt-4">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="border border-gray-300 rounded-md p-2 mb-2"
          >
            {user.name}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        Past Searches:
        <ul>
          {pastSearches.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
