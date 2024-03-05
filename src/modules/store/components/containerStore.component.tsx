import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import CardComponent from "../../shared/card/card.component";
import { useAppDispatch } from "../../../store/store";
import { Categories } from "../../../store/modules/store/actions/store.actions";

const ContainerStore = () => {
  const [search, setSearch] = React.useState<string>("Menor Precio");
  const dispatch = useAppDispatch();

  const searchOptions = [
    "Menor Precio",
    "Mayor Precio",
    "Alfabéticamente",
    "Recomendados",
    "Popularidad",
  ];

  const handleChange = (event: any) => {
    setSearch(event.target.value);
  };

  React.useEffect(() =>{
    async function getCategories(){
      const categories = await dispatch(Categories).unwrap()
      console.log(categories);
      
    }
    getCategories()
  },[])

  return (
    <>
      <Grid
        container
        spacing={2}
        style={{
          padding: "30px",
        }}
      >
        <Grid item xs={6}></Grid>
        <Grid
          item
          xs={6}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Typography>Ordenar por:</Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              style={{ marginTop: "-10px", borderBottom: "none" }}
              value={search}
              label="search"
              onChange={handleChange}
              name="search"
            >
              {searchOptions.map((item) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <img
            src="/images/logo-300.png"
            alt=""
            style={{
              borderRadius: "20px",
              maxHeight: "300px",
              maxWidth: "1200px",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>RONES</Typography>
        </Grid>
        <Grid container spacing={2}>
          {searchOptions.map((item) => {
            return (
              <Grid item xs={3} style={{textAlign:'center'}}>
                <CardComponent style={{ padding: "20px", borderRadius:"10px" }}>
                  <img src="/images/logo-300.png" alt="" />
                  <Typography style={storeStyles.card.title}>
                    Buchanas
                  </Typography>
                  <Typography style={storeStyles.card.subtitle}>
                    750 ml
                  </Typography>
                  <Typography style={storeStyles.card.content}>
                    Whisky Buchanans añejado por 18 años y elaborado por una
                    mezcla
                  </Typography>
                  <Typography style={storeStyles.card.price}>
                    $ 140.000
                  </Typography>
                </CardComponent>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default ContainerStore;

const storeStyles = {
  card: {
    img: {},
    title: {
      fontFamily: "weblysleekuil",
      fontSize: "25px",
      fontWeigth: "600",
      color: "#000000",
    },
    subtitle: {
      fontFamily: "weblysleekuil",
      fontSize: "20px",
      color: "#000000",
    },
    content: {
      fontFamily: "weblysleekuil",
      fontSize: "20px",
      color: "#000000",
      paddingTop:"20px"
    },
    price: {
      fontFamily: "HudsonNYSerif",
      fontSize: "30px",
      color: "#000000",
      padding:"20px 0"
    },
  },
};
