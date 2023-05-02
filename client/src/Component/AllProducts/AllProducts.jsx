import React, { Fragment } from 'react'
import Loading from '../Loading/Loading';
import { Box, Divider, Typography } from '@mui/material';
import SingleProduct from '../Product/SingleProduct';
import './AllProducts.css'
import CustomPagination from '../pagination/CustomPagination';
import ProductDummy from '../LoadingPage/ProductsDummy';



const AllProducts = ({ loading, products, count, setCurrentPage, currentPage }) => {



    return (
        <Fragment>
            {
                loading ? <>
                    <ProductDummy />
                    <Loading />
                </> :
                    <Fragment>
                        <Typography style={{ fontSize: '33px', fontWeight: '600' }} className='productHeading'> Products </Typography>
                        <Box style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                            {
                                products && products.map((product) => (
                                    <SingleProduct product={product} key={product._id} />
                                ))
                            }
                        </Box>
                    </Fragment>
            }


            <CustomPagination count={count} setCurrentPage={setCurrentPage} currentPage={currentPage} />

        </Fragment>
    )
}

export default AllProducts