import { Box, Divider, Rating, Slider, Typography } from '@mui/material'
import React from 'react'

const FilterPage = ({ price, setPrice, categories, setCategory, ratings, setRatings }) => {

    const pricHandle = (event, newPrice) => {
        setPrice(newPrice)
    }
    return (
        <Box display={'flex'}>
            <Box sx={{ marginTop: '56px' }}>
                <Typography fontSize={26} fontWeight={600}> Price Filter</Typography>
                <Slider
                    value={price}
                    onChange={pricHandle}
                    min={0}
                    max={100000}
                    valueLabelDisplay="auto"
                    aria-labelledby='range-slider'
                    style={{ color: '#ef9273' }}
                />

                <Typography fontSize={26} fontWeight={600}> Category Filter</Typography>
                <ul className='categoryBox'>

                    {
                        categories && categories.map((category) => (
                            <li key={category} className='category-link' onClick={() => setCategory(category)}>
                                <Typography>{category}</Typography>
                            </li>
                        ))

                    }

                </ul>
                <fieldset>
                    <Typography component='legend'>Ratings Above</Typography>
                    <Rating
                        name="simple-controlled"
                        value={ratings}
                        onChange={(event, newValue) => {
                            setRatings(newValue);
                        }}
                    />
                </fieldset>
            </Box>
        </Box>
    )
}

export default FilterPage