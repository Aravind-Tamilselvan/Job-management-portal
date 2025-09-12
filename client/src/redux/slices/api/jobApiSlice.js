import { JOBURL } from "../../../utils/constants";
import { apiSlice } from "../apiSlice";

export const jobApiSlice = apiSlice.injectEndpoints({
    endpoints :(builder)=>({
        getJobsApi : builder.query({
            query : ()=>({
                url:`${JOBURL}/jobs`,
                method:"GET",
                credentials:"include"
            }),
            providesTags:['Jobs']
        }),
        jobPostApi : builder.mutation({
            query : (data)=>({
                url : `${JOBURL}/create-job`,
                method:"POST",
                body:data,
                credentials:"include"
            }),
            invalidatesTags:['Jobs']
        })
    })
})

export const {useGetJobsApiQuery,useJobPostApiMutation} = jobApiSlice