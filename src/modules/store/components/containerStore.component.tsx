import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Pagination as MyPagination } from "@mui/material";
import React from "react";
import CardComponent from "../../shared/card/card.component";
import { useAppDispatch } from "../../../store/store";
import {
  Categories,
  CategoriesById,
} from "../../../store/modules/store/actions/store.actions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "./containerStore.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  selectArrayCategories,
  selectCategoriesLoading,
} from "../../../store/modules/store/selectors/store.selector";
import { useSelector } from "react-redux";
import { hudsonNYFontStyle, weblysleekFontStyle } from "../../shared/recursiveStyles/RecursiveStyles";
import { storeActions } from "../../../store/modules/store/store.slice";
import { useNavigate } from "react-router";
import { Product } from "../types";
import { productExchange } from "../../exchangeProducts/types";
import { CurrencyFormat } from "../../../utils/helpers";
import { useLocation } from 'react-router-dom';

const cardStyle = {
  padding: '20px',
  borderRadius: '10px',
  height: '452px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor:"pointer"
}

const ContainerStore = () => {

  const location = useLocation();

  const [search, setSearch] = React.useState<string>("Menor Precio");
  const [categories, setCategories] = React.useState<any>([]);
  const [categorySelected, setCategorySelected] = React.useState<any>({});
  const [products, setProducts] = React.useState<any>([]);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loadingStatus = useSelector(selectCategoriesLoading);
  const categoriesDataredux = useSelector(selectArrayCategories);

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

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    handleCategory(categorySelected.id, value);
  };

  const handleCategory = async (id: number, page: number) => {
    const categoriesById = await dispatch(
      CategoriesById({ id, page })
    ).unwrap();
    setTotalPage(categoriesById.response.data.last_page);
    setProducts(categoriesById.response.data.data);
    filterCategory(id);
  };

  const filterCategory = (id: number) => {
    if (categories.length > 0) {
      const categoryfilter = categories.filter((category: any) => {
        return category.id === id;
      });
      setCategorySelected(categoryfilter[0]);
    }
  };

  const handleProduct = (product:Product) => {
    const mappedProduct: productExchange = {
      id: product.id,
      quantity: product.store.quantity,
      points: product.store.points || 0,
      price: product.store.price,
      status: product.store.status,
      start_date: product.store.start_date || "",
      end_date: product?.store?.end_date || "",
      isExchange: false,
      product_id: product.store.id,
      features: product.store.features_string,
      product: {
        id: product.store.id,
        name: product.name,
        serial: product.serial,
        lot: product.lot,
        image: product.image,
        quantity: product.store.quantity,
        points: product.store.points || undefined,
        description: product.description,
        category_id: product.category_id,
        created_at: product.created_at,
        updated_at: product.updated_at,
        deleted_at: product.deleted_at,
        presentation: product.store.presentation,
        discount: product.store.discount
      }
    }
      dispatch(storeActions.setProductDetail(mappedProduct))
      navigate("/product-detail")
  }

  React.useEffect(() => {
   
    async function getCategories() {
      const categories = await dispatch(Categories()).unwrap();
      setCategories(categories.response.data);

      if(location && location.state){
        const {id} = location.state.categoryId;
        const categoryfilter = categories.response.data.filter((category: any) => {
          return category.id === id;
        });
        setCategorySelected(categoryfilter[0]);
        handleCategory(id, 1);
      }else{
        setCategorySelected(categories.response.data[0]);
        handleCategory(1, 1);
      }
    }
    getCategories();
  }, []);


  return (
    <>
      <Grid
        className="columnContainer"
        container
        spacing={2}
        style={{
          // padding: "30px 5%",
        }}
      >
        {/* CATEGORY SECTION */}
        <Grid
          item
          xs={12}
          style={{ textAlign: "center", marginBottom: "-60px" }}
        >
          <Typography style={storeStyles.category}>
            EXPLORA NUESTRAS CATEGORIAS
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {/* {categories?.length > 0 && ( */}
          {categoriesDataredux?.length > 0 && (
            <Swiper
              style={{ padding: "25px 30px" }}
              modules={[Navigation, Pagination]}
              navigation={{
                enabled: true,
              }}
              loop={true}
              spaceBetween={2}
              slidesPerView={7}
            >
              {categoriesDataredux?.map((item: any, index: any) => {
                return (
                  <SwiperSlide
                    key={index}
                    style={{
                      textAlign: "center",
                      padding: "0 20px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleCategory(item.id, 1)}
                  >
                    {loadingStatus === "loading" ? (
                      <Skeleton
                        sx={{
                          width: "100px",
                          height: "100px",
                          margin: "auto 0 auto 0",
                          borderRadius: "50%",
                        }}
                        variant="rectangular"
                      />
                    ) : (
                      <>
                        <img
                          height={"100px"}
                          src={`${item.image}`}
                          alt=""
                          style={storeStyles.img}
                        />
                        <Typography
                          style={
                            item.id === categorySelected.id
                              ? {
                                  ...storeStyles.categorySubtitle,
                                  borderBottom: "3px solid rgb(153, 121, 28)",
                                  height: "30px"
                                }
                              : { ...storeStyles.categorySubtitle }
                          }
                        >
                          {item.name}
                        </Typography>
                      </>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </Grid>
        {/* FILTER SECTION */}
        <Grid item xs={6}></Grid>
        <Grid
          item
          xs={6}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Typography style={storeStyles.search.label}>Ordenar por:</Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              style={storeStyles.search.select}
              value={search}
              label="search"
              onChange={handleChange}
              name="search"
            >
              {searchOptions.map((item, index) => {
                return <MenuItem value={item} key={index}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        {/* BANNER SECTION */}
        <Grid item xs={12}>
          <img
            src={categories.length > 0 && categorySelected.banner}
            alt=""
            style={{
              borderRadius: "20px",
              maxHeight: "300px",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography style={storeStyles.category}>
            {categorySelected.name}
          </Typography>
        </Grid>
        {/* PRODUCTS SECTION */}
        <Grid container spacing={2}>
          {products.map((item: any) => {
            return (
              <Grid item xs={2.4} style={{ textAlign: "center" }} onClick={() => handleProduct(item)}>
                 {item.store.discount > 0 && (
                    <div className="promotion">
                      <p>{item.store.discount}</p>
                      <p>%  off</p>
                      <img src="icons/discount.png" alt="" width={50}/>
                    </div>
                  )}
                <CardComponent
                  style={cardStyle}
                >
                  <img src={item.image} alt="" width={200} height={200}  style={{maxWidth: "100%"}}/>
                  <Typography style={storeStyles.card.title}>
                    {item.name}
                  </Typography>
                  <Typography style={storeStyles.card.subtitle}>
                    {item.store.presentation}
                  </Typography>
                  <Typography style={storeStyles.card.content}>
                    {item.description.slice(0, 50)}
                  </Typography>
                  <Typography style={storeStyles.card.price}>
                    {CurrencyFormat(item.store.price)}
                  </Typography>
                </CardComponent>
              </Grid>
            );
          })}
        </Grid>
        <Stack spacing={2} style={{ margin: "auto", padding: "30px 0" }}>
          <MyPagination
            count={totalPage}
            page={page}
            onChange={handleChangePagination}
          />
        </Stack>
      </Grid>
    </>
  );
};

export default ContainerStore;

//assign 0.64 % down
const storeStyles = {
  img: {
    border: "1px solid",
    borderRadius: "50%",
  },
  category: {
    ...hudsonNYFontStyle,
    fontSize: "32px",
    padding: "30px 0",
  },
  categorySubtitle: {
    ...hudsonNYFontStyle,
    fontSize: "16px",
  },
  card: {
    img: {},
    title: {
      ...weblysleekFontStyle,
      fontSize: "19px",
      fontWeight: "600",
      height: "70px",
      marginTop: "10px"
    },
    subtitle: {
      ...weblysleekFontStyle,
      fontSize: "16px",
    },
    content: {
      ...weblysleekFontStyle,
      fontSize: "16px",
      fontWeight: "300",
      paddingTop: "0px",
    },
    price: {
      ...hudsonNYFontStyle,
      fontSize: "25px",
      padding: "20px 0 0 0",
    },
  },
  search: {
    label: {
      ...weblysleekFontStyle,
      fontSize: "23px",
    },
    select: {
      ...weblysleekFontStyle,
      fontSize: "23px",
      marginTop: "-10px",
      borderBottom: "none",
    },
  },
};
