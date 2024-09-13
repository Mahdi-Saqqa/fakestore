import React from 'react'
import { AppBar, Container } from '@mui/material';
const NavBar = (props) => {
  const {categories,categoriesLoading,setSearchParams} = props
    return (
      <AppBar
      sx={{
        position:'unset',
        width:'100%',
        padding:'0px',
      }}>
        <Container sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap:'40px',
                padding:'20px',

              }}>
              <div className='cursor-pointer' onClick={() => {
          setSearchParams(() => {
            const params = new URLSearchParams();
            return params;
          });
        }}>
              All
              </div>
        {!categoriesLoading&&categories.map((category,idx)=>{
              return (<div key={idx}>
              <div className='cursor-pointer  hover:bg-teal-800' onClick={() => {
          setSearchParams(() => {
            const params = new URLSearchParams();
            params.set("category", category);
            return params;
          });
        }}>
              {category}
              </div>
            </div>)
              })
            }
        </Container>
      </AppBar>
    )
}

export default NavBar