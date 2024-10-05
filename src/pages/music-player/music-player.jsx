import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import './music-player.css';

const LoadingAnimation = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-300"></div>
  </div>
);

export default function MusicPlayer() {
  const location = useLocation();
  const { album } = location.state;
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(new Audio(album.tracks[currentTrackIndex].trackUrl));

  useEffect(() => {
    audioRef.current.addEventListener('ended', handleNext);
    audioRef.current.addEventListener('canplay', handleCanPlay);
    return () => {
      audioRef.current.removeEventListener('ended', handleNext);
      audioRef.current.removeEventListener('canplay', handleCanPlay);
      audioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    const playAudio = async () => {
      try {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Playback failed", error);
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    };

    audioRef.current.src = album.tracks[currentTrackIndex].trackUrl;
    if (isPlaying) {
      playAudio();
    }
  }, [currentTrackIndex, album.tracks]);

  const handleCanPlay = () => {
    setIsLoading(false);
    if (isPlaying) {
      audioRef.current.play().catch(error => console.error("Playback failed", error));
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(error => console.error("Playback failed", error));
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => 
      prevIndex === album.tracks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prevIndex) => 
      prevIndex === 0 ? album.tracks.length - 1 : prevIndex - 1
    );
  };

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const changeTrack = (index) => {
    if (index === currentTrackIndex) return;
    audioRef.current.pause();
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="music-player-container rounded-xl flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8">
      <div className="w-full max-w-md bg-white bg-opacity-10 rounded-lg shadow-lg overflow-hidden">
        <img src={album.albumArtUrl} alt={album.albumName} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{album.albumName}</h2>
          <h3 className="text-lg text-purple-300 mb-4">{album.artists.join(', ')}</h3>
          <p className="text-sm text-purple-200 mb-6">{album.tracks[currentTrackIndex].trackName}</p>
          <div className="flex justify-between items-center mb-6">
            <button onClick={handlePrevious} className="text-purple-300 hover:text-white transition-colors" disabled={isLoading}>
              <SkipBack size={24} />
            </button>
            <button 
              onClick={togglePlayPause} 
              className="bg-purple-600 hover:bg-purple-700 rounded-full p-4 transition-colors w-16 h-16 flex items-center justify-center" 
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingAnimation />
              ) : isPlaying ? (
                <Pause size={24} />
              ) : (
                <Play size={24} />
              )}
            </button>
            <button onClick={handleNext} className="text-purple-300 hover:text-white transition-colors" disabled={isLoading}>
              <SkipForward size={24} />
            </button>
          </div>
          <button onClick={toggleMute} className="text-purple-300 hover:text-white transition-colors" disabled={isLoading}>
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>
      <div className="mt-8 w-full max-w-md">
        <h4 className="text-lg font-semibold mb-2">Tracklist</h4>
        <ul className="bg-white bg-opacity-10 rounded-lg overflow-hidden">
          {album.tracks.map((track, index) => (
            <li 
              key={index} 
              className={`px-4 py-2 cursor-pointer transition-colors ${
                index === currentTrackIndex 
                  ? 'bg-purple-600 text-white' 
                  : 'hover:bg-white hover:bg-opacity-20'
              }`}
              onClick={() => changeTrack(index)}
            >
              {track.trackName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}