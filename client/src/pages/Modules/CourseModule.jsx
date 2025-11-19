import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCoursesModules } from "../../api/modules.api";
import { useSnackbar } from "notistack";

export const CourseModule = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { courseId } = useParams();
  const [modules, setModules] = useState([]);

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
  }, [courseId, enqueueSnackbar]); // dependencies

  return (
    <>
      <h1 className="font-bold">There are {modules.length} modules in this course</h1>

      {modules.map((module, index) => (
        <div
          key={module._id || index}
          className="p-9 border w-full rounded-lg shadow-md bg-gray-300 mt-6"
        >
          <h2 className="font-semibold">Module {index + 1}: {module.title}</h2>
          <p className="text-gray-600">{module.description}</p>
        </div>
      ))}
    </>
  );
};
