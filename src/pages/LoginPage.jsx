import { Box, Container, Paper, Typography } from '@mui/material'
import React from 'react'
import Axios from 'axios'

const LoginPage = () => {
    const [formData, setFormData] = React.useState({
        username: '',
        password: ''
    })
    const [error, setError] = React.useState('')
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        Axios.post('https://fakestoreapi.com/auth/login', formData)
        .then((res) => {
            console.log(res)
            localStorage.setItem('token', res.data.token)
            window.location.href = '/'
        })
        .catch((err) => {
            console.log(err)
            setError(err.response.data)
        })
    }


    
  return (
    <Container className='w-[100vw] h-[100vh] flex justify-center items-center py-[16px]'>
                <Paper className="flex flex-col w-[100%] h-[100%] md:h-[400px] md:w-[500px] p-[32px] gap-[64px]">
                <Typography variant="h4" className='text-center'>Login</Typography>
                <Box className="flex flex-col gap-[32px]">
                    <input type="text" name='username' placeholder="username" className="p-2 border-2 rounded-lg" value={formData.email} onChange={
                        (e) => handleChange(e)
                    } />
                    <input type="password" name='password' onChange={
                        (e) => handleChange(e)
                    } placeholder="password" className="p-2  border-2 rounded-lg"/>
                    <button className="p-2 bg-[#008080] text-white rounded-lg" onClick={
                        (e) => handleSubmit(e)
                    }>Login</button>
                    <Typography variant="body1" className="text-center text-red-500">{error}</Typography>
                </Box>
                </Paper>

    </Container>
  )
}

export default LoginPage