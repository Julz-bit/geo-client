import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message);
              }

            localStorage.setItem('token', data.token)
            return data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        isLoading: false,
        error: null,
    },
    reducers : {
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.isLoading = true;
            state.error = null
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;