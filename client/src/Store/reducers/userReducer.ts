import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: '',
        password: '',
        isLoginSuccess: false
    },
    reducers: {
        userDetails : (state: any, action: any): void => {
            console.log("userDetails", action);
            state[action.payload.name] = action.payload.value
        },
        login: (state: any, action: any) => {
         axios({
            url: 'https://c0tq7dfcs2.execute-api.ap-south-1.amazonaws.com/dev/login',
            method: "POST",
            data: {
                email: action.payload.email,
                password: action.payload.password
            }
          }).then(response => {
            if(response.status === 200){
              state.isLoginSuccess = true
          }
          })
          
                   
        }
    }
})

export const {login, userDetails} = userSlice.actions;

export default userSlice.reducer