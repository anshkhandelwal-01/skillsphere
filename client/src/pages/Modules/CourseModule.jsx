import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCoursesModules } from "../../api/modules.api";
import { useSnackbar } from "notistack";
import {
  ChevronDown,
  ChevronUp,
  TvMinimalPlay,
  BookOpenText,
  ClipboardList,
} from "lucide-react";
import { Divider } from "@mui/material";

export const CourseModule = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { courseId } = useParams();
  const [modules, setModules] = useState([]);
  const [showMaterials, setShowMaterials] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await getCoursesModules(courseId);
        setModules(data);
      } catch (error) {
        console.error("Error fetching modules:", error);
        enqueueSnackbar("Failed to load modules. Please try again later.", {
          variant: "error",
        });
      }
    };

    fetchModules();
  }, [courseId, enqueueSnackbar]);

  const toggleModule = (index) => {
    setShowMaterials(showMaterials === index ? null : index);
  };

  return (
    <>
      <h1 className="font-bold">
        There are {modules.length} modules in this course
      </h1>

      <div className="mt-4 border p-2 border-gray-200 rounded-lg">
        {modules.map((module, index) => (
          <div key={module._id || index}>
            {/* CLICKABLE ROW */}
            <div
              onClick={() => toggleModule(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
              className="flex justify-between items-center p-6 mt-3 hover:bg-blue-100 rounded-lg cursor-pointer"
            >
              {/* Title + Hover text */}
              <div className="flex flex-col">
                <h2 className="font-semibold">
                  Module {index + 1}: {module.title}
                </h2>

                {hover === index && (
                  <p className="text-blue-800 text-sm font-semibold">
                    Module Details
                  </p>
                )}
              </div>

              {/* Arrow Icon */}
              <div className="text-blue-600 flex items-center">
                {showMaterials === index ? (
                  <ChevronUp className="mr-2" />
                ) : (
                  <ChevronDown className="mr-2" />
                )}
              </div>
            </div>

            {/* MATERIALS SECTION */}
            {showMaterials === index && (
              <div className="bg-gray-50 rounded-lg px-6 pb-4 mt-3">
                <h3 className="font-semibold mb-3">What's Included</h3>

                <div className="flex flex-col space-y-3">
                  <div className="flex items-center gap-3">
                    <TvMinimalPlay className="text-blue-700" />
                    <p className="text-gray-700 font-medium">Video</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <BookOpenText className="text-green-700" />
                    <p className="text-gray-700 font-medium">Reading</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <ClipboardList className="text-purple-700" />
                    <p className="text-gray-700 font-medium">Assignment</p>
                  </div>
                </div>
              </div>
            )}

            <Divider className="my-4" />
          </div>
        ))}
      </div>
    </>
  );
};
