import type { NextPage } from "next"
import { Typography } from "@mui/material"
import { useRouter } from "next/router"
import React, { useEffect } from "react";
import Router from 'next/router'




const Home: NextPage = () => {
    useEffect(() => {
   const {pathname} = Router
   if(pathname == '/' ){
       Router.push('/selection')
   }
 });
    return (
        <>
            <Typography variant="body1">Welcome to HotSeat!</Typography>

        </>
    )
}

export default Home
