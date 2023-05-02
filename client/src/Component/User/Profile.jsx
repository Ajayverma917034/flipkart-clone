import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import Loading from "../Loading/Loading";
import MetaData from "../metaData/MetaData";
import { Box, Divider, Grid, List, ListItem, ListItemButton, ListItemText, MenuItem } from "@mui/material";
import Account from "./Account.jsx"
import Address from "./Address.jsx"
import ProfileCart from "./ProfileCart.jsx"
import ProfileOrders from "./ProfileOrders.jsx"

const Profile = () => {
    const navigate = useNavigate();
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    const data = ["Account", "Address", "My Cart", "My Order"]

    const [field, setField] = useState(0)

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login');
            return;
        }
    }, [isAuthenticated,]);
    return (
        <Fragment>
            {loading ? (
                <Loading />
            ) : (
                <Fragment>
                    <MetaData title={`${user.name}'s Profile`} />
                    <Grid container style={{ minHeight: '95vh', background: '#fef9f8', justifyContent: 'space-between' }}>
                        <Grid item sm={12} md={2} lg={2} style={{ minHeight: '95vh', }}>
                            <Box style={{ background: "#fff", margin: '10px', minHeight: '97.5%' }}>

                                {
                                    data.map((item, index) => (
                                        <ListItem disablePadding key={item} onClick={() => setField(index)}>
                                            <ListItemButton>
                                                <ListItemText primary={item} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))
                                }
                            </Box>

                        </Grid>

                        <Grid item sm={12} md={10} lg={10} style={{ minHeight: '95vh', }}>

                            <Box style={{ background: "#fff", margin: '10px', minHeight: '95vh ' }}>

                                {
                                    field === 0 && <Account user={user} />
                                }
                                {
                                    field === 1 && <Address />
                                }
                                {
                                    field === 2 && <ProfileCart />
                                }
                                {
                                    field === 3 && <ProfileOrders />
                                }
                            </Box>
                        </Grid>

                    </Grid>

                </Fragment>
            )}
        </Fragment>
    );
};

export default Profile;

{/* <div className="profileContainer"> */ }
{/* <div>
                            <h1>My Profile</h1>
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                            </div>

                            <div>
                                <Link to="/orders">My Orders</Link>
                               
                            </div>
                        </div>
                    </div> */}