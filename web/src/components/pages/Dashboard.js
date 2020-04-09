import React from 'react';
import Header from '../partials/Header'

export default function Dashboard({ auth }) {
    return(
        <div className="Dashboard">
            <Header auth={auth} />
            Dashboard
        </div>
    )
}