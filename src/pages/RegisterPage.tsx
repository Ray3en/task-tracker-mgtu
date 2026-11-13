import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import z from "zod";

function RegisterPage() {

    const loginSchema = z.object({
        login: z.string().trim().email("Введите корректный email"),
        password: z.string().min(8, "Минимум 8 символов"),
        secondPassword: z.string(),
    }).refine(data => data.password === data.secondPassword, {
        path: ["secondPassword"],
        message: "Пароли не совпадают",
    });

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Регистрация</h2>
            <div>
                <label htmlFor="login">Логин</label>
                <input id="login" {...register('login')} />
                {errors['login'] && <p style={{ color: 'red' }}>{errors['login'].message}</p>}
            </div>
            <div>
                <label htmlFor="password">Пароль</label>
                <input type="password" id="password" {...register('password')} />
                {errors['password'] && <p style={{ color: 'red' }}>{errors['password'].message}</p>}
            </div>
            <div>
                <label htmlFor="password">Пвторите Пароль</label>
                <input type="password" id="password" {...register('secondPassword')} />
                {errors['secondPassword'] && <p style={{ color: 'red' }}>{errors['secondPassword'].message}</p>}
            </div>
            <div>
                <button type="submit">Отправить</button>
            </div>
        </form>
    )
}

export default RegisterPage