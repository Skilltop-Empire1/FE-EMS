import { createContext } from "react";

const AuthContext = createContext()

const AuthProvider =({children})=>{

return(
    <AuthProvider>
{children}
    </AuthProvider>
)
}