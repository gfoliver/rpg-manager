import React from 'react';

export default function UserButton({ user }) {
    return(
        <div className="UserButton">
            { user.avatar && <img src={user.avatar} alt={user.name} /> }
            <div className="name">{user.name}</div>
        </div>
    )
}