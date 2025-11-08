import React, { useState } from 'react'
import {TextField, Button, Box, Card, CardContent, Typography} from "@mui/material";
import Center from './Center';
import useForm from '../hooks/useForm';

const getFreshModel = () => ({
    name: '',
    email: ''
});

export default function Login() {

    const {values,
        setValues,
        errors,
        setErrors,
        handleInputChange} = useForm(getFreshModel);

    const login = e => {
        e.preventDefault();
        if (validate())
            console.log(values);
    };

    const validate = () => {
        let temp = {};
        temp.email = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(values.email) ? "" : "Email is not valid";
        temp.name = values.name != ""?"" : "This field is required"
        setErrors(temp);
        return Object.values(temp).every(x => x=="");
    };
    

  return (
    <Center>
        <Card sx={{width: '400px'}}>
            <CardContent sx={{textAlign: 'center'}}>
                <Typography variant='h3' sx={{my: 3}}>
                    Quiz App
                </Typography>
            <Box sx={{
                '& .MuiTextField-root' :{
                    margin: 1,
                    width: '90%'
                }
            }}>
                <form noValidate onSubmit={login}>
                    <TextField 
                    label="Email" 
                    name='email' 
                    variant='outlined' 
                    value={values.email}
                    onChange={handleInputChange}
                    {...(errors.email && {error: true, helperText:errors.email})}
                    />

                    <TextField 
                    label="Name" 
                    name='name' 
                    variant='outlined'
                    value={values.name}
                    onChange={handleInputChange}
                    {...(errors.name && {error: true, helperText:errors.name})}
                    />

                    <Button type='submit' variant="contained" size='large' sx={{
                        width: '90%'
                    }}>Login</Button>

                </form>
            </Box>
            </CardContent>
        </Card>
    </Center>
  )
}
