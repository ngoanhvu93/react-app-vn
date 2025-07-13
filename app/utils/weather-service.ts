// Weather service using OpenMeteo API (completely free, no API key required)

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feels_like: number;
  warning?: string; // Optional warning message
  uv_index?: number;
  precipitation?: number; // mm
  pressure?: number; // hPa
  visibility?: number; // km
  sunrise?: string;
  sunset?: string;
  forecast?: ForecastDay[]; // Next 3 days forecast
}

export interface ForecastDay {
  date: string;
  min_temp: number;
  max_temp: number;
  icon: string;
  description: string;
  precipitation_probability: number;
}

export interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
  admin1?: string; // Province/City
}

// OpenMeteo API (no API key required)
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';

// Map weather codes to descriptions and icons
const weatherCodeMap: Record<number, { description: string, icon: string }> = {
  0: { description: 'Bầu trời quang đãng', icon: 'clear' },
  1: { description: 'Chủ yếu quang đãng', icon: 'partly-cloudy' },
  2: { description: 'Có mây rải rác', icon: 'partly-cloudy' },
  3: { description: 'Nhiều mây', icon: 'cloudy' },
  45: { description: 'Sương mù', icon: 'fog' },
  48: { description: 'Sương mù giá lạnh', icon: 'fog' },
  51: { description: 'Mưa phùn nhẹ', icon: 'drizzle' },
  53: { description: 'Mưa phùn vừa', icon: 'drizzle' },
  55: { description: 'Mưa phùn mạnh', icon: 'drizzle' },
  56: { description: 'Mưa phùn lạnh nhẹ', icon: 'rain' },
  57: { description: 'Mưa phùn lạnh mạnh', icon: 'rain' },
  61: { description: 'Mưa nhẹ', icon: 'rain' },
  63: { description: 'Mưa vừa', icon: 'rain' },
  65: { description: 'Mưa mạnh', icon: 'rain' },
  66: { description: 'Mưa lạnh nhẹ', icon: 'rain' },
  67: { description: 'Mưa lạnh mạnh', icon: 'rain' },
  71: { description: 'Tuyết rơi nhẹ', icon: 'snow' },
  73: { description: 'Tuyết rơi vừa', icon: 'snow' },
  75: { description: 'Tuyết rơi mạnh', icon: 'snow' },
  77: { description: 'Hạt tuyết', icon: 'snow' },
  80: { description: 'Mưa rào nhẹ', icon: 'rain' },
  81: { description: 'Mưa rào vừa', icon: 'rain' },
  82: { description: 'Mưa rào mạnh', icon: 'rain' },
  85: { description: 'Mưa tuyết nhẹ', icon: 'snow' },
  86: { description: 'Mưa tuyết mạnh', icon: 'snow' },
  95: { description: 'Giông bão', icon: 'thunderstorm' },
  96: { description: 'Giông bão có mưa đá nhẹ', icon: 'thunderstorm' },
  99: { description: 'Giông bão có mưa đá mạnh', icon: 'thunderstorm' }
};

// Generate weather warnings based on conditions
function generateWeatherWarning(
  weatherCode: number, 
  temperature: number, 
  humidity: number, 
  windSpeed: number
): string | undefined {
  // No warning for clear conditions
  if (weatherCode === 0) return undefined;
  
  const warnings: string[] = [];
  
  // Temperature-based warnings
  if (temperature > 35) {
    warnings.push("Nhiệt độ cao cực kỳ, hãy uống nhiều nước và tránh hoạt động ngoài trời.");
  } else if (temperature > 30) {
    warnings.push("Nhiệt độ cao, hãy giữ đủ nước và tránh nắng gay gắt vào giữa trưa.");
  } else if (temperature < 10) {
    warnings.push("Nhiệt độ thấp, hãy mặc ấm khi ra ngoài.");
  } else if (temperature < 5) {
    warnings.push("Nhiệt độ rất thấp, nguy cơ hạ thân nhiệt nếu ở ngoài lâu.");
  }
  
  // Weather code based warnings
  if ([95, 96, 99].includes(weatherCode)) {
    warnings.push("Có giông bão, tránh ra ngoài và các khu vực có cây cao, cột điện.");
  } else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    warnings.push("Có mưa, nhớ mang theo dù hoặc áo mưa.");
  } else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    warnings.push("Có tuyết rơi, đường có thể trơn trượt, hãy đi lại cẩn thận.");
  } else if ([45, 48].includes(weatherCode)) {
    warnings.push("Có sương mù, tầm nhìn hạn chế, lái xe cẩn thận và bật đèn phù hợp.");
  }
  
  // Wind speed warnings
  if (windSpeed > 20) {
    warnings.push("Gió mạnh, cẩn thận với các vật dụng ngoài trời và đồ vật trên cao.");
  } else if (windSpeed > 10) {
    warnings.push("Gió khá mạnh, đề phòng đồ vật có thể bị thổi bay.");
  }
  
  // Humidity warnings
  if (humidity > 85) {
    warnings.push("Độ ẩm rất cao, cảm giác nóng bức và khó chịu, hạn chế vận động mạnh.");
  } else if (humidity < 30) {
    warnings.push("Độ ẩm thấp, nên uống nhiều nước và dưỡng ẩm cho da.");
  }
  
  return warnings.length > 0 ? warnings.join(" ") : undefined;
}

