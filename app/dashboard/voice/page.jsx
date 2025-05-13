"use client";
import React, { useContext,useEffect, useState } from "react";
import { db } from "configs/db";
import { Voices } from "configs/schema";
import { eq,  } from "drizzle-orm";
import EmptyState from "../_components/EmptyState";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserContext } from "app/_context/UserContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";


const DEFAULT_ITEMS_PER_PAGE = 6;
const PAGE_SIZE_OPTIONS = [3, 6, 9, 12];

function VoiceGeneration() {
    const { user } = useContext(UserContext);
    const [voiceGenerations, setVoiceGenerations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
    const [voiceToDelete, setVoiceToDelete] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchVoiceGenerations = async () => {
          if (!user) return;
    
          const voices = await db
            .select()
            .from(Voices)
            .where(eq(Voices.userId, user.id));
    
          // Sort voices by createdAt in descending order
          voices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setVoiceGenerations(voices);
          setCurrentPage(1); // Reset to first page when new data is loaded
        };
    
        fetchVoiceGenerations();
    }, [user]);


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedVoices = voiceGenerations.slice(startIndex, endIndex);

  const totalPages = Math.ceil(voiceGenerations.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1); // Reset page number when the number of items per page changes
  };

   const handleDeleteVoice = async (voiceId) => {
    setVoiceToDelete(voiceId);
    setIsDeleteModalOpen(true);

    };

    const confirmDeleteVoice = async () => {
        if(voiceToDelete) {
          try {
            await db.delete(Voices).where(eq(Voices.id, voiceToDelete));
            setVoiceGenerations(voiceGenerations.filter((voice) => voice.id !== voiceToDelete));
              // Reset voice to delete and close modal
            setVoiceToDelete(null);
            setIsDeleteModalOpen(false);
          } catch (error) {
           console.error("Error deleting voice:", error);
           // Handle error case
          }
        }

    };


     const cancelDeleteVoice = () => {
        setVoiceToDelete(null);
        setIsDeleteModalOpen(false);
     };

  const renderPaginationButtons = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 rounded-md  ${
            currentPage === i
              ? "bg-primary text-white font-bold"
              : "bg-gray-700 hover:bg-gray-600 text-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard")}
        >
          Back
        </Button>
        <h2 className="text-2xl font-bold">Your Voice Generations</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        {/* Items per page select */}
        <div className="flex items-center">
          <span className="mr-2 text-gray-300 text-sm">Items per page:</span>
          <Select
            onValueChange={handleItemsPerPageChange}
            defaultValue={String(DEFAULT_ITEMS_PER_PAGE)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={`${itemsPerPage}`} />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Empty State */}
      <div>
        {voiceGenerations.length === 0 ? (
          <div className="flex justify-center items-center">
            <EmptyState
              isVideo={false}
              title={"Voice"}
              message={"No voice generations found."}
              buttonTitle={"Create New Voice"}
            />
          </div>
        ) : (
          <>
            {/* Voice List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedVoices.map((voice, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 relative"
                >
                  <button
                    onClick={() => handleDeleteVoice(voice.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition duration-200 ease-in-out"
                  >
                    <Trash2 className="h-4 w-4"/>
                  </button>
                  <h2 className="text-gray-300">
                    Title:{" "}
                    {voice.voiceTitle ||
                      voice.audioUrl.split("/").pop().split(".")[0] ||
                      "Not specified"}
                  </h2>
                  <p className="text-gray-300">
                    Generated on: {new Date(voice.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300">
                    Language: {voice.language || "Not specified"}
                  </p>
                  <p className="text-gray-300">
                    Gender: {voice.gender || "Not specified"}
                  </p>
                  <p className="text-gray-300">
                    Speech rate: {voice.rate || "Not specified"}
                  </p>
                  <p className="text-gray-300">
                    Pitch: {voice.pitch || "Not specified"}
                  </p>
                  <audio controls className="w-full my-5">
                    <source src={voice.audioUrl} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center mt-5">
                {renderPaginationButtons()}
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this voice generation?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDeleteVoice}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteVoice}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default VoiceGeneration;

