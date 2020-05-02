import React from 'react'

export const MessagesForm = ({ handleSubmit, handleKeyDown, handleChange, values, errors, user }) => {

    // useEffect(() => {
    //     console.log('montage');
    // }, [])

    return (
        <form onSubmit={handleSubmit} className='message-form-container'>
            <div className="message-form">
                <div>
                    <img src={user.photoURL} className="profil-picture" alt="Profil de Gaetano" />
                </div>
                <textarea
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="message"
                    values={values.message}
                    placeholder="Quoi de neuf  ?"
                />
            </div>
            {errors.message && <p className='error-text'> {errors.message}</p>}
            <footer>
                <p>{280 - values.message.length}</p>
                <button type="submit" disabled={values.message.length > 280 || values.message.length === 0}> Tweeter</button>
            </footer>
        </form>
    )
}
export default MessagesForm
