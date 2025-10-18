'use client'

import { Button } from '@mui/material'
import React, { useState } from 'react'

type BonProps = {
    bonList : any;
    showBonSection:boolean;
    setShowBonSection:React.Dispatch<React.SetStateAction<boolean>>;
    selectedId:null | number;
    setSelectedId:React.Dispatch<React.SetStateAction<null | number>>
}

const Bon = ({bonList,showBonSection,setShowBonSection,selectedId,setSelectedId}:BonProps) => {

    const [selectedBon, setSelectedBon] = useState<number | null>(null)
    const [showBonList, setShowBonList] = useState<null | boolean>(null)

    const handleSelect = (Id: number) => {
      setSelectedBon(prev => (prev === Id ? null : Id))
    }

const handleConfirmation =()=> {
 if (selectedBon) {
    setSelectedId(selectedBon)
    setShowBonSection(false)
 }
}
// handle comma
const autocomma = (number_input : number) =>
    new Intl.NumberFormat("en-US").format(number_input);
// end handle comma

  return (
    <>
    {showBonSection && 
    <div className='p-5 lg:px-64 flex flex-col gap-5'>
        <div className='w-full text-center'>آیا تمایل به استفاده از بن تخفیف خود دارید؟ </div>
        <div className='flex gap-3 justify-center'>
        <Button variant='contained' color='info' size='large' className='w-40' onClick={()=>(setShowBonList(true))}>بله</Button>
        <Button variant='contained' color='error' className='w-40' onClick={()=>{
            setShowBonSection(false)
            }}>خیر</Button>
        </div>
        {showBonList && 
        <div className='w-full flex flex-col sm:flex-row gap-5 sm:justify-center items-center'>
            {bonList && bonList.map((item:any)=>(
                <div style={{borderColor:selectedBon === item.Id ? '#0571f5' : '#cbd0d6' }} key={item.Id} className='flex flex-col gap-1 border rounded-lg px-5 py-5 relative cursor-pointer' onClick={() => handleSelect(item.Id)}>
                    <div className='flex gap-1'><span>نام دوره:</span><span className='text-gray-400'>{item.NameDore}</span></div>
                    <div className='flex gap-1'><span>تاریخ شروع:</span><span className='text-gray-400'>{item.BeginDate}</span></div>
                    <div className='flex gap-1'><span>تاریخ پایان:</span><span className='text-gray-400'>{item.EndDate}</span></div>
                    <div className='flex gap-1'><span>مبلغ کل:</span><span className='text-gray-400'>{autocomma(item.MablaghKol)} ریال</span></div>
                    <div className='flex gap-1'><span>مبلغ استفاده شده:</span><span className='text-gray-400'>{autocomma(item.MablaghMasrafShode)}</span></div>
                    <div className='flex gap-1'><span>مبلغ مانده:</span><span className='text-gray-400'>{autocomma(item.MablaghMande)}</span></div>
                    <div className='border border-gray-300 rounded-full w-4 h-4 p-0.5 absolute top-2 left-2'>
                        {selectedBon === item.Id && <div className='bg-blue-500 w-full h-full rounded-full'></div>}</div>
                </div>
            ))}
        </div>
        }
        {showBonList && 
        <div className='flex justify-center'>
            <Button size='large' variant='contained' color='success' onClick={handleConfirmation}>تایید</Button>
        </div>
        }
    </div>
    }
    </>
  )
}

export default Bon