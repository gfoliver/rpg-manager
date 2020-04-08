import React, { useState } from 'react'
import api from '../../services/api'
import Header from '../partials/Header'
import LoginPage from '../../styles/LoginPage'
import background from '../../assets/img/land.svg'
import castle from '../../assets/img/castle.png'
import knight from '../../assets/img/knight.svg'
import FormCard from '../../styles/FormCard'
import SubmitButton from '../../styles/SubmitButton'
import { Link, useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

export default function Login({ changeLogin }) {
    const history = useHistory()
    const { addToast } = useToasts()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await api.post('/login', {
                email,
                password
            })
    
            if (response.data.status) {
                changeLogin(true, response.data.token)
                history.push('/')
            }
        }
        catch(error) {
            if (error.response && error.response.data) {
                addToast(error.response.data.message, {appearance: 'error', autoDismiss: true})
            }
            else {
                addToast('Error logging in', {appearance: 'error', autoDismiss: true})
            }
        }
    }

    return (
        <LoginPage>
            <Header />
            <div className="contentWrapper">
                <FormCard >
                    <h1 className="title">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="inputGroup">
                            <label htmlFor="login-email">E-mail</label>
                            <input 
                                type="email" 
                                id="login-email" 
                                onChange={e => setEmail(e.target.value)} 
                            />
                        </div>
                        <div className="inputGroup">
                            <label htmlFor="login-password">Password</label>
                            <input 
                                type="password" 
                                id="login-password"
                                onChange={e => setPassword(e.target.value)} 
                            />
                        </div>
                        <SubmitButton type="submit">Enter</SubmitButton>
                        <span>
                            <Link to="/register">Not Registered</Link> | <Link to="/forgot-password">Forgot Password</Link>
                        </span>
                    </form>
                </FormCard>
            </div>
            <img src={knight} className="knight" alt="Knight" />
            <img src={castle} alt="Castle" className="castle"/>
            <img src={background} className="land" alt="Land" />
        </LoginPage>
    )
}