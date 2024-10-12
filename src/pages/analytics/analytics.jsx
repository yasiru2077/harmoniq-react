import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  BubbleController,
} from "chart.js";
import { Bar, Line, Pie, Bubble } from "react-chartjs-2";
import axios from "axios";
import AdminNavigation from "../navigator/admin-navigation";
import "./analytics.css";
import { Album } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  BubbleController
);

function Analytics() {
  const [topArtists, setTopArtists] = useState([]);
  const [totalPlayCount, setTotalPlayCount] = useState(0);
  const [stats, setStats] = useState({ totalAlbums: 0, totalTracks: 0 });
  const [albums, setAlbums] = useState([]);
  const [bubbleChartData, setBubbleChartData] = useState({
    datasets: [
      {
        label: "Tracks vs Play Count",
        data: [], // Each data point will contain x (tracks), y (play count), and r (bubble size)
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  });
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Play Count",
        data: [],
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  });

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

  const bubbleOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tracks vs Play Count",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Number of Tracks",
        },
      },
      y: {
        title: {
          display: true,
          text: "Play Count",
        },
      },
    },
  };

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

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top 5 Artists by Play Count",
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
          text: "Artist Name",
        },
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
        const totalCount = albums.reduce(
          (total, album) => total + album.playCount,
          0
        );
        setTotalPlayCount(totalCount);

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

        // Process data for bubble chart
        const bubbleData = albums.map((album) => {
          // Make sure the album has a `tracks` array and playCount is valid
          const numberOfTracks = album.tracks ? album.tracks.length : 0;
          const playCount = album.playCount || 0;

          // Scale bubble size for better visualization
          const bubbleSize = Math.sqrt(playCount) / 5; // Adjust this scaling factor as needed

          return {
            x: numberOfTracks, // Number of tracks per album
            y: playCount, // Play count
            r: bubbleSize, // Scaled bubble size based on play count
          };
        });

        setBubbleChartData({
          datasets: [
            {
              label: "Tracks vs Play Count",
              data: bubbleData,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              hoverBackgroundColor: "rgba(255, 99, 132, 1)",
            },
          ],
        });

        // Process data for top artists
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

        // Set data for line chart after top artists are fetched
        setLineChartData({
          labels: topArtists.map((artist) => artist.artistName),
          datasets: [
            {
              label: "Play Count",
              data: topArtists.map((artist) => artist.playCount),
              fill: false,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          "https://zzb1t95lb3.execute-api.ap-south-1.amazonaws.com/Development/albums"
        );
        setAlbums(response.data.albums);

        // Calculate stats
        const totalTracks = response.data.albums.reduce(
          (acc, album) => acc + album.tracks.length,
          0
        );
        setStats({ totalAlbums: response.data.albums.length, totalTracks });
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    fetchAlbums();
  }, []);

  const requestAnalyticsReport = async () => {
    try {
      const response = await axios.post(
        "https://zzb1t95lb3.execute-api.ap-south-1.amazonaws.com/Development/sendingAnalyticsEmail"
      );
      if (response.status === 200) {
        alert("Analytics report has been sent to your email.");
      }
    } catch (error) {
      console.error("Analytics report error:", error);
      alert("Report has been sent to the admin email.");
    }
  };

  return (
    <div className="analytics">
      <AdminNavigation />
      <div className="flex mt-5 justify-between">
        <div className="bg-[#E8EEF3] p-4 rounded-lg shadow-lg w-1/4 text-center">
          <h3 className="text-xl font-bold">Total Albums</h3>
          <p className="text-2xl font-semibold">{stats.totalAlbums}</p>
        </div>
        <div className="bg-[#E8EEF3] p-4 rounded-lg shadow-lg w-1/4 text-center">
          <h3 className="text-xl font-bold">Total Tracks</h3>
          <p className="text-2xl font-semibold">{stats.totalTracks}</p>
        </div>
      </div>
      {/* <h1 className="font-semibold m-3">Analytics</h1> */}

      <section className="flex flex-col mt-10 lg:flex-row w-full bg-[#E8EEF3] rounded-md mb-5 gap-5 p-5">
        <div className="w-full lg:w-1/2 mb-8">
          <Bar data={barChartData} options={barOptions} />
        </div>
        <div className="w-full lg:w-1/2">
          <Bubble data={bubbleChartData} options={bubbleOptions} />
        </div>
      </section>

      <section className="flex flex-col lg:flex-row w-full bg-[#E8EEF3] rounded-md mb-5 gap-5 p-5">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <Line data={lineChartData} options={lineOptions} />
        </div>
        <div className="pie-chart w-full lg:w-1/2 ">
          <Pie data={pieChartData} options={pieOptions} />
        </div>
      </section>
      <div className="flex justify-center mb-10">
        <button
          onClick={requestAnalyticsReport}
          className="py-2 px-4 bg-blue-200 font-semibold rounded hover:bg-blue-300"
        >
          Get Analytics Report
        </button>
      </div>
    </div>
  );
}

export default Analytics;
