import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudFog,
  CloudDrizzle,
  CloudLightning,
  Wind,
  Droplets,
  Eye,
  Umbrella,
  Gauge,
  ArrowLeft,
  Search,
  MapPin,
  List,
  XCircle,
  Loader2,
  LocateFixed,
  Calendar,
} from "lucide-react";
import {
  getBackgroundOverlayForTimeOfDay,
  getTimeOfDay,
  getWeatherClasses,
  getWeatherTextColor,
  getWeatherTextSecondaryColor,
} from "~/utils/apple-weather-icons";
import {
  cloudFloatAnimation,
  rainDropAnimation,
  generateRaindrops,
  sunFloatAnimation,
  generateSnowflakes,
  snowflakeAnimation,
  lightningAnimation,
  generateFogPatches,
  fogAnimation,
} from "~/utils/weather-animations";
import {
  fetchWeatherByCoords,
  getCurrentLocationWeather,
  searchLocationsInVietnam,
  type ForecastDay,
  type LocationData,
  type WeatherData,
} from "~/utils/weather-service";

// Weather Effect Components
const SunnyEffect: React.FC = () => {
  const timeOfDay = getTimeOfDay();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className={`absolute w-40 h-40 rounded-full ${
          timeOfDay === "night" ? "bg-slate-300/30" : "bg-amber-300/70"
        } blur-3xl right-10 top-20`}
      />
      <motion.div
        className={`absolute w-14 h-14 rounded-full ${
          timeOfDay === "night" ? "bg-slate-200" : "bg-amber-400"
        } top-20 right-12 shadow-lg`}
        variants={sunFloatAnimation}
        initial="initial"
        animate="animate"
      />
    </div>
  );
};

const CloudyEffect: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/30 rounded-full blur-xl"
          style={{
            width: 60 + Math.random() * 40,
            height: 30 + Math.random() * 20,
            top: 10 + i * 30,
            left: 20 + Math.random() * 60,
          }}
          variants={cloudFloatAnimation}
          initial="initial"
          animate="animate"
          transition={{
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

const RainEffect: React.FC = () => {
  const raindrops = generateRaindrops(40);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <CloudyEffect />
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute w-0.5 bg-sky-200/80 rounded-full"
          style={{
            height: drop.height,
            left: `${drop.x}%`,
          }}
          variants={rainDropAnimation}
          initial="initial"
          animate="animate"
          transition={{
            delay: drop.delay,
            duration: drop.duration,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};

const SnowEffect: React.FC = () => {
  const snowflakes = generateSnowflakes(30);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <CloudyEffect />
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute bg-white rounded-full shadow-lg shadow-white/30"
          style={{
            width: flake.size,
            height: flake.size,
            left: `${flake.x}%`,
            top: `${flake.y}%`,
          }}
          variants={snowflakeAnimation}
          initial="initial"
          animate="animate"
          transition={{
            delay: flake.delay,
            duration: flake.duration,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};

const ThunderstormEffect: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-indigo-900/30" />
      <CloudyEffect />
      <RainEffect />
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-amber-100/70 rounded-xl"
          variants={lightningAnimation}
          initial="initial"
          animate="animate"
          transition={{
            delay: i * 3,
            repeatDelay: 10 + Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

const FogEffect: React.FC = () => {
  const fogPatches = generateFogPatches(5);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {fogPatches.map((patch) => (
        <motion.div
          key={patch.id}
          className="absolute bg-slate-200/40 rounded-full blur-xl"
          style={{
            width: patch.width,
            height: patch.height,
            top: patch.y,
          }}
          variants={fogAnimation}
          initial="initial"
          animate="animate"
          transition={{
            delay: patch.delay,
            duration: patch.duration,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};

// Weather Effect Handler
const WeatherEffect: React.FC<{ weatherIcon?: string }> = ({ weatherIcon }) => {
  switch (weatherIcon) {
    case "clear":
      return <SunnyEffect />;
    case "partly-cloudy":
      return (
        <>
          <SunnyEffect />
          <CloudyEffect />
        </>
      );
    case "cloudy":
      return <CloudyEffect />;
    case "rain":
    case "drizzle":
      return <RainEffect />;
    case "snow":
      return <SnowEffect />;
    case "thunderstorm":
      return <ThunderstormEffect />;
    case "fog":
      return <FogEffect />;
    default:
      return <CloudyEffect />;
  }
};

// Hourly Forecast Item
const HourlyForecastItem: React.FC<{
  hour: string;
  temp: number;
  icon: string;
  isNow?: boolean;
}> = ({ hour, temp, icon, isNow = false }) => {
  const renderIcon = (iconName: string, size = "w-7 h-7") => {
    switch (iconName) {
      case "clear":
        return <Sun className={`${size} text-amber-400`} />;
      case "partly-cloudy":
        return <Cloud className={`${size} text-white`} />;
      case "cloudy":
        return <Cloud className={`${size} text-white`} />;
      case "fog":
        return <CloudFog className={`${size} text-white`} />;
      case "drizzle":
        return <CloudDrizzle className={`${size} text-sky-200`} />;
      case "rain":
        return <CloudRain className={`${size} text-sky-300`} />;
      case "snow":
        return <CloudSnow className={`${size} text-white`} />;
      case "thunderstorm":
        return <CloudLightning className={`${size} text-amber-300`} />;
      default:
        return <Cloud className={`${size} text-white`} />;
    }
  };

  return (
    <motion.div
      className={`flex flex-col items-center px-2.5 py-3 rounded-3xl ${
        isNow ? "bg-white/20" : "hover:bg-white/10"
      } transition-colors min-w-[70px]`}
      whileHover={{ y: -2 }}
    >
      <span className="text-xs font-medium text-white/90 mb-2">
        {isNow ? "Now" : hour}
      </span>
      <div className="my-1">{renderIcon(icon)}</div>
      <span className="text-sm font-semibold text-white mt-1">{temp}°</span>
    </motion.div>
  );
};

// Daily Forecast Item
const DailyForecastItem: React.FC<{ forecast: ForecastDay }> = ({
  forecast,
}) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "clear":
        return <Sun className="w-6 h-6 text-amber-400" />;
      case "partly-cloudy":
        return <Cloud className="w-6 h-6 text-white" />;
      case "cloudy":
        return <Cloud className="w-6 h-6 text-white" />;
      case "fog":
        return <CloudFog className="w-6 h-6 text-white" />;
      case "drizzle":
        return <CloudDrizzle className="w-6 h-6 text-sky-200" />;
      case "rain":
        return <CloudRain className="w-6 h-6 text-sky-300" />;
      case "snow":
        return <CloudSnow className="w-6 h-6 text-white" />;
      case "thunderstorm":
        return <CloudLightning className="w-6 h-6 text-amber-300" />;
      default:
        return <Cloud className="w-6 h-6 text-white" />;
    }
  };

  return (
    <motion.div
      className="flex items-center justify-between py-3 px-4 hover:bg-white/10 rounded-xl transition-colors"
      whileHover={{ x: 2 }}
    >
      <span className="text-sm font-medium text-white w-24">
        {forecast.date}
      </span>
      <div className="flex-1 flex justify-center">
        {renderIcon(forecast.icon)}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-white/60">
          {forecast.min_temp}°
        </span>
        <div className="w-20 h-1.5 rounded-full overflow-hidden bg-white/20 relative">
          <motion.div
            className="absolute left-0 top-0 h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
        <span className="text-sm font-medium text-white">
          {forecast.max_temp}°
        </span>
      </div>
    </motion.div>
  );
};

// Weather Details Card
const WeatherDetailsCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
}> = ({ title, value, icon, description }) => {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-3xl p-4 flex flex-col h-full"
      whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.15)" }}
    >
      <div className="text-xs text-white/70 uppercase tracking-wider mb-1">
        {title}
      </div>
      <div className="flex items-center mb-2">{icon}</div>
      <div className="text-xl font-semibold text-white mt-1">{value}</div>
      {description && (
        <div className="text-xs text-white/80 mt-1">{description}</div>
      )}
    </motion.div>
  );
};

// Main Weather Component
const AppleWeather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );
  const [recentLocations, setRecentLocations] = useState<LocationData[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const timeOfDay = getTimeOfDay();

  // Generate dummy hourly forecast for now
  const hourlyForecast = [
    {
      hour: "Now",
      temp: weather?.temperature || 0,
      icon: weather?.icon || "cloudy",
      isNow: true,
    },
    { hour: "11AM", temp: 26, icon: "clear" },
    { hour: "12PM", temp: 28, icon: "clear" },
    { hour: "1PM", temp: 29, icon: "partly-cloudy" },
    { hour: "2PM", temp: 31, icon: "partly-cloudy" },
    { hour: "3PM", temp: 32, icon: "partly-cloudy" },
    { hour: "4PM", temp: 30, icon: "cloudy" },
    { hour: "5PM", temp: 28, icon: "rain" },
    { hour: "6PM", temp: 25, icon: "rain" },
    { hour: "7PM", temp: 24, icon: "cloudy" },
    { hour: "8PM", temp: 23, icon: "cloudy" },
    { hour: "9PM", temp: 22, icon: "clear" },
  ];

  // Load weather data
  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true);
        let data;

        if (selectedLocation) {
          data = await fetchWeatherByCoords(
            selectedLocation.latitude,
            selectedLocation.longitude
          );
          // Add to recent locations
          addToRecentLocations(selectedLocation);
        } else {
          data = await getCurrentLocationWeather();
        }

        setWeather(data);
        setError(null);
      } catch (err) {
        console.error("Error loading weather data:", err);
        setError("Could not load weather data");
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [selectedLocation]);

  // Load recent locations from localStorage
  useEffect(() => {
    const savedLocations = localStorage.getItem("weatherRecentLocations");
    if (savedLocations) {
      try {
        const locations = JSON.parse(savedLocations);
        setRecentLocations(locations);
      } catch (e) {
        console.error("Error parsing recent locations:", e);
      }
    }
  }, []);

  // Handle search query changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setSearchLoading(true);
        const results = await searchLocationsInVietnam(searchQuery);
        setSearchResults(results);
        setSearchLoading(false);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Focus search input when search opens
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [showSearch]);

  // Handle location selection
  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
    setShowSearch(false);
    setSearchQuery("");
  };

  // Reset to current location
  const resetToCurrentLocation = () => {
    setSelectedLocation(null);
    setShowSearch(false);
  };

  // Add a location to recent locations
  const addToRecentLocations = (location: LocationData) => {
    if (!location) return;

    // Remove this location if it already exists
    const filteredLocations = recentLocations.filter(
      (loc) =>
        !(
          loc.latitude === location.latitude &&
          loc.longitude === location.longitude
        )
    );

    // Add the new location to the beginning of the array
    const newLocations = [location, ...filteredLocations].slice(0, 5); // Keep only 5 most recent
    setRecentLocations(newLocations);

    // Save to localStorage
    localStorage.setItem(
      "weatherRecentLocations",
      JSON.stringify(newLocations)
    );
  };

  // If loading and we have no weather data yet
  if (loading && !weather) {
    return (
      <div className="h-[100dvh] bg-gradient-to-b from-blue-500 to-blue-700 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 text-white animate-spin mb-4" />
          <div className="text-white font-medium">
            Đang tải thông tin thời tiết...
          </div>
        </div>
      </div>
    );
  }

  // If there's an error
  if (error) {
    return (
      <div className="h-[100dvh] bg-gradient-to-b from-red-500 to-red-700 flex justify-center items-center p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 max-w-md flex flex-col items-center">
          <XCircle className="w-12 h-12 text-white mb-4" />
          <div className="text-white font-medium text-center mb-2">{error}</div>
          <div className="text-white/80 text-sm text-center mb-4">
            Vui lòng kiểm tra kết nối và thử lại.
          </div>
          <button
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full"
            onClick={() => window.location.reload()}
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  // Weather animation classes
  const weatherClasses = getWeatherClasses(weather.icon);
  const textColor = getWeatherTextColor(weather.icon);
  const textSecondaryColor = getWeatherTextSecondaryColor(weather.icon);
  const timeOverlay = getBackgroundOverlayForTimeOfDay(timeOfDay, weather.icon);

  return (
    <div
      className={`min-h-[100dvh] ${weatherClasses.background} text-white relative`}
    >
      {/* Time of day overlay */}
      {timeOverlay && (
        <div className={`absolute inset-0 ${timeOverlay} z-0`}></div>
      )}

      {/* Weather animation effects */}
      <div className="relative z-10">
        <WeatherEffect weatherIcon={weather.icon} />
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <button
                title="Close search"
                className="p-2 bg-white/10 rounded-full text-white"
                onClick={() => setShowSearch(false)}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a city"
                  className="w-full bg-white/10 border-none rounded-full pl-10 pr-4 py-2.5 text-white outline-none focus:bg-white/20 transition-colors"
                />
                {searchQuery && (
                  <button
                    title="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                    onClick={() => setSearchQuery("")}
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto">
              {searchLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 text-white/70 animate-spin" />
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.map((location, index) => (
                    <motion.button
                      key={`search-${location.name}-${index}`}
                      className="w-full bg-white/10 hover:bg-white/20 p-3 rounded-xl text-left text-white transition-colors flex items-center"
                      onClick={() => handleLocationSelect(location)}
                      whileHover={{ x: 2 }}
                      title="Select location"
                    >
                      <MapPin className="w-5 h-5 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{location.name}</div>
                        {location.admin1 && (
                          <div className="text-sm text-white/70">
                            {location.admin1}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="text-center py-8 text-white/70">
                  {searchQuery.length < 2
                    ? "Enter at least 2 characters to search"
                    : "No locations found"}
                </div>
              ) : recentLocations.length > 0 ? (
                <div>
                  <div className="text-sm font-medium text-white/80 mb-2 px-1">
                    Lịch sử tìm kiếm
                  </div>
                  <div className="space-y-2">
                    {recentLocations.map((location, index) => (
                      <motion.button
                        key={`recent-${location.name}-${index}`}
                        className="w-full bg-white/10 hover:bg-white/20 p-3 rounded-xl text-left text-white transition-colors flex items-center"
                        onClick={() => handleLocationSelect(location)}
                        whileHover={{ x: 2 }}
                        title="Select location"
                      >
                        <MapPin className="w-5 h-5 mr-3 flex-shrink-0" />
                        <div>
                          <div className="font-medium">{location.name}</div>
                          {location.admin1 && (
                            <div className="text-sm text-white/70">
                              {location.admin1}
                            </div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="text-sm font-medium text-white/80 mt-6 mb-2 px-1">
                    Vị trí hiện tại
                  </div>
                  <motion.button
                    className="w-full bg-white/10 hover:bg-white/20 p-3 rounded-xl text-left text-white transition-colors flex items-center"
                    onClick={resetToCurrentLocation}
                    whileHover={{ x: 2 }}
                  >
                    <LocateFixed className="w-5 h-5 mr-3 flex-shrink-0 text-blue-400" />
                    <div>
                      <div className="font-medium">Vị trí hiện tại</div>
                    </div>
                  </motion.button>
                </div>
              ) : (
                <div className="text-center py-8 text-white/70">
                  Tìm kiếm thành phố để xem thông tin thời tiết
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 container mx-auto max-w-lg px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            title="Search"
            className="p-2.5 bg-white/15 rounded-full backdrop-blur-md"
            onClick={() => setShowSearch(true)}
          >
            <List className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button
              title="Reset to current location"
              className="p-2.5 bg-white/15 rounded-full backdrop-blur-md"
              onClick={resetToCurrentLocation}
            >
              <LocateFixed className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Location and Temperature */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold mb-1">
            {selectedLocation ? selectedLocation.name : weather.location}
            {selectedLocation?.admin1 && (
              <span className="block text-base font-normal text-white/80 mt-1">
                {selectedLocation.admin1}
              </span>
            )}
          </h1>
          <motion.div
            className="text-8xl font-thin my-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            {weather.temperature}°
          </motion.div>
          <div className="text-xl font-medium mb-1">{weather.description}</div>
          <div className="text-base text-white/80">
            H: {weather.forecast?.[0]?.max_temp || "--"}° L:{" "}
            {weather.forecast?.[0]?.min_temp || "--"}°
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-3 mb-5">
          <div className="flex items-center px-3 py-2">
            <Calendar className="w-4 h-4 mr-2 text-white/70" />
            <div className="text-sm font-medium text-white/80">Dự báo giờ</div>
          </div>
          <div className="overflow-x-auto py-2">
            <div className="flex gap-2 min-w-max px-2">
              {hourlyForecast.map((hour, i) => (
                <HourlyForecastItem
                  key={i}
                  hour={hour.hour}
                  temp={hour.temp}
                  icon={hour.icon}
                  isNow={hour.isNow}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 10-Day Forecast */}
        {weather.forecast && weather.forecast.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 mb-5">
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 mr-2 text-white/70" />
              <div className="text-sm font-medium text-white/80">
                Dự báo 3 ngày
              </div>
            </div>
            <div className="divide-y divide-white/10">
              {weather.forecast.map((day, i) => (
                <DailyForecastItem key={i} forecast={day} />
              ))}
            </div>
          </div>
        )}

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <WeatherDetailsCard
            title="Humidity"
            value={`${weather.humidity}%`}
            icon={<Droplets className="w-6 h-6 text-sky-300" />}
            description={
              weather.humidity > 70
                ? "Độ ẩm cao"
                : weather.humidity < 30
                ? "Độ ẩm thấp"
                : "Độ ẩm bình thường"
            }
          />
          <WeatherDetailsCard
            title="Gió"
            value={`${weather.windSpeed} m/s`}
            icon={<Wind className="w-6 h-6 text-white" />}
            description={`${weather.windSpeed > 8 ? "Gió mạnh" : "Gió mềm"}`}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {weather.uv_index !== undefined && (
            <WeatherDetailsCard
              title="Chỉ số UV"
              value={weather.uv_index.toFixed(1)}
              icon={<Sun className="w-6 h-6 text-amber-400" />}
              description={
                weather.uv_index > 5
                  ? "Độ phát xạ UV cao"
                  : weather.uv_index > 2
                  ? "Độ phát xạ UV trung bình"
                  : "Độ phát xạ UV thấp"
              }
            />
          )}
          {weather.pressure !== undefined && (
            <WeatherDetailsCard
              title="Áp suất"
              value={`${Math.round(weather.pressure)} hPa`}
              icon={<Gauge className="w-6 h-6 text-white" />}
            />
          )}
        </div>

        {(weather.visibility !== undefined ||
          weather.precipitation !== undefined) && (
          <div className="grid grid-cols-2 gap-3">
            {weather.visibility !== undefined && (
              <WeatherDetailsCard
                title="Tầm nhìn"
                value={`${weather.visibility.toFixed(1)} km`}
                icon={<Eye className="w-6 h-6 text-white" />}
                description={
                  weather.visibility < 1
                    ? "Tầm nhìn kém"
                    : weather.visibility < 5
                    ? "Tầm nhìn trung bình"
                    : "Tầm nhìn tốt"
                }
              />
            )}
            {weather.precipitation !== undefined && (
              <WeatherDetailsCard
                title="Mưa"
                value={`${weather.precipitation.toFixed(1)} mm`}
                icon={<Umbrella className="w-6 h-6 text-sky-300" />}
              />
            )}
          </div>
        )}

        {/* Warning Message */}
        {weather.warning && (
          <motion.div
            className="bg-red-700/70 text-white p-4 rounded-3xl mt-5 backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="font-semibold mb-1">Cảnh báo thời tiết</div>
            <div className="text-sm">{weather.warning}</div>
          </motion.div>
        )}

        {/* Data Attribution */}
        <div className="text-center text-xs text-white/60 mt-8">
          Dữ liệu thời tiết được cung cấp bởi Open-Meteo
        </div>
      </div>
    </div>
  );
};

export default AppleWeather;
