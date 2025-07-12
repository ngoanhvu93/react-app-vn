import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./home/home.tsx"),
  route("about", "./about/about.tsx"),
  route("weather", "./weather/weather.tsx"),
] satisfies RouteConfig;
