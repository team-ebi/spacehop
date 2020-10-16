import { createContext } from "react";
import moment from "moment";

export const LocationContext = createContext("");
export const DateContext = createContext(moment().format());
export const StartTimeContext = createContext(moment().format());
export const EndTimeContext = createContext(moment().format());
