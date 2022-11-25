import { AppDataBase } from "../db/database";
import { createContext, Dispatch } from "react";

interface DatabaseDefaultContext{
    db: AppDataBase | null
}

export const DatabaseContext = createContext<DatabaseDefaultContext>({
    db: null,
})