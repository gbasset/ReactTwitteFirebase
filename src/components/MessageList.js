import React, { useContext, useState, useEffect } from 'react'
import firebaseContext from './../firebase/context';
import Messages from './Messages'
export default function MessageList() {
    const { firebase } = useContext(firebaseContext)
    const [messages, setMessages] = useState([])

    const handleSnapshot = snapshot => {
        const messages = snapshot.docs.map(doc =>
            ({
                id: doc.id, ...doc.data()
            }))
        setMessages(messages)
    }
    useEffect(() => {
        const getMessages = () => {
            firebase.db.collection('messages').orderBy('createAt', 'desc').onSnapshot(handleSnapshot)
        }
        return getMessages()
    }, [firebase])
    return (
        <div>
            {messages.map((message) =>
                (<Messages key={message.id} message={message} />)
            )}
        </div>
    )
}
