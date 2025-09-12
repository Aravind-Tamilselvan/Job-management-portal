import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers:{
        setCrenditials : (state,action)=>{
            state.user = action.payload.user
            localStorage.setItem('userInfo',JSON.stringify(action.payload.user))
        },
        logout : (state,action)=>{
            state.user = null
            localStorage.removeItem('userInfo')
        }
    }
})

export const {setCrenditials,logout} = userSlice.actions
export default userSlice.reducer