import { USERURL } from "../../../utils/constants";
import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        loginApi : builder.mutation({
            query : (data)=>({
                url : `${USERURL}/login`,
                method:"POST",
                body:data,
                credentials:"include"
            })
        })
    })
})

export const {useLoginApiMutation}= authApiSlice