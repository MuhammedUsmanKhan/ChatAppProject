import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: 'userprofile',
    initialState: {
        darkTheme: true,
        user: {},
        isLogin: null,
        baseUrl: (window.location.href.includes('localhost'))
            ?
            `http://localhost:3000/api/v1` : `/api/v1`,

        baseUrlSocketIo: (window.location.href.includes('localhost'))
            ?
            `http://localhost:5001` : ``
    },
    reducers: {
        userLogin(state, action) {
            // console.log(state.isCollasped)
            // console.log(action.payload)
            state.isLogin = true
            state.user = action.payload
        },
        userLogout(state) {
            state.isLogin = false;
        },
        toggleTheme(state) {
            state.darkTheme = !state.darkTheme;
        }
    }
})

export default sidebarSlice.reducer;


// console.log(sidebarSlice)

export const { userLogin, userLogout, toggleTheme } = sidebarSlice.actions;