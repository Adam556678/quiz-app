import React, { useState } from 'react'
import {TextField, Button, Box, Card, CardContent, Typography} from "@mui/material";
import Center from './Center';

export default function Login() {

    cosnt [value, setValue] = useState({});

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
                <form noValidate>
                    <TextField label="Email" name='email' variant='outlined'/>
                    <TextField label="Name" name='name' variant='outlined'/>
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
