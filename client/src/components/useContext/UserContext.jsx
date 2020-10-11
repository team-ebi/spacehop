import { createContext } from "react";
import { Auth as currentUser } from "aws-amplify";

export const UserContext = createContext(currentUser);
