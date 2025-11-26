import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const Reading = ({ readingData }) => {
  const pages = readingData?.pages || [];
  const [page, setPage] = useState(0);

  if (!pages.length) return <p>No reading available</p>;

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex justify-between items-center mb-3 px-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-300"
        >
          <ChevronLeft />
        </button>

        <p className="font-semibold">
          Page {page + 1} of {pages.length}
        </p>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === pages.length - 1}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-300"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Page */}
      <div className="w-full h-[600px] overflow-y-scroll border rounded-lg shadow p-2 bg-white">
        <img src={pages[page]} className="w-full rounded-lg" />
      </div>
    </div>
  );
};

export default Reading;
