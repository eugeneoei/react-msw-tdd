import { useState } from "react"
import { UserProfile } from '../../../interfaces/userProfile'

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

    return { user, login, isLoginLoading, loginError }
}

export { useLogin }

