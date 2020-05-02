import React, { useContext } from 'react'
import { FaFacebook } from 'react-icons/fa'
import firebaseContext from './../firebase/context';
export const Header = () => {

    const { user, firebase } = useContext(firebaseContext)
    return (
        <div className='header'>
            <h1 className="header-title">TwitCoders</h1>
            {!user ?
                (<button
                    onClick={() => firebase.login('facebook')}
                    type='button' className="login-btn">
                    <FaFacebook />Login
                </button>)
                :
                (<button
                    onClick={() => firebase.logout()}
                    type='button' className="login-btn">
                    <FaFacebook />Log Out
                </button>)
            }

        </div>
    )
}
export default Header