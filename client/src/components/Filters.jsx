import React from 'react'
import { IoSearchOutline, IoLocationOutline, IoPersonSharp } from "react-icons/io5";


const Filters = ({ filters, handleChange }) => {
    return (
        <div className="filter-container bg-white shadow-sm mt-4 rounded">
            <div className="d-flex align-items-center justify-content-between">

                <div className="d-flex align-items-center flex-grow-1 border-end pe-3">
                    <IoSearchOutline className="text-secondary me-2" />
                    <input
                        name='title'
                        type="text"
                        placeholder="Search By Job Title, Role"
                        className="form-control border-0 shadow-none"
                        value={filters.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="d-flex align-items-center flex-grow-1 border-end px-3">
                    <IoLocationOutline className="text-secondary me-2" />
                    <select
                        name='location'
                        className="form-select border-0 shadow-none"
                        value={filters.location}
                        onChange={handleChange}
                    >
                        <option>Preferred Location</option>
                        <option>Coimbatore</option>
                        <option>Chennai</option>
                        <option>Bangalore</option>
                    </select>
                </div>

                <div className="d-flex align-items-center flex-grow-1 border-end px-3">
                    <IoPersonSharp className="text-secondary me-2" />
                    <select
                        name='jobType' 
                        className="form-select border-0 shadow-none"
                        value={filters.jobType}
                        onChange={handleChange}
                    >
                        <option>Job type</option>
                        <option>Internship</option>
                        <option>Full Time</option>
                        <option>Part Time</option>
                        <option>Contract</option>
                    </select>
                </div>

                <div className="d-flex flex-column align-items-center flex-grow-1 px-4">
                    <div className='w-100 d-flex justify-content-between'>
                        <label className='text-bold'>Salary Per Month</label>
                        <span className='text-bold'>{filters.salary}-15 LPA</span>
                    </div>
                    <div className='w-100'>
                        <input 
                        type="range" 
                        name='salary'
                        className="form-range" 
                        min={0}
                        max={150000}
                        step={1000}
                        value={filters.salary}
                        onChange={handleChange} />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Filters