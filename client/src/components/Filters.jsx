import React from 'react'
import { IoSearchOutline, IoLocationOutline, IoPersonSharp } from "react-icons/io5";
import Slider from '@mui/material/Slider';

const Filters = ({ filters, setFilters, maxSalary, handleChange }) => {
    const handleSalaryChange = (event, newValue) => {
        setFilters((prev) => ({
          ...prev,
          salary: { min: newValue[0], max: newValue[1] },
        }));
      };

    const minValue = Math.floor(filters.salary.min/10000)
    const maxValue = Math.floor(filters.salary.max/10000)
    return (
        <div className="filter-container bg-white shadow-sm mt-5">
            <div className="d-flex align-items-center justify-content-between">
                <div className="filter-box d-flex align-items-center flex-grow-1 border-2 border-end pe-4">
                    <IoSearchOutline className="text-secondary me-2" />
                    <input
                        name='title'
                        type="text"
                        placeholder="Search By Job Title, Role"
                        className="form-control h-100 border-0 shadow-none"
                        value={filters.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="filter-box d-flex align-items-center flex-grow-1 border-2 border-end px-4">
                    <IoLocationOutline className="text-secondary me-2" />
                    <input
                        name='location'
                        placeholder='Preferred Location'
                        className='form-control border-0 shadow-none'
                        type='text'
                        value={filters.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="filter-box d-flex align-items-center flex-grow-1 border-2 border-end px-4">
                    <IoPersonSharp className="text-secondary me-2" />
                    <select
                        name='jobType'
                        className="form-select border-0 shadow-none select-box"
                        value={filters.jobType}
                        onChange={handleChange}
                    >
                        <option value={''} disabled hidden>Job type</option>
                        <option>Internship</option>
                        <option>Full Time</option>
                        <option>Part Time</option>
                        <option>Contract</option>
                    </select>
                </div>

                <div className="filter-box d-flex flex-column align-items-center flex-grow-1 px-4">
                    <div className='w-100 d-flex justify-content-between'>
                        <label style={{fontWeight:'500'}}>Salary Per Month</label>
                        <span style={{fontWeight:'500'}}>₹{minValue.toLocaleString()}K - ₹{maxValue.toLocaleString()}K</span>
                    </div>
                    <div className='filter-slider'>
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={[filters.salary.min, filters.salary.max]}
                            valueLabelDisplay="auto"
                            onChange={handleSalaryChange}
                            min={0}
                            max={maxSalary}
                            step={1000}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Filters
