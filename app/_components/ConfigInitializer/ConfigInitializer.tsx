'use client'

import useGetMainConfig from '@/app/api/getMainConfig/hook'
import useGetMenu from '@/app/api/menu/hook'
import { useGetSiteAddress } from '@/app/api/siteAddress/hook'
import { RootState } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'

const ConfigInitializer = () => {

    const config = useSelector((state:RootState)=>state.mainConfig.value)
    const siteAddress = useSelector((state:RootState)=>state.siteUrlAddress.value)
    const menuData = useSelector((state:RootState)=>state.menuData.value)

// config
    const { loadingConfig, errorConfig,getConfig} = useGetMainConfig()
    React.useEffect(()=>{
        if (config && config.length > 0) {
         return   
        }else{
         getConfig()
        }
    },[])
// end config

//site address
    const { loading, error, getSiteAddress } = useGetSiteAddress()
    React.useEffect(()=>{
        if (siteAddress) {
            return
        }else{
            getSiteAddress()
        }
    },[])
// end site address

// menu data
    const { loading:loadingMenu, error:errorMenu, response,getMenu } = useGetMenu()
    React.useEffect(()=>{
        if(menuData){
            return
        }else{
            getMenu()
        }
    },[])
// end menu data



  return null
}

export default ConfigInitializer