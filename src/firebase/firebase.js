import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './Config'

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)
        this.auth = app.auth()
        this.facebookProvider = new app.auth.FacebookAuthProvider()
        this.githubProvider = new app.auth.GithubAuthProvider()
        this.twitterProdider = new app.auth.TwitterAuthProvider()
        this.googleProvider = new app.auth.GoogleAuthProvider()
        this.db = app.firestore()
    }
    login = async provider => {
        await this.auth.signInWithPopup(this[`${provider}Provider`]).then((result) => {
            console.log('firebase connection', result);
        })
        //pour accéder à une variable dans un objet on met entre [] au lieu du .
    }
    logout = async () => {
        await this.auth.signOut()
    }

}
const firebase = new Firebase()
export default firebase