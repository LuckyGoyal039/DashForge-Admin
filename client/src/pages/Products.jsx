import Header from "../components/Header";
import {
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  useTheme,
  Rating,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { useGetProductsQuery } from "../state/api";
import { useState } from "react";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography varient="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography varient="body2">{description}</Typography>
      </CardContent>

      <CardActions>
        <Button
          varient="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>Product Id: {_id}</Typography>
          <Typography>Supply left: {supply}</Typography>
          <Typography>
            Yearly sales this year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yeary sold units this year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  console.log("data", data);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subTitle="See you list of products" />
      {data ? (
        <>
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(4, 1fr)"
            justifyContent="space-between"
            rowGap="20px"
            columnGap="1.33%"
            sx={{ "&>div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
          >
            {data.map((ele) => {
              return (
                <Product
                  key={ele._id}
                  _id={ele._id}
                  name={ele.name}
                  description={ele.description}
                  price={ele.price}
                  rating={ele.rating}
                  category={ele.category}
                  supply={ele.supply}
                  stat={ele.stat[0]}
                />
              );
            })}
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
          flexDirection="column"
        >
          <CircularProgress />
          <p>Loading...</p>
        </Box>
      )}
    </Box>
  );
};

export default Products;
