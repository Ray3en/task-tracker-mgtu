import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router";
import { getProductDetail } from "../api/products.api";
import { baseUrl } from "../api/apiClient";

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: product,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetail(id!),
    enabled: Boolean(id),
  });

  if (isPending) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (isError || !product) {
    return <Alert severity="error">Не удалось загрузить товар</Alert>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
      <Button component={Link} to="/products" sx={{ mb: 3, px: 0 }}>
        ← Назад к товарам
      </Button>

      <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={`${baseUrl}${product.image}`}
            alt={product.name}
            sx={{
              display: "block",
              width: "100%",
              aspectRatio: "1 / 1",
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="overline" color="text.secondary">
                Товар №{product.id}
              </Typography>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
                {product.name}
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Описание
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                {product.description}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Цена
              </Typography>
              <Stack direction="row" spacing={2} alignItems="baseline">
                <Typography variant="h4" component="p" sx={{ fontWeight: 700 }}>
                  {product.discountPrice ?? product.price} ₽
                </Typography>
                {product.discountPrice !== null && (
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {product.price} ₽
                  </Typography>
                )}
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetailPage;
