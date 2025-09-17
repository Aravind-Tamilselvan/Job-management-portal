import React from 'react'
import { GoPersonAdd } from "react-icons/go";
import { LuBuilding2 } from "react-icons/lu";
import { PiStack } from "react-icons/pi";
import Skeleton from './Skeleton';

const JobBox = ({ data, isLoading }) => {
    const convertData = (job) => {
        return job.map((j) => {
            let logo;
            let points = j.jobDescription.split(".")
            let des = points.map((p, i) =>
                <p className='my-0' key={i}>
                    • {p}
                    <br />
                </p>);
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

            let salary = Math.floor(j.salaryRange.max / 100000)

            function timeAgo(date) {
                const now = new Date();
                const seconds = Math.floor((now - new Date(date)) / 1000);

                let interval = Math.floor(seconds / 31536000); // years
                if (interval >= 1) return interval === 1 ? "1 year Ago" : `${interval} years Ago`;

                interval = Math.floor(seconds / 2592000); // months
                if (interval >= 1) return interval === 1 ? "1 month Ago" : `${interval} months Ago`;

                interval = Math.floor(seconds / 86400); // days
                if (interval >= 1) return interval === 1 ? "1 day Ago" : `${interval}d Ago`;

                interval = Math.floor(seconds / 3600); // hours
                if (interval >= 1) return interval === 1 ? "1 hr Ago" : `${interval}hr Ago`;

                interval = Math.floor(seconds / 60); // minutes
                if (interval >= 1) return interval === 1 ? "1 min Ago" : `${interval}m Ago`;

                return "just now";
            }

            return {
                ...j,
                jobDescription: des,
                companyName: logo,
                salaryRange: salary,
                createdAt: timeAgo(j.createdAt)
            }
        })
    }

    const DATA = convertData(data || [])
    return (
        <div className='job-container'>
            {isLoading ?
                (
                    Array.from({ length: 4 }).map((_, index) => (
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
                                    <div className='company-info d-flex flex-column gap-3'>
                                        <h4 className='mb-0'>{job.jobTitle}</h4>
                                        <div className='d-flex justify-content-between'>
                                            <div className='job-info d-flex align-items-start gap-1'>
                                                <GoPersonAdd />
                                                <span>1-3 yr Exp</span>
                                            </div>
                                            <div className='job-info d-flex align-items-start gap-1'>
                                                <LuBuilding2 />
                                                <span>{job.location.split(',')[0]}</span>
                                            </div>
                                            <div className='job-info d-flex align-items-start gap-1'>
                                                <PiStack />
                                                <span>{job.salaryRange} LPA</span>
                                            </div>
                                        </div>
                                        <div className='company-info-des'>
                                            <>{job.jobDescription}</>
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