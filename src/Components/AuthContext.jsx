import {createContext, useState, useEffect} from "react";
const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(() =>{
        const savedUser = localStorage.getItem("user");
        return savedUser? JSON.parse(savedUser) :null
    })
    const [showModal, setShowModal] = useState(false);

    useEffect(() =>{
    if(user){
        localStorage.setItem("user", JSON.stringify(user))
    }else{
        localStorage.removeItem("user")
    }
    }, [user])

    const login = (userData) =>{
        setUser(userData);
        closeModal();
    }
    const logout = () =>{
        setUser(null);
    }
    const openModal = () =>{
        setShowModal(true);
    }
    const closeModal = () =>{
        setShowModal(false);
    }

    return(
        <AuthContext.Provider value={{user,login,logout,openModal,closeModal,showModal}}>
            {children}
        </AuthContext.Provider>
       
    )
    
    
}
export default AuthContext;