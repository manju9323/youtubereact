import {createSlice} from "@reduxjs/toolkit"


const initialState={
    currentUser:null,
    loading:false,
    error:false,
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      loginStart:(state)=>{
        state.loading= true;
      },
      loginSucess:(state,action)=>{
        state.loading= false;
        state.currentUser=action.payload;
      },
      loginFailure:(state)=>{
        state.loading=false;
        state.error=true;
      },
      logout:(state)=>{
        state.currentUser=null;
        state.loading=false;
        state.error=false;
      },
      subscription:(state,action)=>{
        if(state.currentUser.SubscribedUsers.includes(action.payload))
        {
          state.currentUser.SubscribedUsers.splice(state.currentUser.SubscribedUsers.findIndex(channelId=> channelId===action.payload),1)
        }
        else{
          state.currentUser.SubscribedUsers.push(action.payload)
        }
      },
    },
  })

  export const {loginStart,loginSucess,loginFailure,logout,subscription} = userSlice.actions

export default userSlice.reducer