import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


interface IAuthState {
    accessToken: string | null;
    loading: boolean;
    error: string | null;
}

interface ICredentials {
    username: string;
    password: string;
}

const initialState: IAuthState = {
    accessToken: Cookies.get('accessToken') || null,
    loading: false,
    error: null
}

const baseurl = 'https://c0tq7dfcs2.execute-api.ap-south-1.amazonaws.com/dev'

export const login = createAsyncThunk('/auth/login', async (credentials: ICredentials, thunkAPI) => {
    try {
        const response = await axios.post(`${baseurl}/login`, { email: credentials.username, password: credentials.password });
        const token = response.data.accessToken;
        Cookies.set('accessToken', token, { expires: 7 });
        return token;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            const token = action.payload;
            Cookies.set('accessToken', token, { expires: 7 });
            state.accessToken = token;
        },
        removeAccessToken: (state) => {
            Cookies.remove('accessToken');
            state.accessToken = null;
        },
        initializeAuth: (state) => {
            const token = Cookies.get('accessToken');
            if (token) {
                state.accessToken = token;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.accessToken = action.payload;
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { setAccessToken, removeAccessToken, initializeAuth } = authSlice.actions;

export default authSlice.reducer;