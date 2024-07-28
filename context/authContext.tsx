import { Children, createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateCurrentUser, User} from 'firebase/auth'
import {doc, getDoc, setDoc, updateDoc} from 'firebase/firestore'
import { auth, db } from '../firebaseConfig'

export const AuthContext = createContext<
{
    user:User|null, 
    isAuthenticated:boolean|undefined, 
    login:(email: string, password: string) => Promise<{success:boolean, msg?:string}>, 
    register:(email:string, password:string, username:string)=>Promise<{success:boolean, msg?:string, data?:User}>, 
    editProfile:(email:string, password:string, username:string)=>Promise<{success:boolean, msg?:string|undefined, data?:User|null}>, 
    logout:()=>{} 
}|null>(null);

export const AuthContextProvider = ({children}:any) => {
    const [user, setUser] = useState<User|null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean|undefined>(undefined);

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            if (user) {
                setIsAuthenticated(true)
                setUser(user)
            } else {
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return unsub;
        // // onAuthStateChanged
        // setTimeout(() => {
        //     setIsAuthenticated(false);
        // }, 3000)
    }, [])

    const login = async (email:string, password:string) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return {success: true}

        } catch(e:any) {
            let msg = e.message
            if (msg.includes('(auth/invalid-email)')) msg="Invalid Email"
            if (msg.includes('(auth/email-already-in-use)')) msg="This email is already in use."
            return {success: false, msg}

        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            return {success: true};
        } catch(e:any) {
            return {success: false, msg: e.message, error:e}
        }
    }

    const register = async (email:string, password:string, username:string) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user - ', response.user)

            await setDoc(doc(db, "users", response.user.uid), {
                username,
                userId: response.user.uid
            })
            return {success: true, data: response.user}
        } catch(e:any) {
            let msg = e.message
            if (msg.includes('(auth/invalid-email)')) msg="Invalid Email"
            if (msg.includes('(auth/email-already-in-use)')) msg="This email is already in use."
            return {success: false, msg}
            
        }
    }

    const editProfile = async (email?:string, password?:string, username?:string) => {
        try {
            
            await updateDoc(doc(db, "users", email), {
                email: true,
            })
            return {success: true, data: user}
        } catch(e:any) {
            let msg = e.message
            // if (msg.includes('(auth/invalid-email)')) msg="Invalid Email"
            // if (msg.includes('(auth/email-already-in-use)')) msg="This email is already in use."
            return {success: false, msg}
            
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, register, logout, editProfile }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('useAuth must be wrapped inside AuthContext Provider')
    }

    return value
}