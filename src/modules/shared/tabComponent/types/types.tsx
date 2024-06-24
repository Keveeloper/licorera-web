import { ReactNode } from "react";

export interface tabType {
    children?: ReactNode;
    tabsArray: Array<any>;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    handleChange: (event: React.SyntheticEvent, newValue: string) => void;
    disabled?: boolean;
    tabStyles?:any;
}

interface tabArrays {
    img?:string, 
    label:string
}