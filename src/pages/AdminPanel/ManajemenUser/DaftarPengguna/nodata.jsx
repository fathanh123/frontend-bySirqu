import React from 'react'
import { Folder2 } from 'iconsax-react';
import AddPengguna from './AddPengguna';


const NoData = ({fetchData}) => {
  return (
    <div className="flex flex-col items-center justify-center py-[80px] border border-dashed rounded-[16px] border-slate-300 gap-[24px]">
    <Folder2 size="40" variant="Bulk" />
    <div className='grid gap-[12px]'>
    <h1 className="text-center text-[18px] font-semibold">Data tidak tersedia</h1>
    <p className="text-center text-[14px] font-normal text-slate-500">Belum ada data yang tersedia untuk halaman ini</p>
    </div>
    
    <AddPengguna fetchData={fetchData} buttonProps={{ variant: "outline", className: 'gap-2 h-[36px] text-[14px] font-medium' }} title="Tambah pengguna" showIcon={false}/>
   </div>

  )
}

export default NoData
