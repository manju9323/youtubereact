import {createSlice} from "@reduxjs/toolkit"


const initialState={
    currentChannelvisit:null,
}

export const Channel = createSlice({
    name: 'channel',
    initialState,
    reducers: {
      currentChannel:(state,action)=>{
        state.currentChannelvisit=action.payload;
      },
      }
  })

  export const {currentChannel} = Channel.actions

export default Channel.reducer;