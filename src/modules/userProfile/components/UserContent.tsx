import { useState } from "react";
import { TabPanel } from "@mui/lab";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { selectAllUser } from "../../../store/modules/users";

// Custom components
import TabComponent from "../../shared/tabComponent/TabComponent";

// Material UI component
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import UserInfo from "./UserInfo";

const UserContent = () => {

    const [value, setValue] = useState<string>("1");
    const [disabled, setDisabled] = useState<boolean>(false);

    const {
        register,
        formState: { errors, isValid },
        reset,
        getValues,
      } = useForm({
        mode: "onChange",
      });

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        setTimeout(() => {
          setDisabled(false);
        }, 2000);
        setDisabled(true);    
    };

    return (
        <Box sx={styles.contentContainer}>
            <TabComponent
                tabsArray={["INFORMACIÓN", "MÉTODOS DE PAGO", "DIRECCIONES"]}
                // tabsArray={}
                value={value}
                setValue={setValue}
                handleChange={handleChange}
                disabled={disabled}
            >
                <TabPanel sx={{padding: 0}} value="1">
                    <UserInfo />
                </TabPanel>
            </TabComponent>
            <Button sx={{margin: '50px 0 0 0', fontFamily: 'HudsonNYSerif'}} variant="outlined" fullWidth color="inherit">Editar</Button>
        </Box>
    );

}

const styles = {
    contentContainer: {
        margin: '90px auto',
        width: '60%',
        input: {
            '& input:disabled': {
              borderBottomStyle: 'solid', // Cambiar el estilo a sólido
            },
        }
    }
}

export default UserContent;