// Get location name from coordinates
async function getLocationName(latitude: number, longitude: number): Promise<string> {
  try {
    const response = await fetch(
      `${GEO_URL}?latitude=${latitude}&longitude=${longitude}&count=1`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results[0].name;
    }
    
    return 'Vị trí của bạn';
  } catch (error) {
    console.error('Error fetching location:', error);
    return 'Vị trí của bạn';
  }
}

// Search for locations in Vietnam
export async function searchLocationsInVietnam(query: string): Promise<LocationData[]> {
  try {
    const response = await fetch(
      `${GEO_URL}?name=${encodeURIComponent(query)}&count=10&language=vi&country=vietnam`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results.map((result: any) => ({
        name: result.name,
        latitude: result.latitude,
        longitude: result.longitude,
        admin1: result.admin1,
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
}

export async function fetchWeatherByCoords(
  latitude: number, 
  longitude: number
): Promise<WeatherData> {
  try {
    // Get location name
    const locationName = await getLocationName(latitude, longitude);
    
    // Get weather data with additional parameters
    const response = await fetch(
      `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation,surface_pressure,visibility,is_day,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&forecast_days=4&timezone=auto`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    const current = data.current;
    const daily = data.daily;
    
    // Get weather description and icon from code
    const weatherCode = current.weather_code;
    const weatherInfo = weatherCodeMap[weatherCode] || { 
      description: 'Không xác định', 
      icon: 'cloudy' 
    };
    
    // Generate warning based on weather conditions
    const warning = generateWeatherWarning(
      weatherCode,
      current.temperature_2m,
      current.relative_humidity_2m,
      current.wind_speed_10m
    );
    
    // Process forecast data
    const forecast: ForecastDay[] = [];
    if (daily && daily.time && daily.time.length > 1) {
      // Skip today (index 0) and get next 3 days
      for (let i = 1; i < Math.min(4, daily.time.length); i++) {
        const dayCode = daily.weather_code[i];
        const dayWeatherInfo = weatherCodeMap[dayCode] || { 
          description: 'Không xác định', 
          icon: 'cloudy' 
        };
        
        forecast.push({
          date: formatDate(daily.time[i]),
          min_temp: Math.round(daily.temperature_2m_min[i]),
          max_temp: Math.round(daily.temperature_2m_max[i]),
          icon: dayWeatherInfo.icon,
          description: dayWeatherInfo.description,
          precipitation_probability: daily.precipitation_probability_max[i]
        });
      }
    }
    
    return {
      location: locationName,
      temperature: Math.round(current.temperature_2m),
      description: weatherInfo.description,
      icon: weatherInfo.icon,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      feels_like: Math.round(current.apparent_temperature),
      warning,
      // New fields
      uv_index: current.uv_index,
      precipitation: current.precipitation,
      pressure: current.surface_pressure,
      visibility: current.visibility / 1000, // convert to km
      sunrise: daily?.sunrise?.[0] ? formatTime(daily.sunrise[0]) : undefined,
      sunset: daily?.sunset?.[0] ? formatTime(daily.sunset[0]) : undefined,
      forecast
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}

// Helper function to format date to readable format
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric', month: 'numeric' });
}

// Helper function to format time
function formatTime(timeString: string): string {
  const date = new Date(timeString);
  return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

// Get user's current location and fetch weather
export async function getCurrentLocationWeather(): Promise<WeatherData | null> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const weather = await fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          resolve(weather);
        } catch (error) {
          console.error('Error fetching weather:', error);
          reject(error);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        reject(error);
      }
    );
  });
} 