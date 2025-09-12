import React, { useEffect, useState, useRef, useContext } from 'react'
import { dataContext } from '../App'
import { FaAngleDoubleRight, FaAngleDoubleUp } from "react-icons/fa";
import { HiArrowsUpDown } from "react-icons/hi2";
import { useJobPostApiMutation } from '../redux/slices/api/jobApiSlice';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';



const CreateJob = () => {
    const [jobPostApi, { isLoading }] = useJobPostApiMutation()
    const { register, handleSubmit, reset, getValues, setValue } = useForm()
    const { showOverlay, setShowOverlay } = useContext(dataContext)
    const formRef = useRef(null)
    const [draft, setDraft] = useState({})

    // to avoid background scroll
    useEffect(() => {
        if (showOverlay) {
            document.body.style.overflow = 'hidden'; // disable background scroll
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto'; // cleanup
        };
    }, [showOverlay]);

    // To escape tab when clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setShowOverlay(false);
                setDraft({})
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // function  for sending data to api
    const onSubmit = async (data) => {
        try {
            const formattedData = {
                ...data,
                salaryRange: data.salaryMax,
            }

            const res = await jobPostApi(formattedData).unwrap()
            toast.success(res.message || "Job Posted Successfully")
            reset()
            setShowOverlay(false)
        } catch (error) {
            toast.error(error?.data?.message || error?.error || "Failed to post job");
        }
    }

    // for drafting 
    const handleDraft = () => {
        const currentData = getValues()
        setDraft(currentData)
        setShowOverlay(false)
        toast.success('Draft Saved')
    }

    useEffect(() => {
        if (showOverlay && draft) {
            Object.keys(draft).forEach(key => setValue(key, draft[key]));
        }
    }, [showOverlay, draft, setValue]);


    return (
        <>
            {showOverlay && <div className='createTask'>
                <div className='createTask-tab p-4' ref={formRef}>
                    <h4 className='text-center mb-4'>Create Job Opening</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='d-flex flex-column gap-3 mt-5'>
                            <div className='d-flex gap-2'>
                                <div className='input-group'>
                                    <label className='form-label'>Job Title</label>
                                    <div>
                                        <input
                                            type='text'
                                            className="form-control"
                                            {...register("jobTitle", { required: true })}
                                            placeholder='Frontend Developer,Software Engineer'
                                        />
                                    </div>
                                </div>
                                <div className='input-group'>
                                    <label className='form-label'>Assign Task to</label>
                                    <div>
                                        <input type='text' className='form-control'
                                            placeholder='Amazon,Microsoft,Swiggy'
                                            {...register('companyName')} />
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex gap-2'>
                                <div className='input-group'>
                                    <label className='form-label'>Location</label>
                                    <div>
                                        <select
                                            className='form-select'
                                            {...register('location')}
                                            defaultValue={""}
                                        >
                                            <option value={""} disabled>Select Location</option>
                                            <option value="Coimbatore">Coimbatore</option>
                                            <option value="Chennai">Chennai</option>
                                            <option value="Bangalore">Bangalore</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='input-group'>
                                    <label className='form-label'>Job Type</label>
                                    <div>
                                        <select
                                            className='form-select'
                                            {...register('jobType')}
                                            defaultValue={""}
                                        >
                                            <option
                                                value={""} disabled>Select Job Type</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Full Time">Full Time</option>
                                            <option value="Part Time">Part Time</option>
                                            <option value="Contract">Contract</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex gap-2'>
                                <div className='input-group'>
                                    <label className='form-label'>Salary Range</label>
                                    <div className='d-flex gap-2'>
                                        <input
                                            type='number'
                                            className="form-control"
                                            placeholder='₹0'
                                            {...register('salaryMin')}
                                        />
                                        <input
                                            type='number'
                                            className="form-control"
                                            placeholder='₹120000'
                                            {...register('salaryMax')}
                                        />
                                    </div>
                                </div>
                                <div className='input-group'>
                                    <label className='form-label'>Application Deadline</label>
                                    <div>
                                        <input
                                            type='date'
                                            className='form-control'
                                            {...register('applicationDeadline')}
                                            min={new Date().toISOString().split("T")[0]}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='input-group'>
                                <label className='form-label'>Task Description</label>
                                <div>
                                    <textarea
                                        className="form-control"
                                        style={{ resize: 'none', height: '100px' }}
                                        placeholder='Please share a description to let the candidate know more about the job role'
                                        {...register('jobDescription')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mt-5'>
                            <button type='button' className='btn mt-3 text-black border border-dark d-flex align-items-center gap-2' onClick={() => handleDraft()}><FaAngleDoubleUp /> Save Draft</button>
                            <button type="submit" className='btn btn-danger mt-3 d-flex align-items-center gap-2' style={{ backgroundColor: 'var(--button-color--)', border: 'none' }}>Publish <FaAngleDoubleRight />
                            </button>
                        </div>
                    </form>
                </div>
            </div>}
        </>
    )
}

export default CreateJob