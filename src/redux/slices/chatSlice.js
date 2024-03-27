import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentConversation: '',
    new: false,
    starterMessage: '',
    isWriting: false
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setCurrentConversation: (state, action) => {
            state.currentConversation = action.payload
        },
        setNew: (state, action) => {
            state.new = action.payload
        },
        setStarterMessage: (state, action) => {
            state.starterMessage = action.payload
        },
        setIsWriting: (state, action) => {
            state.isWriting = action.payload
        }
    }
});

export const {setCurrentConversation, setIsWriting, setNew, setStarterMessage} = chatSlice.actions
export default chatSlice.reducer