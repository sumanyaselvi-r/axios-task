import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from './Users';
import './App.css';


const API_URL = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: { street: '', suite: '', city: '' },
    phone: '',
    company: { name: '' },
  });

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddUser = () => {
    axios.post(API_URL, formData)
      .then(response => {
        setUsers([...users, response.data]);
        setFormData({
          name: '',
          email: '',
          address: { street: '', suite: '', city: '' },
          phone: '',
          company: { name: '' },
        });
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
    const userToEdit = users.find(user => user.id === userId);
    setFormData({
      name: userToEdit.name,
      email: userToEdit.email,
      address: { ...userToEdit.address },
      phone: userToEdit.phone,
      company: { ...userToEdit.company },
    });
  };

  const handleUpdateUser = () => {
    axios.put(`${API_URL}/${editingUserId}`, formData)
      .then(response => {
        const updatedUsers = users.map(user =>
          user.id === editingUserId ? response.data : user
        );
        setUsers(updatedUsers);
        setEditingUserId(null);
        setFormData({
          name: '',
          email: '',
          address: { street: '', suite: '', city: '' },
          phone: '',
          company: { name: '' },
        });
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleDeleteUser = (userId) => {
    axios.delete(`${API_URL}/${userId}`)
      .then(() => {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <>
    <br></br>
      <h1 style={{textAlign:'center'}}>React Axios Task</h1>
      <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' ,fontSize:'20px' }}>
      <form>
        <label>Name:</label>
        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <label>Email:</label>
        <input type="text" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <label>Street:</label>
        <input type="text" value={formData.address.street} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })} />
        <label>Suite:</label>
        <input type="text" value={formData.address.suite} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, suite: e.target.value } })} />
        <label>City:</label>
        <input type="text" value={formData.address.city} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })} />
        <label>Phone:</label>
        <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        <label>Company Name:</label>
        <input type="text" value={formData.company.name} onChange={(e) => setFormData({ ...formData, company: { ...formData.company, name: e.target.value } })} />
        <button type="button" onClick={editingUserId ? handleUpdateUser : handleAddUser}>{editingUserId ? 'Update User' : 'Add User'}</button>
      </form>
      </div>
      <h2 style={{textAlign:'center'}}>Users Data</h2>
      <div className='container'>
      <div className='row'>
      {users.map((user) => (
        <User key={user.id} user={user} onDelete={handleDeleteUser} onEdit={handleEditUser} />
      ))}
      </div>
      </div>
   </>
  );
};

export default App;
