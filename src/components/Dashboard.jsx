import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
    const [visits, setVisits] = useState([]);
    const [stats, setStats] = useState({
        totalVisits: 0,
        visitsToday: 0,
        topPages: [],
        locations: []
    });

    useEffect(() => {
        fetchVisits();
    }, []);

    const fetchVisits = async () => {
        const { data, error } = await supabase
            .from('visits')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching visits:', error);
        } else {
            setVisits(data);
            calculateStats(data);
        }
    };

    const calculateStats = (data) => {
        const totalVisits = data.length;
        const today = new Date().toISOString().split('T')[0];
        const visitsToday = data.filter(visit => visit.created_at.startsWith(today)).length;

        // Top Pages
        const pageCounts = data.reduce((acc, visit) => {
            acc[visit.path] = (acc[visit.path] || 0) + 1;
            return acc;
        }, {});
        const topPages = Object.entries(pageCounts)
            .map(([path, count]) => ({ path, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        // Locations
        const locationCounts = data.reduce((acc, visit) => {
            const country = visit.country || 'Unknown';
            acc[country] = (acc[country] || 0) + 1;
            return acc;
        }, {});
        const locations = Object.entries(locationCounts)
            .map(([country, count]) => ({ country, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        setStats({
            totalVisits,
            visitsToday,
            topPages,
            locations
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">Total Visits</h2>
                    <p className="text-3xl">{stats.totalVisits}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">Visits Today</h2>
                    <p className="text-3xl">{stats.visitsToday}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Top Pages</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.topPages}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="path" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Visitor Locations</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.locations}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="country" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
