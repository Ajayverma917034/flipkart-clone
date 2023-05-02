import { Box, Rating, Typography, styled } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import "./product.css"
import { addEllipsis } from '../../utils/ellipse'

const SingleProduct = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} className='productCard'
            sx={{ marginTop: { xs: '20px', md: '5px' } }}
        >
            <Box style={{ padding: '15px 20px', width: '90%', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                <img src={product.images[0].url} alt={product.heading} className='imgStyle' />
            </Box>

            <Box className="styleFont">

                <Typography style={{ color: '878787', fontWeight: 600, paddingTop: 20 }}

                >{addEllipsis(product.heading)}</Typography>

                <Box style={{ margin: '0.5vmax 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Rating name="half-rating-read" value={product.ratings} precision={0.5} readOnly size={window.innerWidth < 600 ? '20' : "medium"} />
                    <Typography variant='span' margin={'0.5vmax'} >{product.numOfReviews} Reviews</Typography>
                </Box>

                <Typography style={{ color: '#ef9273' }} sx={{ fontsize: { xs: '2vmax', md: '1vmax' } }}> ₹ {product.price - (product.discount * product.price) / 100}</Typography>
            </Box>

        </Link>
    )
}

export default SingleProduct