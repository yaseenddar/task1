import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearch = () => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())//filter the data according the search and store to filtered
    );
    setUsers(filtered);//filtered data
    setSearchHistory(prevHistory => [...prevHistory, searchTerm]);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  };

  const handleSortByName = () => {
    const sortedUsers = [...users].sort((a, b) =>{
        if(a.name > b.name){
            return 1;
        }
        if(a.name < b.name){
            return -1;
        }
        else{
            return 0;
        }
    }
    );
    setUsers(sortedUsers);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
       
        setUsers(res.data); // Set both users and filteredUsers after fetching
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='mx-auto w-full'>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 mr-2"
        placeholder="Search by name"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>
      <button onClick={handleSortByName} className="bg-green-500 text-white px-4 py-2 rounded ml-2">
          Sort by Name
        </button>
        <div>
        <h3>Past Search Terms:</h3>
        <ul>
          {searchHistory.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </div>
      {
        users.map((user) => (
          <Card key={user.id} user={user} />
        ))
      }
    </div>
  );
}
