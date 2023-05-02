import { Grid, Typography, Box, Button, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import TotalBalance from "./TotalBalance";
import { useNavigate } from 'react-router-dom';
import { removeItemsFromCart } from "../../Stores/actions/cartAction";
import { Fragment } from "react";

const GridWrapper = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    backgroundColor: '#f2f2f2',
    [theme.breakpoints.down("md")]: {
        padding: '10px',
    }
}))


const Header = styled(Typography)`
    padding: 15px 24px;
`
const ButtonWrapper = styled(Box)(({ theme }) => ({
    padding: '16px 22px',
    background: '#ffff',
    boxShadow: '0 -2px 10px 0 rgb(0 0 0 / 10%)',
    borderTop: '1px solid #f0f0f0',
    [theme.breakpoints.down('md')]: {
        padding: '5px',
    }
}))


const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background-color: #1976d2;
    color: #fff;
    padding: 5px;
    width: 250px; 
    height: 51px;
`
const LeftGrid = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down("md")]: {
        paddingRight: 0,
    }

}))



const Cart = () => {
    const { cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const deleteCartItem = (id) => {
        dispatch(removeItemsFromCart(id));
    }
    const checkOutHandler = () => {
        navigate('/shipping');
    }
    return (
        <Fragment>
            {
                cartItems.length == 0 ? <EmptyCart /> :
                    <GridWrapper container>
                        <LeftGrid item lg={9} md={9} sm={12} xs={12}>
                            <Header style={{ background: '#ffffff' }}>
                                <Typography>Cart Item </Typography>
                            </Header>
                            {
                                cartItems && cartItems.map((item, index) => (
                                    <CartItem item={item} key={index} removeItemFromCart={deleteCartItem} />
                                ))
                            }
                            <ButtonWrapper>
                                <Button style={{ display: 'flex', marginLeft: 'auto', backgroundColor: '#1976d2', color: '#fff', padding: '5px', width: '250px', height: '51px' }}
                                    onClick={checkOutHandler}
                                >
                                    Place Order
                                </Button>
                            </ButtonWrapper>
                        </LeftGrid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TotalBalance cartItems={cartItems} />
                        </Grid>
                    </GridWrapper>
            }
        </Fragment>

    )
}

export default Cart;