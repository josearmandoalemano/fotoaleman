import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export const useAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        const logVisit = async () => {
            try {
                // Fetch location data from a free IP geolocation service
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();

                const { ip, city, country_name } = data;

                // Log the visit to Supabase
                await supabase.from('visits').insert([
                    {
                        path: location.pathname,
                        ip: ip,
                        city: city,
                        country: country_name,
                        user_agent: navigator.userAgent
                    }
                ]);
            } catch (error) {
                console.error('Error logging visit:', error);
            }
        };

        logVisit();
    }, [location]);
};
