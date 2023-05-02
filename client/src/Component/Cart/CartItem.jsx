import { Typography, Box, Button, styled } from "@mui/material";
import { addEllipsis } from "../../utils/ellipse";
import { useDispatch } from "react-redux";
import { addItmeTocart } from "../../Stores/actions/cartAction";
import './Cart.css'

const Component = styled(Box)`
    border-top: 1px solid #f0f0f0;
    display: flex;
    background: #ffffff;
    justify-content: space-around;
`;
const LeftComponent = styled(Box)`
    margin: 20px;
    display: flex;
    flex-direction: column;
`;
const RightBox = styled(Box)`
    margin-right: 10px;
    margin-top: 20px;
`;



const CartItem = ({ item, removeItemFromCart }) => {
    const dispatch = useDispatch()

    // const { cartItems } = useSelector((state) => state.cart);


    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItmeTocart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItmeTocart(id, newQty));
    };
    const finalPrice = Math.ceil(item.price - item.price * item.discount / 100)

    return (
        <Component>
            <LeftComponent>
                <img src={item.image.url} alt="cartItem" style={{ width: '120px' }} />
                <div className="cartInput">
                    <button style={{ backgroundColor: '#ef9273' }}
                        onClick={() =>
                            decreaseQuantity(item.product, item.quantity)
                        }
                    >
                        -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button style={{ backgroundColor: '#ef9273' }}
                        onClick={() =>
                            increaseQuantity(
                                item.product,
                                item.quantity,
                                item.stock
                            )
                        }
                    >
                        +
                    </button>
                </div>
            </LeftComponent>
            <RightBox>
                <Typography>{addEllipsis(item.heading)}</Typography>
                <Box style={{ marginTop: 10, display: 'flex' }}>
                    <Box component="span" style={{ fontSize: 20, fontWeight: 600 }}>₹{finalPrice}</Box>&nbsp;&nbsp;&nbsp;
                    <Box component="span" style={{ color: "#878787" }}><strike>₹{item.price}</strike></Box>&nbsp;&nbsp;&nbsp;
                    <Box component="span" style={{ color: "#388e3c" }}>{item.discount}% discount</Box>
                </Box>
                {
                    item.quantity && item.quantity > 1 &&
                    <Box style={{ display: 'flex', marginTop: '10px', alignItems: 'center' }}>
                        <Typography fontSize={18} fontWeight={600}>Total Price : </Typography>
                        <Typography marginLeft={2}>{item.quantity} X {finalPrice} = {item.quantity * finalPrice}</Typography>
                    </Box>
                }
                <Button style={{ backgroundColor: '#ef9273', color: 'white' }} onClick={() => removeItemFromCart(item.product)}>Remove</Button>
            </RightBox>
        </Component>
    )
}

export default CartItem;