import { useState, useEffect } from 'react'
import firebase from '../firebase'

const useAuth = () => {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => { //quand l'état de l'hôte change
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })

        return () => unsubscribe() //le return dans un useEffect est l'équivalent d'un willunmount, on fait ça pour que l'objet user disparaisse quand l'user part de l'appli
    }, [])

    return authUser
}
export default useAuth