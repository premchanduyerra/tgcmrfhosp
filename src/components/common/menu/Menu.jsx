import React from 'react'
import { isLoggedIn } from '../../../hooks/auth'
import { OfficialMenu } from './OfficialMenu'
import { CommonMenu } from './CommonMenu'

export const Menu = () => {
    return (
            <>
                {(isLoggedIn()?<OfficialMenu />:<CommonMenu/>)}
            </>
    )
}
