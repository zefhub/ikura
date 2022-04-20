import React from "react";

export type User = { id: string };

export const UserContext = React.createContext<User | null>(null);

export default UserContext;
