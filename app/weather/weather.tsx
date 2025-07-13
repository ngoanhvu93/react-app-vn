import { Suspense } from "react";
import AppleWeather from "./components/AppleWeather";

export default function WeatherPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      }
    >
      <div className="w-full flex flex-col mx-auto max-w-4xl">
        <AppleWeather />
      </div>
    </Suspense>
  );
}
