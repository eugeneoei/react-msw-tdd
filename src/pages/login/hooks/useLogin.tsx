import { useEffect, useState } from "react"
import { UserProfile } from '../../../interfaces/userProfile'
// import { ILoginForm } from "../Login"

// interface IUseLogin {
//     email?: string
//     password?: string
// }

interface IUseLoginResponse {
    user: UserProfile | undefined
    login: (email: string, password: string) => void
    isLoginLoading: boolean
    loginError: string | undefined
}

const useLogin = () : IUseLoginResponse => {
    const [isLoginLoading, setIsLoginLoading] = useState(false)
    const [loginError] = useState<string | undefined>(undefined)
    const [user, setUser] = useState<UserProfile | undefined>(undefined)

    const login = async (email: string, password: string) => {
        console.log('useLogin hook loggin in function')
        setIsLoginLoading(true)
    }

    // useEffect(() => {
    //     login()
    // }, [email, password])

    return { user, login, isLoginLoading, loginError }
}

export { useLogin }

