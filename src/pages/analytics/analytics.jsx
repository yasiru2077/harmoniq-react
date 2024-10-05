import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import AdminNavigation from "../navigator/admin-navigation";
import "./analytics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const [topArtists, setTopArtists] = useState([]);
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Play Count",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top 5 Albums by Play Count",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Play Count",
        },
      },
      x: {
        title: {
          display: true,
          text: "Album Name",
        },
        ticks: {
          maxRotation: 0,
          minRotation: 10,
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Most Played Genres",
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://zzb1t95lb3.execute-api.ap-south-1.amazonaws.com/Development/albums"
        );
        const albums = response.data.albums;

        // Process data for bar chart
        const topAlbums = albums
          .sort((a, b) => b.playCount - a.playCount)
          .slice(0, 5);

        setBarChartData({
          labels: topAlbums.map((album) => album.albumName),
          datasets: [
            {
              label: "Play Count",
              data: topAlbums.map((album) => album.playCount),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });

        // Process data for pie chart
        const genreCounts = albums.reduce((acc, album) => {
          acc[album.genre] = (acc[album.genre] || 0) + album.playCount;
          return acc;
        }, {});

        const topGenres = Object.entries(genreCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5);

        setPieChartData({
          labels: topGenres.map(([genre]) => genre),
          datasets: [
            {
              data: topGenres.map(([, count]) => count),
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
        const artistCounts = albums.reduce((acc, album) => {
          acc[album.artists] = (acc[album.artists] || 0) + album.playCount;
          return acc;
        }, {});

        const topArtists = Object.entries(artistCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([artistName, playCount]) => ({
            artistName,
            playCount,
          }));

        setTopArtists(topArtists);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="analytics">
      <AdminNavigation />
      <h1>Analytics</h1>
      <section className="flex w-full h-64 ">
        <div className="w-full h-full mb-8">
          <Bar data={barChartData} options={barOptions} />
        </div>
        <div className="w-full h-full">
          <h2 className="mb-5">Artist with most views</h2>
          <table className="min-w-full text-left text-sm font-light">
            <thead className="bg-[#BBA5FF]">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Artist Name
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Play Count
                </th>
              </tr>
            </thead>
            <tbody>
              {topArtists.map((artist, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-[#BBA5FF]"
                  } border-b border-gray-300`}
                >
                  <td className="px-6 py-4 text-gray-900">
                    {artist.artistName}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {artist.playCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="flex">
        <div className="w-full h-64 mb-8"></div>
        <div className="w-full h-64">
          <Pie data={pieChartData} options={pieOptions} />
        </div>
      </section>
    </div>
  );
}

export default Analytics;
