import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("auth", [
        index("routes/register.tsx"),
        route("/login","routes/login.tsx")
    ]),
] satisfies RouteConfig;
