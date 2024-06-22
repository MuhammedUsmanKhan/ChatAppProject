import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isCollapsed: true
    },
    reducers: {
        collapseSidebar(state) {
            // console.log(state.isCollasped)
            // console.log(action.payload)
            state.isCollapsed = !state.isCollapsed
        },
    }
})

export default sidebarSlice.reducer;


// console.log(sidebarSlice)

export const { collapseSidebar } = sidebarSlice.actions;