import React from 'react'

const Skeleton = ({index}) => {
    return (
        <div className='job-box p-3 skeleton-box' key={index}>
            <div className='d-flex flex-column gap-2'>
                <div className='company mb-2 d-flex justify-content-between align-items-start'>
                    <div className='company-image skeleton-circle'></div>
                    <span className='skeleton-line w-25'></span>
                </div>
                <div className='company-info d-flex flex-column gap-2'>
                    <h4 className='skeleton-line w-75'></h4>
                    <div className='d-flex justify-content-between'>
                        <span className='skeleton-line w-25'></span>
                        <span className='skeleton-line w-25'></span>
                        <span className='skeleton-line w-25'></span>
                    </div>
                    <div className='company-info-des'>
                        <p className='skeleton-line w-100'></p>
                        <p className='skeleton-line w-75'></p>
                    </div>
                </div>
            </div>
            <button className='skeleton-line w-50'></button>
        </div>
    )
}

export default Skeleton