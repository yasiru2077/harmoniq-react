import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { songDatabase } from "./song-data-base";
import "./recommendatio-styles.css";

// User class to represent user preferences
class User {
  constructor(
    id,
    preferredGenres,
    preferredEra,
    energyPreference,
    danceabilityPreference
  ) {
    this.id = id;
    this.preferredGenres = preferredGenres;
    this.preferredEra = preferredEra;
    this.energyPreference = energyPreference;
    this.danceabilityPreference = danceabilityPreference;
  }
}

// Sample database of songs

const normalizeValue = (value, min, max) => (value - min) / (max - min);

const getUniqueGenres = () => [
  ...new Set(songDatabase.map((song) => song.genre)),
];

const getYearRange = () => {
  const years = songDatabase.map((song) => song.year);
  return [Math.min(...years), Math.max(...years)];
};

// Function to calculate similarity score between a song and user preferences
function calculateSimilarity(song, user) {
  let score = 0;
  const genreMatch = user.preferredGenres.includes(song.genre);
  const yearMatch =
    song.year >= user.preferredEra[0] && song.year <= user.preferredEra[1];
  const energyDiff = Math.abs(song.energy - user.energyPreference);
  const danceabilityDiff = Math.abs(
    song.danceability - user.danceabilityPreference
  );

  score += genreMatch ? 0.3 : 0;
  score += yearMatch ? 0.2 : 0;
  score += 0.25 * (1 - energyDiff);
  score += 0.25 * (1 - danceabilityDiff);

  // Bonus for exact genre match
  if (genreMatch) score += 0.1;

  // Penalty for songs too far from preferred era
  const yearDiff = Math.min(
    Math.abs(song.year - user.preferredEra[0]),
    Math.abs(song.year - user.preferredEra[1])
  );
  score -= yearDiff > 10 ? 0.1 : 0;

  return score;
}

// Main recommendation function
function getRecommendations(user, n = 5) {
  const scoredSongs = songDatabase.map((song) => ({
    song,
    score: calculateSimilarity(song, user),
  }));

  // Sort by score and add diversity bonus
  scoredSongs.sort((a, b) => b.score - a.score);

  const recommendations = [];
  const genreCounts = {};

  for (const item of scoredSongs) {
    if (recommendations.length >= n) break;

    const { song } = item;
    genreCounts[song.genre] = (genreCounts[song.genre] || 0) + 1;

    // Add diversity bonus
    if (genreCounts[song.genre] <= 2) {
      recommendations.push(song);
    } else if (Math.random() < 0.3) {
      // 30% chance to still include it
      recommendations.push(song);
    }
  }

  return recommendations;
}

function RecommendationPage() {
  const [genres, setGenres] = useState([]);
  const [era, setEra] = useState(getYearRange());
  const [energy, setEnergy] = useState(0.5);
  const [danceability, setDanceability] = useState(0.5);
  const [recommendations, setRecommendations] = useState([]);
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [yearRange, setYearRange] = useState([]);
  const [checkedGenres, setCheckedGenres] = useState({});
  

  useEffect(() => {
    setUniqueGenres(getUniqueGenres());
    setYearRange(getYearRange());
  }, []);

  const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    setCheckedGenres((prev) => ({ ...prev, [value]: checked }));
    if (checked) {
      setGenres((prev) => [...prev, value]);
    } else {
      setGenres((prev) => prev.filter((genre) => genre !== value));
    }
  };

  const handleEraChange = (event, index) => {
    const newEra = [...era];
    newEra[index] = parseInt(event.target.value);
    setEra(newEra);
  };

  const handleGetRecommendations = () => {
   
    const user = new User(1, genres, era, energy, danceability);
    const newRecommendations = getRecommendations(user);
    setRecommendations(newRecommendations);

  };

  useEffect(() => {
    if (recommendations.length > 0) {
      const element = document.getElementById("recommendations");
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [recommendations]);

  const chartData = recommendations.map((song) => ({
    name: song.title,
    energy: song.energy,
    danceability: song.danceability,
  }));

  return (
    <div className=" mx-auto bg-white rounded-xl">
      <h2 className="text-[22px] font-bold mb-6">Find what you want</h2>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Genres</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-4 gap-2">
            {uniqueGenres.map((genre) => (
              <label
                key={genre}
                className={`flex items-center ${
                  checkedGenres[genre] ? "bg-[#BBA5FF]" : "bg-[#B7E0FF]"
                } pl-[5px] p-[2px] rounded-[4px] space-x-2`}
              >
                <input
                  type="checkbox"
                  value={genre}
                  onChange={handleGenreChange}
                  className="hidden"
                />
                <span className="font-medium">{genre}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Preferred Era</h3>
          <div className="flex space-x-4 items-center">
            <input
              type="number"
              value={era[0]}
              onChange={(e) => handleEraChange(e, 0)}
              min={yearRange[0]}
              max={yearRange[1]}
              className="w-24 p-2 border font-medium bg-[#B7E0FF] rounded"
            />
            <span>-</span>
            <input
              type="number"
              value={era[1]}
              onChange={(e) => handleEraChange(e, 1)}
              min={yearRange[0]}
              max={yearRange[1]}
              className="w-24 p-2 border font-medium bg-[#B7E0FF] rounded"
            />
          </div>
        </div>
      </div>

      <div className="my-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Energy: {energy}</h3>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={energy}
            onChange={(e) => setEnergy(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">
            Danceability: {danceability}
          </h3>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={danceability}
            onChange={(e) => setDanceability(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <button
        onClick={handleGetRecommendations}
        className="w-full bg-[#B7E0FF] text-black p-3 rounded-lg text-lg font-semibold transition duration-300"
      >
        Get Recommendations
      </button>

      <section id="recommendations">
        {recommendations.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Recommendations:</h3>
            <ul className="space-y-2">
              {recommendations.map((song) => (
                <li key={song.id} className="bg-gray-100 p-3 rounded-lg">
                  <span className="font-semibold">{song.title}</span> by{" "}
                  {song.artist}
                  <br />
                  <span className="text-sm text-gray-600">
                    {song.genre}, {song.year} | Energy: {song.energy.toFixed(2)}{" "}
                    | Danceability: {song.danceability.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4">
                Energy and Danceability Comparison
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="energy" fill="#8884d8" />
                  <Bar dataKey="danceability" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default RecommendationPage;
