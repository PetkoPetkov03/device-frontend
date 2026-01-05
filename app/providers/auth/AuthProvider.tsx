import React, { useEffect, useState, type ReactElement, type ReactNode } from 'react'
import * as z from "zod"
import type { userSchema } from '~/lib/schemas/authschemas'

type AuthContextType = {
    user: z.infer<typeof userSchema> | null,
    token: string | null,
    isAuthorized: boolean,
    isAuthenticated: boolean,
    login: (user: z.infer<typeof userSchema>, token: string) => void,
    logout: () => void
}

const defaultContext: AuthContextType = {user: null, token: null, isAuthenticated: false, isAuthorized: false, login: () => {}, logout: () => {}};
export const AuthContext = React.createContext(defaultContext);

type AuthChildren = {
    children: ReactNode
}

const AuthProvider = ({ children }: AuthChildren) => {
    const [user, setUser] = useState<z.infer<typeof userSchema>|null>({});
    const [token, setToken] = useState<string|null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

    const hasPermissions = (user: z.infer<typeof userSchema>) => {
        if(user.role === "ADMIN") {
            return true;
        }
        return false;
    }

    const login = (user: z.infer<typeof userSchema>, token: string) => {
        sessionStorage.setItem("user", JSON.stringify(user));
        cookieStore.set("token", token);
        setToken(token);
        setUser(user);
        setIsAuthenticated(true);
        setIsAuthorized(hasPermissions(user));
    }

    const logout = () => {
        sessionStorage.removeItem("user");
        cookieStore.delete("token");
        setToken(null);
        setUser(null);
        setIsAuthorized(false);
    }

    useEffect(() => {
        let item: CookieListItem|null;
        cookieStore.get("token").then((result) => {
            
            item = result
        }
        ).finally(() => {
            console.log(`TOKEN TOKEN TOKEN ${item?.value}`);
            
            setToken(item?.value!);
        });
        let cUser;
        const session = sessionStorage.getItem("user");

        if(session != null) {
            cUser = JSON.parse(session);
        }

        setUser(user);

        if (token == null || user == null) {
            setIsAuthorized(false);
            setIsAuthenticated(false);
        }else {
            setIsAuthenticated(true);
            setIsAuthorized(hasPermissions(user))
        }
    }, []);
  return (
    <AuthContext.Provider value={{user, token, isAuthorized, isAuthenticated, login, logout}}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider