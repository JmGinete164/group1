'use client';
import { useEffect, useState } from 'react';
import CardLayout from '../../components/CardLayout';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ChartsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    comments: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch users
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!usersResponse.ok) throw new Error('Failed to fetch users');
        const usersData = await usersResponse.json();

        // Fetch posts
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!postsResponse.ok) throw new Error('Failed to fetch posts');
        const postsData = await postsResponse.json();

        // Fetch comments
        const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
        if (!commentsResponse.ok) throw new Error('Failed to fetch comments');
        const commentsData = await commentsResponse.json();

        // Update stats
        setStats({
          users: usersData.length,
          posts: postsData.length,
          comments: commentsData.length
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Chart options
  const chartOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      }
    },
    dataLabels: {
      enabled: true
    },
    xaxis: {
      categories: ['Users', 'Posts', 'Comments'],
    },
    colors: ['#3B82F6', '#10B981', '#F59E0B'],
    title: {
      text: 'Platform Statistics',
      align: 'center',
      style: {
        fontSize: '20px',
        color: '#fff'
      }
    }
  };

  const chartSeries = [{
    name: 'Count',
    data: [stats.users, stats.posts, stats.comments]
  }];

  return (
    <CardLayout>
      <h1 className="text-3xl font-bold text-white mb-4 text-center">Platform Statistics</h1>
      {loading && <div className="text-white">Loading...</div>}
      {error && <div className="text-red-400">Error: {error}</div>}

      {/* Statistics Chart */}
      <div className="bg-white rounded-lg p-4 mb-6">
        {typeof window !== 'undefined' && (
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        )}
      </div>
    </CardLayout>
  );
} 

