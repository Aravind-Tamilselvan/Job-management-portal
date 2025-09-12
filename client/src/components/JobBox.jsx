import React from 'react'
import { GoPersonAdd } from "react-icons/go";
import { LuBuilding2 } from "react-icons/lu";
import { PiStack } from "react-icons/pi";
import Skeleton from './Skeleton';

const JobBox = ({ data, isLoading }) => {
    const convertData = (job) => {
        return job.map((j) => {
            let logo;
            switch (j.companyName) {
                case 'Amazon':
                    logo = '/amazon.png'
                    break
                case 'Swiggy':
                    logo = '/Swiggy.png'
                    break
                case 'Microsoft':
                    logo = '/Microsoft.svg'
                    break
                case 'Tesla':
                    logo = '/tesla.jpg'
                    break
                default:
                    logo = '/vite.svg'
            }

            let salary = Math.floor(j.salaryRange / 100000)

            function timeAgo(date) {
                const now = new Date();
                const seconds = Math.floor((now - new Date(date)) / 1000);

                let interval = Math.floor(seconds / 31536000); // years
                if (interval >= 1) return interval === 1 ? "1 year ago" : `${interval} years ago`;

                interval = Math.floor(seconds / 2592000); // months
                if (interval >= 1) return interval === 1 ? "1 month ago" : `${interval} months ago`;

                interval = Math.floor(seconds / 86400); // days
                if (interval >= 1) return interval === 1 ? "1 day ago" : `${interval} days ago`;

                interval = Math.floor(seconds / 3600); // hours
                if (interval >= 1) return interval === 1 ? "1 hr ago" : `${interval} hrs ago`;

                interval = Math.floor(seconds / 60); // minutes
                if (interval >= 1) return interval === 1 ? "1 min ago" : `${interval} mins ago`;

                return "just now";
            }

            return {
                ...j,
                companyName: logo,
                salaryRange: salary,
                createdAt : timeAgo(j.createdAt)
            }
        })
    }

    const DATA = convertData(data || [])
    return (
        <div className='job-container'>
            {isLoading ?
                (
                    Array.from({ length: 8 }).map((_, index) => (
                        <Skeleton index={index} />
                    ))
                ) :
                (
                    <>
                        {DATA.map((job) => (
                            <div className='job-box p-3' key={job._id}>
                                <div className='d-flex flex-column gap-2'>
                                    <div className='company mb-2 d-flex justify-content-between align-items-start'>
                                        <div className='company-image d-flex align-items-center justify-content-center'>
                                            <img src={job.companyName} />
                                        </div>
                                        <span>{job.createdAt}</span>
                                    </div>
                                    <div className='company-info d-flex flex-column gap-2'>
                                        <h4 className='mb-0'>{job.jobTitle}</h4>
                                        <div className='d-flex justify-content-between'>
                                            <div className='d-flex align-items-center gap-1'>
                                                <GoPersonAdd />
                                                <span>1-3Yr Exp</span>
                                            </div>
                                            <div className='d-flex align-items-center gap-1'>
                                                <LuBuilding2 />
                                                <span>{job.location.split(',')[0]}</span>
                                            </div>
                                            <div className='d-flex align-items-center gap-1'>
                                                <PiStack />
                                                <span>{job.salaryRange} LPA</span>
                                            </div>
                                        </div>
                                        <div className='company-info-des'>
                                            <p>{job.jobDescription}</p>
                                        </div>
                                    </div>
                                </div>
                                <button>Apply now</button>
                            </div>
                        ))
                        }</>
                )}
        </div>

    )
}

export default JobBox