

import React from 'react';

const User = ({ user, onDelete, onEdit }) => {
  return (
    <><div className="col-lg-4 mt-2">
    <div className="card" >
       
        <div className="card-body">
            <p className="card-text"><span>Name:</span> {user.name}</p>
            <p className="card-text"><span>Email:</span> {user.email}</p>
            <p className="card-text"><span>Address:</span> {user.address.city}, {user.address.street}, {user.address.suite}</p>
            <p className="card-text"><span>Phone:</span> {user.phone}</p> 
            <p className="card-text"><span>Company:</span> {user.company.name}</p>
            <button className='btn btn-primary' onClick={() => onEdit(user.id)} style={{ marginRight: '8px', fontSize: "20px" }}>Edit</button>
      <button  className="btn btn-danger" onClick={() => onDelete(user.id)} style={{ marginRight: '8px', fontSize: "20px" }}>Delete</button>
        </div>
    </div>
    <br></br><br></br>

</div></>




   
  );
};

export default User;
