import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGeoInfo = createAsyncThunk(
    'geoInfo/fetchGeoInfo',
    async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/geo-info`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            return data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const addGeoInfo = createAsyncThunk(
    'geoInfo/addGeoInfo',
    async (ipAdd, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/geo-info`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ip: ipAdd }),
            });
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data['ip']);
            }
            return data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


const geoInfoSlice = createSlice({
    name: 'geoInfo',
    initialState: {
        geoInfos: [],
        status: 'idle',
        transaction: 'idle',
        error: null
    },
    reducers: {
        resetTransaction: (state) => {
            state.transaction = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGeoInfo.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchGeoInfo.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.geoInfos = action.payload
            })
            .addCase(fetchGeoInfo.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addGeoInfo.pending, (state) => {
                state.transaction = 'loading'
            })
            .addCase(addGeoInfo.fulfilled, (state, action) => {
                state.transaction = 'success'
                state.geoInfos.push(action.payload)
            })
            .addCase(addGeoInfo.rejected, (state, action) => {
                state.transaction = 'failed'
                state.error = action.payload
            })
    }
})

export const { resetTransaction } = geoInfoSlice.actions
export default geoInfoSlice.reducer