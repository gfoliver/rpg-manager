import React from 'react'

import HeaderDiv from '../../styles/Header'

import Logo from './Logo'
import UserButton from './UserButton'

export default function Header({ auth }) {
    return(
        <HeaderDiv>
            <Logo />
            {auth && (
                <>
                    <UserButton user={{name: 'Elrund'}} />
                </>
            )}
        </HeaderDiv>
    )
}