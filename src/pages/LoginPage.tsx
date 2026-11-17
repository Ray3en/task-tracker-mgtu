import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Link as MuiLink, Paper, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import z from "zod";

const loginSchema = z.object({
    email: z.string().trim().min(1, "Введите email").email("Введите корректный email"),
    password: z.string().min(1, "Введите пароль").min(8, "Минимум 8 символов"),
});

type LoginValues = z.infer<typeof loginSchema>;

function LoginPage() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
        mode: "onTouched",
    })

    const onSubmit = (data: LoginValues) => {
        console.log(data)
        reset()
    }


    return (
        <Paper elevation={8} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
            <Stack spacing={1} sx={{ mb: 3, textAlign: "center" }}>
                <Typography component="h1" variant="h4" fontWeight={700}>Вход</Typography>
                <Typography color="text.secondary">Войдите в свой аккаунт</Typography>
            </Stack>

            <Stack component="form" onSubmit={handleSubmit(onSubmit)} noValidate spacing={2.5}>
                <TextField label="Email" type="email" autoComplete="email" autoFocus fullWidth
                    {...register("email")}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message ?? " "} />

                <TextField label="Пароль" type="password" autoComplete="current-password" fullWidth
                    {...register("password")}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message ?? "Минимум 8 символов"} />

                <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>Войти</Button>

                <Typography variant="body2" textAlign="center" color="text.secondary">
                    Нет аккаунта?{" "}
                    <MuiLink component={Link} to="/register" underline="hover" fontWeight={600}>
                        Зарегистрироваться
                    </MuiLink>
                </Typography>
            </Stack>
        </Paper>
    )
}

export default LoginPage
