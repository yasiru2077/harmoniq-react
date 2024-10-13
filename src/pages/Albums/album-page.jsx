import React, { useEffect, useState } from "react";
import "./album-page.css";
import axios from "axios";
import Search from "../../components/search/search";
import { Loader, PencilIcon, TrashIcon, X, XIcon } from "lucide-react";
import AdminNavigation from "../navigator/admin-navigation";

function AlbumPage() {
  const [albums, setAlbums] = useState([]);
  const [stats, setStats] = useState({ totalAlbums: 0, totalTracks: 0 });
  const [files, setFiles] = useState({ albumArt: null, tracks: [] });
  const [filter, setFilter] = useState({
    genre: "",
    albumName: "",
    artists: "",
    trackName: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  const [albumDetails, setAlbumDetails] = useState({
    albumName: "",
    albumYear: "",
    genre: "",
    artists: "",
    bandComposition: "",
    trackLabels: "",
  });
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedFiles, setSelectedFiles] = useState({
    albumArt: null,
    tracks: []
  });
  const [filesToRemove, setFilesToRemove] = useState({
    albumArt: false,
    tracks: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust this time as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setSelectedFiles({
      albumArt: null,
      tracks: []
    });
    setFilesToRemove({
      albumArt: false,
      tracks: []
    });
  }, [albumDetails]);

  const handleFileSelection = (event, fileType) => {
    const files = event.target.files;
    if (fileType === 'albumArt') {
      setSelectedFiles(prev => ({ ...prev, albumArt: files[0] }));
    } else if (fileType === 'tracks') {
      setSelectedFiles(prev => ({ ...prev, tracks: [...prev.tracks, ...files] }));
    }
    handleFileChange(event);
  };

  const handleRemoveFile = (fileType, index) => {
    if (fileType === 'albumArt') {
      setFilesToRemove(prev => ({ ...prev, albumArt: true }));
      setSelectedFiles(prev => ({ ...prev, albumArt: null }));
    } else if (fileType === 'tracks') {
      setFilesToRemove(prev => ({ ...prev, tracks: [...prev.tracks, index] }));
    }
  };

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
  }, [albums]);

  const filterAlbums = () => {
    return albums.filter((album) => {
      return (
        (!filter.genre ||
          album.genre.toLowerCase().includes(filter.genre.toLowerCase())) &&
        (!filter.albumName ||
          album.albumName
            .toLowerCase()
            .includes(filter.albumName.toLowerCase())) &&
        (!filter.artists ||
          album.artists
            .join(", ")
            .toLowerCase()
            .includes(filter.artists.toLowerCase())) &&
        (!filter.trackName ||
          album.tracks.some((track) =>
            track.trackName
              .toLowerCase()
              .includes(filter.trackName.toLowerCase())
          ))
      );
    });
  };

  const handleUpdateSelectedAlbum =()=>{
    // setIsEditing(true); 
    setIsEditModalOpen(true);
  }

  const handleDeleteSelectedAlbum = (album) => {
    
    setSelectedAlbum(album);
    if (album) {
      handleDeleteAlbum(album.albumId);
      setSelectedAlbum(null);
    }
       // Clear the selected album after deletion
  };

  const handleDeleteAlbum = async (albumId) => {
    console.log("hello");
    
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this album?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://zzb1t95lb3.execute-api.ap-south-1.amazonaws.com/Development/albums/${albumId}`
      );
      alert("Album deleted successfully");
      setAlbums(albums.filter((album) => album.albumId !== albumId)); // Remove the deleted album from state
    } catch (error) {
      console.error("Error deleting album:", error);
      alert("Failed to delete album");
    }
  };

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
    setAlbumDetails(album);
   
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAlbumDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (name === "albumArt") {
      setFiles((prev) => ({ ...prev, albumArt: files[0] }));
    } else if (name === "tracks") {
      setFiles((prev) => ({ ...prev, tracks: [...prev.tracks, ...files] }));
    }
  };

  const handleUpdateAlbum = async (event) => {
    event.preventDefault()
    
    if (!selectedAlbum) {
      alert("No album selected for update.");
      return;
    }

    try {
      setUploadStatus("Updating...")
      // Step 1: Upload new album art to S3 if a new file is selected
      let albumArtUrl = selectedAlbum.albumArtUrl; // Keep existing URL if no new file is selected
      if (files.albumArt) {
        const albumArtResponse = await axios.post(
          "https://zzb1t95lb3.execute-api.ap-south-1.amazonaws.com/Development/genarateS3Link",
          {
            fileName: files.albumArt.name,
            fileType: files.albumArt.type,
          }
        );
        const { uploadUrl } = albumArtResponse.data;
        await axios.put(uploadUrl, files.albumArt, {
          headers: { "Content-Type": files.albumArt.type },
        });
        albumArtUrl = uploadUrl.split("?")[0]; // Use the new URL
      }

      // Step 2: Upload new tracks to S3 if new files are selected
      let updatedTracks = selectedAlbum.tracks; // Keep existing tracks if no new files are selected
      if (files.tracks && files.tracks.length > 0) {
        const trackUrls = [];
        for (const track of files.tracks) {
          const trackResponse = await axios.post(
            "https://zzb1t95lb3.execute-api.ap-south-1.amazonaws.com/Development/genarateS3Link",
            {
              fileName: track.name,
              fileType: track.type,
            }
          );
          const { uploadUrl: trackUploadUrl } = trackResponse.data;
          await axios.put(trackUploadUrl, track, {
            headers: { "Content-Type": track.type },
          });
          trackUrls.push({
            trackName: track.name,
            trackUrl: trackUploadUrl.split("?")[0], // Use the new URL
            trackLabel: "Sony Music", // Example label, replace as necessary
          });
        }
        updatedTracks = trackUrls; // Use the newly uploaded tracks
      }

      // Step 3: Ensure artists is always a string before splitting
      const updatedArtists = Array.isArray(albumDetails.artists)
        ? albumDetails.artists
        : albumDetails.artists.split(",").map((artist) => artist.trim());

      // Step 4: Prepare the updated album metadata
      const updatedAlbum = {
        ...albumDetails,
        artists: updatedArtists,
        albumYear: parseInt(albumDetails.albumYear),
        albumArtUrl: albumArtUrl, // Use the new or existing album art URL
        tracks: updatedTracks, // Use the new or existing tracks
      };

      // Step 5: Send updated data to the backend (DynamoDB)
      const response = await axios.put(
        `https://zzb1t95lb3.execute-api.ap-south-1.amazonaws.com/Development/albums/${selectedAlbum.albumId}`,
        updatedAlbum
      );

      // Check if response status indicates success
      try {
        setUploadStatus("Updated successfully!");
        alert("Album updated successfully!");
        setAlbums(
          albums.map((album) =>
            album.albumId === selectedAlbum.albumId ? updatedAlbum : album
          )
        ); // Update album list with updated album

        // Refresh the page after successful update
        // window.location.reload();
        setIsEditModalOpen(false); 
      } catch {
        throw new Error("Failed to update album");
      }
    } catch (error) {
      setUploadStatus("Failed to update album");
      console.error("Error updating album:", error);
      alert("Failed to update album");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <Loader className="w-16 h-16 mx-auto text-blue-500 animate-spin" />
          <p className="mt-4 text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="album-page">
      <AdminNavigation />
      <Search />

      <div className="container mx-auto px-4 py-8 bg-[#E8EEF3] rounded-[12px] mb-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Manage Your Albums
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filterAlbums().map((album) => (
            <div
              onClick={() => {handleAlbumClick(album)}}
              key={album.albumId}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative">
                <img
                  src={album.albumArtUrl}
                  alt={album.albumName}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button onClick={handleUpdateSelectedAlbum} className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition duration-200">
                    <PencilIcon  className="w-4 h-4 text-white" />
                  </button>
                  <button
                    // onClick={handleDeleteSelectedAlbum}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents triggering album selection twice
                      handleAlbumClick(album); // Select the album first
                      handleDeleteSelectedAlbum(album); // Proceed with deletion
                    }}
                    className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition duration-200"
                  >
                    <TrashIcon className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold capitalize text-gray-100 mb-2">
                  {album.albumName}
                </h3>
                <h5 className="text-[16px] font-medium capitalize text-gray-300 mb-2">
                  {album.genre}
                </h5>
                <p className="text-gray-400 relative bottom-0 text-sm mb-1">
                  Play Count: {album.playCount || 0}
                </p>
              </div>
            </div>
          ))}
        </div>
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-[#E8EEF3] bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#E8EEF3] p-6 rounded-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Edit Album
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-900"
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="albumName"
                    className="block text-gray-900 mb-2"
                  >
                    Album Name
                  </label>
                  <input
                    type="text"
                    id="albumName"
                    name="albumName"
                    value={albumDetails.albumName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-300 text-black p-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="genre" className="block text-gray-900 mb-2">
                    Genre
                  </label>
                  <input
                    type="text"
                    id="genre"
                    name="genre"
                    onChange={handleInputChange}
                    value={albumDetails.genre}
                    className="w-full bg-gray-300 text-black p-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="albumYear"
                    className="block text-gray-900 mb-2"
                  >
                    Album year
                  </label>
                  <input
                    type="number"
                    id="albumYear"
                    name="albumYear"
                    onChange={handleInputChange}
                    value={albumDetails.albumYear}
                    className="w-full bg-gray-300 text-black p-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="artists" className="block text-gray-900 mb-2">
                    artists
                  </label>
                  <input
                    type="text"
                    name="artists"
                    className="w-full bg-gray-300 text-black p-2 rounded"
                    onChange={handleInputChange}
                    value={albumDetails.artists}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="artists" className="block text-gray-900 mb-2">
                    Band Composition
                  </label>
                  <input
                    type="text"
                    name="bandComposition"
                    className="w-full bg-gray-300 text-black p-2 rounded"
                    onChange={handleInputChange}
                    value={albumDetails.bandComposition}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="albumArt"
                    className="block text-gray-900 mb-2"
                  >
                    album image
                  </label>
                  {albumDetails.albumArtUrl && !filesToRemove.albumArt ? (
                <div className="flex items-center mb-2">
                  <img src={albumDetails.albumArtUrl} alt="Album Art" className="w-16 h-16 object-cover mr-2" />
                <button type="button" onClick={() => handleRemoveFile('albumArt')} className="text-red-500">
                  <X className="w-4 h-4" />
                </button>
              </div>
               ) : (
                <input
                    type="file"
                    name="albumArt"
                    accept="image/*"
                    className="p-2 bg-gray-800 rounded"
                    onChange={handleFileChange}
                    // value={albumDetails.albumArt}
                  />
                )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="playCount"
                    className="block text-gray-900 mb-2"
                  >
                    album tracks
                  </label>
                  <input
                    type="file"
                    name="tracks"
                    accept="audio/*"
                    multiple
                    className="p-2 bg-gray-300 rounded"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 border-gray-400 border-2 border-solid text-black rounded hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                   type="submit"
                    onClick={handleUpdateAlbum}
                    className="px-4 py-2 bg-blue-200 text-black rounded hover:bg-blue-300"
                  >
                    Save Changes
                  </button>
                </div>
                 <h4 className="font-bold">
                  {uploadStatus && <p>{uploadStatus}</p>}
                  </h4> 
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlbumPage;
