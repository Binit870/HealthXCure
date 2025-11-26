import React from "react";
import DoctorCard from "./DoctorCard";
import { FaSpinner } from "react-icons/fa";

const DoctorList = ({ doctors, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <FaSpinner className="animate-spin text-teal-500 text-3xl mr-2" />
        <p className="text-gray-500">Loading doctors...</p>
      </div>
    );
  }

  if (!doctors || doctors.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        No doctors found matching the current criteria.
      </p>
    );
  }

  return (
   <div className="w-full px-4 md:px-8">
  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
    {doctors.map((doc, idx) => (
      <div key={idx} className="w-full flex">
        <DoctorCard doc={doc} />
      </div>
    ))}
  </div>
</div>


  );
};

export default DoctorList;
