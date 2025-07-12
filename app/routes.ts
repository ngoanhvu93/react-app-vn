import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./home/home.tsx"),
  route("about", "./about/about.tsx"),
  route("weather", "./weather/weather.tsx"),
  route("thiep-cuoi/:slug", "./wedding-invitation/wedding-invitation.tsx"),
] satisfies RouteConfig;
