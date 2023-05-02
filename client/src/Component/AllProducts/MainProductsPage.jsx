import { Box, Button, Divider, Grid, Rating, Slider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AllProducts from './AllProducts'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../Stores/actions/productAction'
import { useParams } from 'react-router-dom';
import './AllProducts.css'
import { alertOption } from '../../Stores/actions/notificationAction'
import FilterPage from './FilterPage'
import store from '../../Stores/store'
import { loadUser } from '../../Stores/actions/userAction'
const categories = [
    "Laptop",
    "Footwear",
    "Mobile",
    "TV",
    "Watch",
    "AC"
]

const MainProductsPage = () => {
    const dispatch = useDispatch()

    const [price, setPrice] = useState([0, 100000])
    const [currentPage, setCurrentPage] = useState(1)
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0)
    const { products, error, loading, productsCount, resultPerPage, filteredProductCount } = useSelector((state) => state.products)


    const { keyword } = useParams()
    var count = Math.ceil(filteredProductCount / resultPerPage);
    const handleClick = () => {
        store.dispatch(loadUser())
    }

    useEffect(() => {
        if (error) {
            dispatch(alertOption({ open: true, severity: 'error', message: error }))
            return;
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, error, price, category, ratings])
    return (
        <Box style={{ minHeight: '100vh' }}>
            <Grid container>
                <Grid item md={2} xs={12} style={{ padding: '25px 0 0 25px', background: '#fff' }}>
                    <FilterPage {...{ price, setPrice, categories, setCategory, ratings, setRatings }} />
                </Grid>
                <Grid item md={10} xs={12}>

                    <AllProducts {...{ loading, price, products, count, setCurrentPage, currentPage }} />
                </Grid>

            </Grid>

        </Box>
    )
}

export default MainProductsPage