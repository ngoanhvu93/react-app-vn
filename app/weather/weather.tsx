import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function meta() {
  return [
    { title: "Thời tiết" },
    {
      name: "description",
      content: "Thông tin thời tiết cập nhật theo thời gian thực",
    },
    {
      name: "og:image",
      content:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMasHYe5Ymq5Dd534mJcvRWsORBJVLJ9UnWA&s",
    },
  ];
}

interface WeatherData {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    surface_pressure: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  current_units: {
    temperature_2m: string;
    apparent_temperature: string;
    relative_humidity_2m: string;
    surface_pressure: string;
    wind_speed_10m: string;
  };
  cityInfo?: {
    name: string;
    country: string;
  };
}

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("Ho Chi Minh");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sử dụng OpenMeteo API - miễn phí và không cần API key
  const API_URL = "https://api.open-meteo.com/v1/forecast";

  // Xử lý cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hàm cuộn lên đầu
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError("");

    try {
      // Đầu tiên, lấy tọa độ của thành phố
      const geocodingResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          cityName
        )}&count=1&language=vi&format=json`
      );

      if (!geocodingResponse.ok) {
        throw new Error("Không thể tìm thấy thành phố");
      }

      const geocodingData = await geocodingResponse.json();

      if (!geocodingData.results || geocodingData.results.length === 0) {
        throw new Error("Không tìm thấy thành phố này");
      }

      const { latitude, longitude, name, country } = geocodingData.results[0];

      // Sau đó, lấy thông tin thời tiết
      const weatherResponse = await fetch(
        `${API_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,surface_pressure,wind_speed_10m,weather_code&timezone=auto`
      );

      if (!weatherResponse.ok) {
        throw new Error("Không thể lấy thông tin thời tiết");
      }

      const weatherData = await weatherResponse.json();

      // Thêm thông tin thành phố vào dữ liệu thời tiết
      const enrichedData = {
        ...weatherData,
        cityInfo: { name, country },
      };

      setWeather(enrichedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const getWeatherIcon = (weatherCode: number) => {
    // Mã thời tiết WMO (World Meteorological Organization)
    const weatherIcons: { [key: number]: string } = {
      0: "☀️", // Trời quang
      1: "🌤️", // Chủ yếu quang
      2: "⛅", // Một phần có mây
      3: "☁️", // U ám
      45: "🌫️", // Sương mù
      48: "🌫️", // Sương mù đóng băng
      51: "🌧️", // Mưa phùn nhẹ
      53: "🌧️", // Mưa phùn vừa
      55: "🌧️", // Mưa phùn mạnh
      56: "🌨️", // Mưa phùn đóng băng nhẹ
      57: "🌨️", // Mưa phùn đóng băng mạnh
      61: "🌧️", // Mưa nhẹ
      63: "🌧️", // Mưa vừa
      65: "🌧️", // Mưa mạnh
      66: "🌨️", // Mưa đóng băng nhẹ
      67: "🌨️", // Mưa đóng băng mạnh
      71: "🌨️", // Tuyết nhẹ
      73: "🌨️", // Tuyết vừa
      75: "🌨️", // Tuyết mạnh
      77: "🌨️", // Hạt tuyết
      80: "🌧️", // Mưa rào nhẹ
      81: "🌧️", // Mưa rào vừa
      82: "🌧️", // Mưa rào mạnh
      85: "🌨️", // Mưa tuyết nhẹ
      86: "🌨️", // Mưa tuyết mạnh
      95: "⛈️", // Giông bão
      96: "⛈️", // Giông bão với mưa đá nhẹ
      99: "⛈️", // Giông bão với mưa đá mạnh
    };
    return weatherIcons[weatherCode] || "🌤️";
  };

  const getWeatherDescription = (weatherCode: number) => {
    const descriptions: { [key: number]: string } = {
      0: "Trời quang",
      1: "Chủ yếu quang",
      2: "Một phần có mây",
      3: "U ám",
      45: "Sương mù",
      48: "Sương mù đóng băng",
      51: "Mưa phùn nhẹ",
      53: "Mưa phùn vừa",
      55: "Mưa phùn mạnh",
      56: "Mưa phùn đóng băng nhẹ",
      57: "Mưa phùn đóng băng mạnh",
      61: "Mưa nhẹ",
      63: "Mưa vừa",
      65: "Mưa mạnh",
      66: "Mưa đóng băng nhẹ",
      67: "Mưa đóng băng mạnh",
      71: "Tuyết nhẹ",
      73: "Tuyết vừa",
      75: "Tuyết mạnh",
      77: "Hạt tuyết",
      80: "Mưa rào nhẹ",
      81: "Mưa rào vừa",
      82: "Mưa rào mạnh",
      85: "Mưa tuyết nhẹ",
      86: "Mưa tuyết mạnh",
      95: "Giông bão",
      96: "Giông bão với mưa đá nhẹ",
      99: "Giông bão với mưa đá mạnh",
    };
    return descriptions[weatherCode] || "Không xác định";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          🌤️ Thông Tin Thời Tiết
        </h1>

        {/* Form tìm kiếm */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Nhập tên thành phố..."
              className="flex-1 px-4 py-2 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:border-white/40"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Đang tải..." : "Tìm kiếm"}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-white mt-2">Đang tải thông tin thời tiết...</p>
          </div>
        )}

        {weather && !loading && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                {weather.cityInfo?.name}, {weather.cityInfo?.country}
              </h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-6xl">
                  {getWeatherIcon(weather.current.weather_code)}
                </div>
                <div>
                  <p className="text-4xl font-bold">
                    {Math.round(weather.current.temperature_2m)}°C
                  </p>
                  <p className="text-lg opacity-90">
                    {getWeatherDescription(weather.current.weather_code)}
                  </p>
                </div>
              </div>
              <p className="text-lg opacity-80">
                Cảm giác như {Math.round(weather.current.apparent_temperature)}
                °C
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-2xl mb-2">💨</div>
                <h3 className="font-semibold mb-2">Gió</h3>
                <p className="text-2xl font-bold">
                  {Math.round(weather.current.wind_speed_10m)} km/h
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-2xl mb-2">💧</div>
                <h3 className="font-semibold mb-2">Độ ẩm</h3>
                <p className="text-2xl font-bold">
                  {weather.current.relative_humidity_2m}%
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold mb-2">Áp suất</h3>
                <p className="text-2xl font-bold">
                  {Math.round(weather.current.surface_pressure)} hPa
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Thông tin về API */}
        <div className="mt-8 text-center text-white/80">
          <p className="mb-2">
            💡 <strong>Thông tin:</strong> Ứng dụng sử dụng OpenMeteo API - miễn
            phí và không cần đăng ký!
          </p>
          <p className="text-sm">
            Dữ liệu thời tiết được cung cấp bởi{" "}
            <a
              href="https://open-meteo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              OpenMeteo
            </a>
          </p>
        </div>
      </div>

      {/* Nút cuộn lên đầu */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-lg rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 hover:scale-110 shadow-lg border border-white/20 z-50"
          aria-label="Cuộn lên đầu"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}
