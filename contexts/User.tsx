import React from "react";
import { User } from "firebase/auth";

export const UserContext = React.createContext<User | null>(null);

export default UserContext;
