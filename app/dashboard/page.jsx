"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import VideoList from "./_components/VideoList";
import { db } from "configs/db";
import { VideoData } from "configs/schema";
import { eq, desc } from "drizzle-orm";
import { UserDetailContext } from "app/_context/UserDetailContext"; // Import UserDetailContext
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DEFAULT_VIDEOS_PER_PAGE = 6;
const PAGE_SIZE_OPTIONS = [6, 12, 24];

function Dashboard() {
  const { user } = useContext(UserDetailContext);
  const [videoList, setVideoList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalVideos, setTotalVideos] = useState(0);
  const [loading, setLoading] = useState(false);
  const [videosPerPage, setVideosPerPage] = useState(DEFAULT_VIDEOS_PER_PAGE);

  useEffect(() => {
    if (user) {
      fetchVideos();
      countVideos();
    }
  }, [user, page, videosPerPage]);

  const countVideos = async () => {
    try {
      const result = await db
        .select({ count: VideoData.id })
        .from(VideoData)
        .where(eq(VideoData.createdBy, user?.pi_username));

      setTotalVideos(result.length);
    } catch (error) {
      console.error("Failed to count videos:", error);
      setTotalVideos(0);
    }
  };
  
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * videosPerPage;
      const result = await db
        .select()
        .from(VideoData)
        .where(eq(VideoData.createdBy, user?.pi_username))
        .orderBy(desc(VideoData.id))
        .limit(videosPerPage)
        .offset(offset);
      setVideoList(result);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
      setVideoList([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
    const handlePageSizeChange = (pageSize) => {
    setVideosPerPage(parseInt(pageSize));
    setPage(1); // Reset to first page when changing page size
  };
  const totalPages = Math.ceil(totalVideos / videosPerPage);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-3xl text-primary ">Dashboard</h2>
        <Link href={"/dashboard/create-video"}>
          <Button className="font-bold">+ Create New </Button>
        </Link>
      </div>
      {/* Empty State */}
      <div className="flex flex-col">
         <div className="flex justify-end items-center">
        <Select onValueChange={handlePageSizeChange} defaultValue={String(DEFAULT_VIDEOS_PER_PAGE)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Videos Per Page" />
            </SelectTrigger>
            <SelectContent>
                {PAGE_SIZE_OPTIONS.map(size => (
                    <SelectItem key={size} value={String(size)}>
                        {size}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
      </div>
        {loading ? (
           <div className="flex justify-center items-center">
           Loading...
         </div>
        ) : videoList?.length === 0 ? (
          <div className="flex justify-center items-center">
            <EmptyState
              title={"video"}
              message={"video"}
              buttonTitle={" new video"}
            />
                      </div>
        ) : (
          // Video List
          <div className="flex items-center">
            <VideoList videoList={videoList} />
          </div>
        )}
          {videoList?.length > 0 && (
              <div className="mt-4 flex justify-center items-center gap-2">
                   <Button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span>
                {page} of {totalPages}
                </span>
                <Button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
      </div>
    </div>
  );
}

export default Dashboard;
