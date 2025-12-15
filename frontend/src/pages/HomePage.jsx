import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(notes);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
      const response = await axios.get("http://localhost:5001/api/notes");
      setNotes(response.data)
      setIsRateLimited(false)
      setLoading(false);
      } catch (error) {
        console.log("error at fetching data from backend", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load Notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6 ">
        {loading && (
          <div className="text-center text-primary py-10">
            {" "}
            Loading Notes.......{" "}
          </div>
        )}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {notes.map((note) => (
             <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
