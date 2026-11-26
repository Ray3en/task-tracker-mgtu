import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Link, useSearchParams } from "react-router";
import { getProducts } from "../api/products.api";
import { baseUrl } from "../api/apiClient";

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");

  const stepPageHandle = (newValue: number) => {
    setSearchParams({
      page: String(newValue),
    });
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts({page, limit: 5}),
  });

  if (isPending) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (isError)
    return <Alert severity="error">Не удалось загрузить товары</Alert>;

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Товары
      </Typography>

      <Button
        component={Link}
        to="/products/create"
        variant="contained"
        sx={{ mb: 2 }}
      >
        Добавить товар
      </Button>

      <Paper variant="outlined">
        <List disablePadding sx={{ display: "block" }}>
          {data.items.map((product) => (
            <Box key={product.id}>
              <ListItem
                secondaryAction={
                  <Button component={Link} to={`/product/${product.id}`}>
                    Подробнее
                  </Button>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={`${baseUrl}${product.image}`}
                    alt={product.name}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={`${product.discountPrice ?? product.price} ₽`}
                />
              </ListItem>
              <Divider />
            </Box>
          ))}
          <List>
            <Button onClick={() => stepPageHandle(page + 1)}>
              Click
            </Button>
          </List>
        </List>
      </Paper>
    </Container>
  );
}

export default ProductsPage;
