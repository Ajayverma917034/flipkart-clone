import { Box, Button, Typography } from '@mui/material';
import React from 'react'
import { addEllipsis } from '../../utils/ellipse';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Component = styled(Box)`
    border-top: 1px solid #f0f0f0;
    display: flex;
    background: #ffffff;
`;
const LeftComponent = styled(Box)`
    margin: 20px;
    display: flex;
    flex-direction: column;
`;
const RightBox = styled(Box)`
    margin-top: 20px;
`;

const SingleOrder = ({ item }) => {
    return (
        <Box style={{ display: 'flex', flexDirection: 'column', border: '2px solid #878787' }}>


            <Box>
                {
                    item && item.orderItems.map((data, index) => (
                        <Link to={`/product/${data.product}`} style={{ textDecoration: 'none' }} key={index}>
                            <Box style={{ display: 'flex' }}>
                                <LeftComponent>
                                    <img src={data && data.image.public_url} alt="cartItem" style={{ width: '120px' }} />
                                </LeftComponent>
                                <RightBox>
                                    <Typography style={{ color: '#000' }}>{addEllipsis(data.heading)}</Typography>
                                    <Box style={{ marginTop: 10, display: 'flex' }}>
                                        {

                                            <Button style={{ backgroundColor: '#ef9273' }}>Add a Review</Button>
                                        }
                                    </Box>

                                </RightBox>
                            </Box>
                        </Link>

                    ))
                }
            </Box>
            <Box marginLeft={2}>
                <Box display={'flex'} style={{ alignItems: 'center' }}>
                    <Typography fontWeight={600} fontSize={20}>Status : </Typography>
                    <Typography marginLeft={2}>{item.orderStatus}</Typography>
                </Box>
                <Box display={'flex'} style={{ alignItems: 'center' }}>
                    <Typography fontWeight={600} fontSize={20}>Shipping Address : </Typography>
                    <Typography marginLeft={2}>{item.shippingInfor.address}, {item.shippingInfor.city},{item.shippingInfor.state},{item.shippingInfor.pinCode}</Typography>
                </Box>
                <Box display={'flex'} style={{ alignItems: 'center' }}>
                    <Typography fontWeight={600} fontSize={20}>Total Payable Amount : </Typography>
                    <Typography marginLeft={2}>{item.totalPrice - item.discount + item.shippingPrice}</Typography>
                </Box>
            </Box>
        </Box>

    )
}

export default SingleOrder
{/* item.orderStatus === "Delivered" && */ }