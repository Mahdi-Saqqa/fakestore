import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { trimText } from '../utils/textTools';
const ProductCard = (props) => {
    const {product} = props
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/product/${product.id}`)
    }
  return (
    <Card className='cursor-pointer' sx={{ width: "300px", height:'390px',padding:'16px' }} onClick={handleClick} >
      <CardMedia
        sx={{ height: 260,width:260, display:'flex',justifyContent:'center',alignItems:'center',margin:'auto'}}
        image={product.image}
        title={product.title}
      />
      <CardContent sx={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        textAlign:'center'
      }}>
        <Typography gutterBottom variant="h6" component="div">
        {trimText(product.title, 20)}
        </Typography>
        <Typography variant="body2" >
        {product.price} $
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProductCard