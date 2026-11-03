import { Outlet } from "react-router";

function AuthLayout() {
    return (
        <>
            <h1>Auth</h1>
            <Outlet />
        </>
    );
}

export default AuthLayout