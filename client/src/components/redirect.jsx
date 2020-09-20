import React from 'react'
import { Redirect } from "react-router-dom"

function redirect() {
    return (
        <div>
            <Redirect to="/" />
        </div>
    )
}

export default redirect
