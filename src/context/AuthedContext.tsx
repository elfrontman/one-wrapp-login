import { User } from "@codetrix-studio/capacitor-google-auth";
import { createContext, Dispatch } from "react";

interface AuthDefaultContext{
    user: User | null
    storageSession: Dispatch<any>
}

export const AuthContext = createContext<AuthDefaultContext>({
    user: null,
    storageSession: () => {}
})