import { ReactNode } from "react";

export interface tabType {
    children?: ReactNode;
    tabsArray: Array<string>;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    handleChange: (event: React.SyntheticEvent, newValue: string) => void;
    disabled?: boolean;
}