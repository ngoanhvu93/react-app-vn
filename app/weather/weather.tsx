import { Suspense } from "react";
import AppleWeather from "./components/AppleWeather";

export function meta() {
  return [
    { title: "Thời tiết" },
    {
      name: "description",
      content: "Thời tiết - Dự báo thời tiết hôm nay và ngày mai",
    },
    {
      name: "og:image",
      content:
        "https://cdn.thuvienphapluat.vn/uploads/tintuc/2025/05/08/du-bao-thoi-tiet-tphcm.jpg",
    },
  ];
}

export default function WeatherPage() {
  return (
    <div className="w-full flex flex-col mx-auto">
      <AppleWeather />
    </div>
  );
}
