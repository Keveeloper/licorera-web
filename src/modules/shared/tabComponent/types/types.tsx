export type tabType = {
    handleChange: (event: React.SyntheticEvent, newValue: string) => void;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}