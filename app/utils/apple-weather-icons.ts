// Apple-inspired weather icons and animation utilities

export const WEATHER_ANIMATIONS = {
  clear: {
    gradient: 'from-sky-400 to-blue-600',
    background: 'bg-gradient-to-b from-sky-400 to-blue-600',
    icon: 'sun',
    animation: 'floating',
    blurOverlay: 'bg-yellow-300/20 blur-3xl'
  },
  'partly-cloudy': {
    gradient: 'from-sky-400 to-indigo-600',
    background: 'bg-gradient-to-b from-sky-400 to-indigo-600',
    icon: 'cloud-sun',
    animation: 'floating',
    blurOverlay: 'bg-white/20 blur-3xl'
  },
  cloudy: {
    gradient: 'from-indigo-400 to-indigo-700',
    background: 'bg-gradient-to-b from-indigo-400 to-indigo-700',
    icon: 'cloud',
    animation: 'pulse',
    blurOverlay: 'bg-white/20 blur-3xl'
  },
  fog: {
    gradient: 'from-slate-300 to-slate-500',
    background: 'bg-gradient-to-b from-slate-300 to-slate-500',
    icon: 'cloud-fog',
    animation: 'pulse-slow',
    blurOverlay: 'bg-white/30 blur-3xl'
  },
  drizzle: {
    gradient: 'from-blue-400 to-blue-700',
    background: 'bg-gradient-to-b from-blue-400 to-blue-700',
    icon: 'cloud-drizzle',
    animation: 'rain',
    blurOverlay: 'bg-blue-300/20 blur-3xl'
  },
  rain: {
    gradient: 'from-blue-600 to-blue-900',
    background: 'bg-gradient-to-b from-blue-600 to-blue-900',
    icon: 'cloud-rain',
    animation: 'rain',
    blurOverlay: 'bg-blue-300/10 blur-3xl'
  },
  snow: {
    gradient: 'from-sky-100 to-slate-400',
    background: 'bg-gradient-to-b from-sky-100 to-slate-400',
    icon: 'cloud-snow',
    animation: 'snow',
    blurOverlay: 'bg-white/40 blur-3xl'
  },
  thunderstorm: {
    gradient: 'from-indigo-800 to-purple-900',
    background: 'bg-gradient-to-b from-indigo-800 to-purple-900',
    icon: 'cloud-lightning',
    animation: 'thunder',
    blurOverlay: 'bg-indigo-300/10 blur-3xl'
  }
};

export const getWeatherClasses = (icon: string) => {
  return WEATHER_ANIMATIONS[icon as keyof typeof WEATHER_ANIMATIONS] || WEATHER_ANIMATIONS.cloudy;
};

export const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 6) return 'night';
  if (hour < 10) return 'morning';
  if (hour < 16) return 'day';
  if (hour < 20) return 'evening';
  return 'night';
};

export const getWeatherTextColor = (icon: string) => {
  if (icon === 'snow') return 'text-slate-800';
  return 'text-white';
};

export const getWeatherTextSecondaryColor = (icon: string) => {
  if (icon === 'snow') return 'text-slate-600';
  return 'text-white/80';
};

export const getBackgroundOverlayForTimeOfDay = (timeOfDay: string, weatherIcon: string) => {
  if (timeOfDay === 'night') {
    return 'bg-gradient-to-b from-indigo-900/40 to-slate-900/60 backdrop-blur-sm';
  }
  if (timeOfDay === 'evening') {
    return 'bg-gradient-to-b from-orange-500/20 to-purple-900/40 backdrop-blur-sm';
  }
  if (timeOfDay === 'morning') {
    return 'bg-gradient-to-b from-amber-400/20 to-blue-500/30 backdrop-blur-sm';
  }
  return '';
}; 