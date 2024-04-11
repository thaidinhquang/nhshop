/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react"
import { useLocalStorage } from "../hooks/useStorage"
import useHookQuery from "../hooks/useHookQuery"

export const UserContext = createContext({} as any)
const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentID, setCurrentID, removeCurrentID] = useLocalStorage('currentID', "")
    const { data: user, isLoading } = useHookQuery({ path: 'users', id: currentID, mustHaveID: true, active: true})
    if (isLoading) return <div>Loading...</div>
    return (
        <div>
            <UserContext.Provider value={{ user, setCurrentID, removeCurrentID }}>
                {children}
            </UserContext.Provider>
        </div>
    )
}

export default UserContextProvider