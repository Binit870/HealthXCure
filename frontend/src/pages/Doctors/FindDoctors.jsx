import React from "react";
import useDoctorSearch from "./useDoctorSearch";
import FilterPanel from "./FilterPanel";
import DoctorList from "./DoctorList";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

const FindDoctors = () => {
  const {
    filteredDoctors,
    cities,
    states,
    specializations,
    appliedCity,
    appliedState,
    appliedSpecialization,
    search,
    setSearch,
    tempCity,
    setTempCity,
    tempState,
    setTempState,
    tempSpecialization,
    setTempSpecialization,
    showFilters,
    setShowFilters,
    handleApplyFilters,
    handleOpenFilters,
    handleResetTempFilters,
    resetAllFilters,
    loading,
  } = useDoctorSearch();

  return (
    <div className="min-h-screen bg-teal-100 p-4 md:p-8">
      <h2 className="text-3xl font-bold text-teal-600 text-center mb-6">
        🩺 Find Doctors
      </h2>

      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <div className="relative w-full md:w-1/2 flex-grow">
          <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctor name, specialty, city, or state..."
            className="p-3 pl-10 border rounded-lg w-full bg-white shadow-sm focus:ring-teal-500 focus:border-teal-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          onClick={handleOpenFilters}
          className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-md w-full md:w-auto"
        >
          <FaFilter /> Filters
        </button>

        <button
          onClick={resetAllFilters}
          className="flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-md w-full md:w-auto"
        >
          <FaTimes /> Reset All
        </button>
      </div>

      {(appliedState || appliedCity || appliedSpecialization) && (
        <div className="text-center text-sm text-gray-600 mb-4">
          Active Filters:
          {appliedState && (
            <span className="mx-2 p-1 bg-teal-100 rounded">
              State: {appliedState}
            </span>
          )}
          {appliedCity && (
            <span className="mx-2 p-1 bg-teal-100 rounded">
              City: {appliedCity}
            </span>
          )}
          {appliedSpecialization && (
            <span className="mx-2 p-1 bg-teal-100 rounded">
              Specialty: {appliedSpecialization}
            </span>
          )}
        </div>
      )}

      {showFilters && (
        <FilterPanel
          states={states}
          cities={cities}
          specializations={specializations}
          tempState={tempState}
          setTempState={setTempState}
          tempCity={tempCity}
          setTempCity={setTempCity}
          tempSpecialization={tempSpecialization}
          setTempSpecialization={setTempSpecialization}
          onApply={handleApplyFilters}
          onClose={() => setShowFilters(false)}
          onResetTemp={handleResetTempFilters}
        />
      )}

      {/* Scrollable Doctor List */}
    <div className="h-[70vh] overflow-y-scroll scrollbar-show py-4">
  <DoctorList doctors={filteredDoctors} loading={loading} />
</div>


    </div>
  );
};

export default FindDoctors;
