import React, { useState, useEffect } from "react";
import JobBox from "./JobBox";
import Filters from "./Filters";
import { useGetJobsApiQuery } from "../redux/slices/api/jobApiSlice";

const Container = () => {
  const { data, error, isLoading } = useGetJobsApiQuery();
  const jobs = data?.jobs || [];

  const maxSalary = jobs.length
    ? Math.max(...jobs.map((j) => j.salaryRange.max))
    : 100000; 

  // state for filter inputs
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    jobType: "",
    salary: {
      min: 0,
      max: maxSalary
    },
  });

  // state for filtered jobs
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // keep salary max in sync if jobs update
  useEffect(() => {
    if (jobs.length) {
      const maxJobSalary = Math.max(...jobs.map((j) => j.salaryRange.max));
      setFilters((prev) => ({
        ...prev,
        salary: {
          ...prev.salary,
          max: maxJobSalary,
        },
      }));
    }
  }, [jobs]);

  useEffect(() => {
    const filtered = jobs.filter((j) => {
      const matchesTitle = filters.title
        ? j.jobTitle.toLowerCase().includes(filters.title.toLowerCase())
        : true;

      const matchesLocation = filters.location
        ? j.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;


      const matchesJobType = filters.jobType
        ? j.jobType.toLowerCase() === filters.jobType.toLowerCase()
        : true;

      const matchesSalary = filters.salary ?
        j.salaryRange.min >= filters.salary.min && j.salaryRange.max <= filters.salary.max 
        : true;

      return matchesTitle && matchesLocation && matchesJobType && matchesSalary;
    });

    setFilteredJobs(filtered);
  }, [filters, jobs]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  if (error) {
    console.log(error);
  }


  return (
    <>
      <Filters filters={filters} setFilters={setFilters} handleChange={handleChange} maxSalary ={maxSalary} />
      <div className="mx-0 w-100 d-flex justify-content-center">
        <JobBox data={filteredJobs} isLoading={isLoading} />
      </div>
    </>
  );
};

export default Container;
