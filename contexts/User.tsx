import React from "react";
import { User as FirebaseUser } from "firebase/auth";

export type User = FirebaseUser & { id: string };

export const UserContext = React.createContext<User | null>(null);

export default UserContext;
