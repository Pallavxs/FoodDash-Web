import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api.js";

// ==========================
// LOGIN
// ==========================


export const loginUser = createAsyncThunk(
    "auth/login",

    async (userData, { rejectWithValue }) => {
        try {
            const respone = await api.post("/auth/login", userData);

            return respone.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login Failed"
            )
        }
    }
)

// ==========================
// REGISTER
// ==========================

export const registerUser = createAsyncThunk(
    "auth/register",

    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/register", userData);

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Registration Failed")
        }
    }
);

// ==========================
// GET CURRENT USER
// ==========================

export const getMe = createAsyncThunk(
    "auth/get-me",

    async (_, { rejectWithValue }) => {
        try {
            const respone = await api.get("/auth/get-me");

            return respone.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "User not found")
        }
    }
)

// ==========================
// GET LOGOUT USER
// ==========================

export const logoutUser = createAsyncThunk(
    "auth/logout",

    async (_, { rejectWithValue }) => {
        try {
            const respone = await api.post("/auth/logout");

            return respone.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Logout Failed")
        }
    }
)

// export const getAllUser = createAsyncThunk(
//     "/auth/getAll",

//     async (_, { rejectWithValue }) => {
//         try {
//             const respone = await api.get("/auth/getAll")

//             return respone.data;
//         } catch (error) {
//             return rejectWithValue(
//                 error.response?.data?.message || "Failed to get all user"
//             )
//         }
//     }
// );

let initialState = {
    user: null,
    users: [],
    isAuthenticated: false,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: "authSlice",

    initialState,

    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            // ==========================
            // // LOGIN
            // ==========================

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload;
            })

            // ==========================
            // REGISTER
            // ==========================

            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })

            // ==========================
            // GET ME
            // ==========================

            .addCase(getMe.pending, (state) => {
                state.loading = true;
            })

            .addCase(getMe.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })

            .addCase(getMe.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })


            // ==========================
            // LOGOUT
            // ==========================

            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            })

            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ==========================
            // getAllUser
            // ==========================

            // .addCase(getAllUser.pending, (state) => {
            //     state.loading = true;
            //     state.error = null
            // })

            // .addCase(getAllUser.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.user = action.payload.users;
            //     state.isAuthenticated = true;
            //     state.error = null
            // })

            // .addCase(getAllUser.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload
            // });
    }
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
