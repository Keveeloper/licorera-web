import { createContext } from "react";
import { SearchInterface } from "./types/types";

export const searchContext = createContext<SearchInterface>({} as SearchInterface);