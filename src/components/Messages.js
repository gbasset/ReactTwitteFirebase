import React, { useContext, useState, useEffect } from 'react'
import { FiHeart, FiX, FiMessageCircle, FiUpload, FiRefreshCw } from 'react-icons/fi'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import IconeContainer from './IconeContainer';
import firebaseContext from './../firebase/context';
export default function Messages({ message }) {
    const { user, firebase } = useContext(firebaseContext)
    const isOwner = user && user.uid === message.postedBy.id
    const [isLike, setIsLike] = useState(false)

    useEffect(() => {
        if (user) {
            const IsLiked = message.likes.some(like => like.likeby.id === user.uid)
            setIsLike(IsLiked)
        }
    }, [user, message.likes])
    const handleLike = () => {
        const likeRef = firebase.db.collection('messages').doc(message.id)
        setIsLike(!isLike)
        if (!isLike) {
            const like = { likeby: { id: user.uid, name: user.displayName } }
            const updatesLikes = [...message.likes, like]
            likeRef.update({ likes: updatesLikes })
        } else {
            const updatesLikes = message.likes.filter(x => x.likeby.id !== user.uid)
            likeRef.update({ likes: updatesLikes })
        }

    }

    const handleDelete = () => {
        const messageRef = firebase.db.collection('messages').doc(message.id)
        messageRef.delete()
    }
    return (
        <div className="message-container">
            <div>
                <img src={message.photo} className="profil-picture" alt="Profil de Gaetano" />
            </div>
            <div className="message">
                <header>
                    <h3> {message.postedBy.name}</h3>
                    <span> . {formatDistanceToNow(message.createAt, { locale: fr })} </span>
                </header>
                <p>{message.message} </p>
                {user ? <footer>
                    <IconeContainer color="blue">
                        <FiMessageCircle />
                    </IconeContainer >
                    <IconeContainer color="green" >
                        <FiRefreshCw />
                    </IconeContainer>
                    <IconeContainer onClick={handleLike} color="red" isLiked={isLike} count={message.likes.length}>
                        <FiHeart />
                    </IconeContainer>
                    <IconeContainer color="blue" >
                        <FiUpload />
                    </IconeContainer>
                    {isOwner ?
                        <IconeContainer onClick={handleDelete} color="red" >
                            <FiX />
                        </IconeContainer>
                        : null}
                </footer> : null}
            </div>
        </div>
    )
}
