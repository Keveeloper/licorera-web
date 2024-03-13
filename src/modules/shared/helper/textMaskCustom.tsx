import React from "react";
import { IMaskInput } from "react-imask";


interface CustomInputProps{
    regex: RegExp;
    ejemplo:string
}

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    regex:RegExp;
    inputProps: CustomInputProps;
    name: string;
    mask:string;
    type:typeYear
}

export enum typeYear {
    day = 31,
    moth = 12,
    year = 18
}
  
const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, regex, type, mask, ...other } = props;

        return (
        <IMaskInput
            {...other}
            mask={mask}
            definitions={{
                '#': regex, 
            }}
            inputRef={ref}
            onAccept={(value: any) => {
                if (type === 31 && parseInt(value) > 31) {
                    value = '31';
                }
                if (type === 12 && parseInt(value) > 12) {
                    value = '12';
                }
                onChange({ target: { name: props.name, value } })
            }}
            overwrite
        />
        );
    },
);

  export default TextMaskCustom;