import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Link as MuiLink, Paper, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import z from "zod";

const registerSchema = z.object({
        email: z.string().trim().min(1, "Введите email").email("Введите корректный email"),
        password: z.string().min(8, "Минимум 8 символов"),
        confirmPassword: z.string().min(1, "Повторите пароль"),
    }).refine(data => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Пароли не совпадают",
    });

type RegisterValues = z.infer<typeof registerSchema>;

function RegisterPage() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { email: "", password: "", confirmPassword: "" },
        mode: "onTouched",
    })

    const onSubmit = (data: RegisterValues) => {
        console.log(data)
        reset()
    }


    return (
        <Paper elevation={8} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
            <Stack spacing={1} sx={{ mb: 3, textAlign: "center" }}>
                <Typography component="h1" variant="h4" fontWeight={700}>Регистрация</Typography>
                <Typography color="text.secondary">Создайте новый аккаунт</Typography>
            </Stack>

            <Stack component="form" onSubmit={handleSubmit(onSubmit)} noValidate spacing={2.5}>
                <TextField label="Email" type="email" autoComplete="email" autoFocus fullWidth
                    {...register("email")}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message ?? " "} />

                <TextField label="Пароль" type="password" autoComplete="new-password" fullWidth
                    {...register("password")}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message ?? "Минимум 8 символов"} />

                <TextField label="Повторите пароль" type="password" autoComplete="new-password" fullWidth
                    {...register("confirmPassword")}
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword?.message ?? " "} />

                <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                    Создать аккаунт
                </Button>

                <Typography variant="body2" textAlign="center" color="text.secondary">
                    Уже есть аккаунт?{" "}
                    <MuiLink component={Link} to="/login" underline="hover" fontWeight={600}>Войти</MuiLink>
                </Typography>
            </Stack>
        </Paper>
    )
}

export default RegisterPage
