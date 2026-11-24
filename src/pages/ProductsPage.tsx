import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { getProducts } from "../api/products.api";
import { baseUrl } from "../api/apiClient";

function ProductsPage() {

  const { data, isPending, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
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

      <Button component={Link} to="/products/create" variant="contained" sx={{ mb: 2 }}>
        Добавить товар
      </Button>

      <Grid container spacing={1.5}>
        {data.items.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant="outlined">
              <CardMedia
                component="img"
                height="120"
                image={`${baseUrl}${product.image}`}
                alt={product.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ p: 1.5 }}>
                <Typography variant="subtitle1">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.discountPrice ?? product.price} ₽
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 1.5, pt: 0 }}>
                <Button
                  size="small"
                  component={Link}
                  to={`/product/${product.id}`}
                >
                  Подробнее
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* <Stack alignItems="center" sx={{ mt: 3 }}>

      </Stack> */}
    </Container>
  );
}

export default ProductsPage;
