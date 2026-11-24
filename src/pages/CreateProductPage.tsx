import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { createProduct } from "../api/products.api";

const productSchema = z.object({
  name: z.string().trim().min(1, "Введите название"),
  price: z
    .number({ error: "Введите цену числом" })
    .min(1, "Цена должна быть не меньше 1"),
  description: z.string().trim().min(1, "Введите описание"),
});

type ProductFormValues = z.infer<typeof productSchema>;

function CreateProductPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 1,
      description: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/products");
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    createMutation.mutate(data);
  };

  const submitError =
    isAxiosError(createMutation.error) &&
    typeof createMutation.error.response?.data?.message === "string"
      ? createMutation.error.response.data.message
      : "Не удалось создать товар";

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Новый товар
      </Typography>

      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2} noValidate>
        {createMutation.isError && <Alert severity="error">{submitError}</Alert>}

        <TextField
          label="Название"
          {...register("name")}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
        />

        <TextField
          label="Цена"
          type="number"
          {...register("price", { valueAsNumber: true })}
          error={Boolean(errors.price)}
          helperText={errors.price?.message}
        />

        <TextField
          label="Описание"
          multiline
          rows={4}
          {...register("description")}
          error={Boolean(errors.description)}
          helperText={errors.description?.message}
        />

        <Button type="submit" variant="contained" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Создание..." : "Создать товар"}
        </Button>
      </Stack>
    </Container>
  );
}

export default CreateProductPage;
