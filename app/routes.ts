import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("auth", [
        index("routes/auth/register.tsx"),
        route("/login","routes/auth/login.tsx"),
        route("/logout", "routes/auth/logout.tsx")
    ]),
] satisfies RouteConfig;
