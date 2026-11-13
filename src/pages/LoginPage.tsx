import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import z from "zod";

function LoginPage() {

    const loginSchema = z.object({
        login: z.string().trim().email("Введите корректный email"),
        password: z.string().min(8, "Минимум 8 символов"),
    })
    type LoginValues = z.infer<typeof loginSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = (data: LoginValues) => {
        console.log(data)
        reset()
    }


    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField label="Email" type="email" fullWidth
                {...register("login")}
                error={Boolean(errors.login)}
                helperText={errors.login?.message} />

            <TextField label="Пароль" type="password" fullWidth
                {...register("password")}
                error={Boolean(errors.password)}
                helperText={errors.password?.message} />

            <Button type="submit" variant="contained">Войти</Button>
        </Box>
    )
}

export default LoginPage