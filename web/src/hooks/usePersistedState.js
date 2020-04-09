import { useState, useEffect } from 'react'

const usePersistedState = (key, initialState) => {
    const [state, setState] = useState(initialState)
    
    const setPersistedState = value => {
        setState(value)
        localStorage.setItem(key, JSON.stringify(value))
    }

    const removePersistedState = () => {
        setState(null)
        localStorage.removeItem(key)
    }

    useEffect(() => {
        if (localStorage.getItem(key)) {
            setState(JSON.parse(localStorage.getItem(key)))
        }
    }, [key])

    return [state, setPersistedState, removePersistedState]
}

export default usePersistedState