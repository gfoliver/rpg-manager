import React, { useState } from 'react'
import Header from '../partials/Header'
import background from '../../assets/img/land.svg'
import castle from '../../assets/img/castle.png'
import knight from '../../assets/img/knight.svg'
import FormCard from '../../styles/FormCard'
import SubmitButton from '../../styles/SubmitButton'
import { Link, useHistory } from 'react-router-dom'
import RegisterPage from '../../styles/RegisterPage'
import api from '../../services/api'
import { useToasts } from 'react-toast-notifications'

export default function Register({ changeLogin }) {
    const { addToast } = useToasts()
    const history = useHistory()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== passwordRepeat) {
            addToast('Password confirmation is incorrect', {
                appearance: 'error', 
                autoDismiss: true
            })
        }

        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            })

            if (response.data.status) {
                const loginResponse = await api.post('/login', {
                    email,
                    password
                })

                if (loginResponse.data.status) {
                    changeLogin(true, loginResponse.data.token)
                    history.push('/')
                }
            }
        }
        catch(error) {
            if (error.response && error.response.data) {
                addToast(error.response.data.message, {
                    appearance: 'error',
                    autoDismiss: true
                })
            }
            else {
                addToast('Error while registering user', {
                    appearance: 'error',
                    autoDismiss: true
                })
            }
        }
    }

    return (
        <RegisterPage>
            <Header />
            <div className="contentWrapper">
                <FormCard >
                    <h1 className="title">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="inputGroup">
                            <label htmlFor="register-name">Name</label>
                            <input 
                                type="text" 
                                id="register-name" 
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="inputGroup">
                            <label htmlFor="register-email">E-mail</label>
                            <input 
                                type="email" 
                                id="register-email" 
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="inputRow">
                            <div className="inputGroup">
                                <label htmlFor="register-password">Password</label>
                                <input 
                                    type="password" 
                                    id="register-password" 
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="inputGroup">
                                <label htmlFor="register-password-repeat">Repeat Password</label>
                                <input 
                                    type="password" 
                                    id="register-password-repeat" 
                                    onChange={e => setPasswordRepeat(e.target.value)}
                                />
                            </div>
                        </div>
                        <SubmitButton type="submit">Register</SubmitButton>
                        <span><Link to="/login">Already Registered</Link></span>
                    </form>
                </FormCard>
            </div>
            <img src={knight} className="knight" alt="Knight" />
            <img src={castle} alt="Castle" className="castle"/>
            <img src={background} className="land" alt="Land" />
        </RegisterPage>
    )
}