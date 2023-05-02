import { Box, Rating, Typography } from '@mui/material'
import React from 'react'
import profilepg from "../../img/sociel_img/facebook.png"
import './productDetails.css'

const ReviewCard = ({ review }) => {
    return (
        <Box className="reviewBox">
            <img src={review && profilepg} alt='review' />
            <Typography fontWeight={600}> {review.name}</Typography>
            <Rating name="half-rating-read" value={review.rating} precision={0.5} readOnly></Rating>
            <Typography className='comment'>{review.comment}</Typography>
        </Box>
    )
}

export default ReviewCard