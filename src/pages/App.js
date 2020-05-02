import React from 'react'
import '../styles/App.css'
import Header from './../components/Header';
// import Messages from '../components/Messages';
import CreateMessage from '../components/CreateMessage';
import firebase, { FirebaseContext } from '../firebase'
import useAuth from './../hooks/useAuth';
import MessageList from './../components/MessageList';
const App = () => {
  const user = useAuth()
  // console.log('user', user);
  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <div className='app'>
        <h1>Twitcoders</h1>
        <Header />
        <CreateMessage />
        {/* < Messages /> */}
        <MessageList />
      </div>
    </FirebaseContext.Provider>
  )
}

export default App
