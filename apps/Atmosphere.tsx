/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file Atmosphere.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Wind, Droplets, MapPin, Calendar, Search, Loader2, CloudSnow, CloudLightning, Cloud } from 'lucide-react';

interface WeatherData {
    temperature: number;
    windspeed: number;
    weathercode: number;
    city: string;
}

const CITIES = [
    { name: "San Francisco", lat: 37.7749, lon: -122.4194 },
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
    { name: "Sydney", lat: -33.8688, lon: 151.2093 },
    { name: "Dubai", lat: 25.2048, lon: 55.2708 },
    { name: "Mumbai", lat: 19.0760, lon: 72.8777 }
];

export const Atmosphere: React.FC = () => {
    const [currentCity, setCurrentCity] = useState(CITIES[0]);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        fetchWeather(currentCity);
    }, [currentCity]);

    const fetchWeather = async (city: typeof CITIES[0]) => {
        setLoading(true);
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`);
            const data = await res.json();
            setWeather({
                temperature: data.current_weather.temperature,
                windspeed: data.current_weather.windspeed,
                weathercode: data.current_weather.weathercode,
                city: city.name
            });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const getWeatherIcon = (code: number) => {
        if (code <= 3) return <Sun size={64} className="text-yellow-400" />;
        if (code <= 48) return <Cloud size={64} className="text-gray-300" />;
        if (code <= 67) return <CloudRain size={64} className="text-blue-400" />;
        if (code <= 77) return <CloudSnow size={64} className="text-white" />;
        if (code <= 99) return <CloudLightning size={64} className="text-purple-400" />;
        return <Sun size={64} className="text-yellow-400" />;
    };

    const getWeatherDesc = (code: number) => {
        if (code <= 3) return "Clear / Sunny";
        if (code <= 48) return "Cloudy / Fog";
        if (code <= 67) return "Rainy";
        if (code <= 77) return "Snow";
        if (code <= 99) return "Thunderstorm";
        return "Unknown";
    }

    return (
        <div className="h-full bg-gradient-to-br from-blue-900 via-indigo-900 to-black text-white p-6 relative overflow-hidden flex flex-col">
             <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
             
             {/* Header */}
             <div className="relative z-10 flex justify-between items-start mb-8">
                 <div className="relative">
                     <button 
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="flex items-center gap-2 font-bold text-2xl hover:text-blue-200 transition-colors"
                     >
                         <MapPin size={24} className="text-red-400" /> 
                         {currentCity.name}
                         <Search size={16} className="opacity-50" />
                     </button>
                     
                     {searchOpen && (
                         <div className="absolute top-full left-0 mt-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-2 w-48 z-20">
                             {CITIES.map(city => (
                                 <button
                                    key={city.name}
                                    onClick={() => { setCurrentCity(city); setSearchOpen(false); }}
                                    className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg text-sm"
                                 >
                                     {city.name}
                                 </button>
                             ))}
                         </div>
                     )}
                 </div>
                 <div className="text-right">
                     {loading ? (
                         <Loader2 className="animate-spin" />
                     ) : (
                         <>
                            <div className="text-5xl font-thin">{weather?.temperature}°C</div>
                            <div className="text-blue-200">{weather && getWeatherDesc(weather.weathercode)}</div>
                         </>
                     )}
                 </div>
             </div>

             {/* Main Card */}
             <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-6 border border-white/10 flex items-center justify-around relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                 <div className="relative z-10 text-center">
                     {loading ? <div className="w-16 h-16 rounded-full bg-white/10 animate-pulse" /> : weather && getWeatherIcon(weather.weathercode)}
                 </div>
                 
                 <div className="grid grid-cols-2 gap-x-8 gap-y-4 relative z-10">
                     <div className="flex flex-col items-center gap-1">
                         <Wind size={20} className="text-blue-300" />
                         <span className="text-xs text-gray-300">Wind</span>
                         <span className="font-bold">{weather?.windspeed || '--'} km/h</span>
                     </div>
                     <div className="flex flex-col items-center gap-1">
                         <Droplets size={20} className="text-blue-300" />
                         <span className="text-xs text-gray-300">Humidity</span>
                         <span className="font-bold">42%</span>
                     </div>
                 </div>
             </div>

             {/* Forecast (Mocked for visual, as free API current_weather doesn't give forecast easily without parsing) */}
             <div className="flex-1 overflow-y-auto">
                 <h3 className="font-bold mb-4 flex items-center gap-2 opacity-80"><Calendar size={16} /> 5-Day Forecast</h3>
                 <div className="space-y-2">
                     {[
                         { day: 'Tomorrow', icon: Sun, high: 22, low: 15 },
                         { day: 'Wednesday', icon: CloudRain, high: 18, low: 14 },
                         { day: 'Thursday', icon: Sun, high: 24, low: 16 },
                         { day: 'Friday', icon: Wind, high: 20, low: 15 },
                         { day: 'Saturday', icon: Sun, high: 25, low: 18 },
                     ].map((f, i) => (
                         <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-black/20 hover:bg-white/10 transition-colors border border-white/5">
                             <span className="w-20 font-medium text-sm">{f.day}</span>
                             <f.icon size={20} className={f.icon === Sun ? "text-yellow-400" : "text-blue-400"} />
                             <div className="flex gap-3 w-20 justify-end text-sm">
                                 <span className="font-bold">{f.high}°</span>
                                 <span className="text-gray-400">{f.low}°</span>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        </div>
    );
};