import React, { useState, useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { ChevronDown } from "lucide-react";
import BadgeDateTime from '@/components/custom/badgeDateTime';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'iconsax-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { SearchNormal1 } from 'iconsax-react';
import NoData from '../../ManajemenProduk&Stok/Produk/NoData';
import { Door } from 'akar-icons';
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";


const Menu = ({ 
    setDetailOrder,
  DaftarOrder,
  handleSelectChange,
  
  setIsDialogOpen,
  
  DataOutlet, 
  setDataOutlet,
  selectedOutlet, 
  setSelectedOutlet,
  handleSelectOutlet
 }) => {
    

   

    const [DataKategori, setDataKategori] = useState([
        // { id: "m5gr84i9", name: 'Makanan Ringan' },
        // { id: "m5gr84i7", name: 'Populer' },
        // { id: "m5gr84i8", name: 'sayur-sayuran' }
    ])

    const formatkategoriData = (apiData) => {
        return {
            id: apiData.id_kategori.toString(),
            name: apiData.nama_kategori
        };
    };

    const fetchDataKategori = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/categories`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
           // Log untuk memastikan data yang diterima
    
            // Pastikan response.data adalah array
            if (Array.isArray(response.data.data)) {
                const formattedData = response.data.data.map(formatkategoriData);
               
                setDataKategori(formattedData);
                // console.log(formattedData)
                // setOriginalData(formattedData); // Set originalData di sini
            } else {
                console.error("Data yang diterima bukan array");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };


    useEffect(() => {
        fetchDataKategori();
    }, []);
    
    // const DataMenu = [
    //     { id: "1", name: 'Sate', outlet: 'Cabang 1', kategori: 'Makanan', deskripsi: 'Sejenis sate satean yang dibakar dan tidak menggunakan bumbu kacang dan sambel serta susu murni', stok: 99, harga: 20000, foto: 'https://github.com/shadcn.png' },
    //     { id: "1", name: 'Onde-onde', outlet: 'Cabang 1', kategori: 'Cemilan', deskripsi: 'Sejenis sate satean yang dibakar dan tidak menggunakan bumbu kacang dan sambel serta susu murni', stok: '40', harga: 20000, foto: 'https://github.com/shadcn.png' },
    //     { id: "1", name: 'Kopi', outlet: 'Cabang 1', kategori: 'Minuman', deskripsi: 'Sejenis sate satean yang dibakar dan tidak menggunakan bumbu kacang dan sambel serta susu murni', stok: '40', harga: 20000, foto: 'https://github.com/shadcn.png' },
    //     { id: "1", name: 'Le mineral', outlet: 'Cabang 1', kategori: 'Minuman', deskripsi: 'Sejenis sate satean yang dibakar dan tidak menggunakan bumbu kacang dan sambel serta susu murni', stok: '40', harga: 20000, foto: 'https://github.com/shadcn.png' },
    //     { id: "1", name: 'Sate', outlet: 'Cabang 2', kategori: 'Makanan', deskripsi: 'Sejenis sate satean yang dibakar dan tidak menggunakan bumbu kacang dan sambel serta susu murni', stok: '40', harga: 20000, foto: 'https://github.com/shadcn.png' },
    //     { id: "1", name: 'Onde-onde', outlet: 'Cabang 2', kategori: 'Cemilan', deskripsi: 'Sejenis sate satean yang dibakar dan tidak menggunakan bumbu kacang dan sambel serta susu murni', stok: '40', harga: 20000, foto: 'https://github.com/shadcn.png' },
    //     { id: "1", name: 'Le mineral', outlet: 'Cabang 2', kategori: 'Minuman', deskripsi: 'Sejenis sate satean yang dibakar dan tidak menggunakan bumbu kacang dan sambel serta susu murni', stok: '40', harga: 20000, foto: 'https://github.com/shadcn.png' },
    // ];

    const [DataMenu, setDataMenu] = useState([]);

    const formatMenuData = (apiData) => {
        return apiData.map((item, index) => ({
            id: index + 1, 
            produkId: item.product_id, 
            outlet: item.outlet_name,
            name: item.product_name,
            kategori: item.category_name,
            harga: item.price,
            stok: item.stock,
            foto: item.product_image,
            deskripsi: item.description
        }));
    };

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/products/menu?status=aktif`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

// console.log(response.data.data)

            // Akses data array dari response.data.data
            if (Array.isArray(response.data.data)) {
                const formattedData = formatMenuData(response.data.data);
                setDataMenu(formattedData);
                // setSelectedOutlet(formattedData[0])
                
                // console.log('format:',formattedData)
            } else {
                console.error("Data yang diterima bukan array");
            }

        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    // Ambil data dari API
    useEffect(() => {
        fetchData();
    }, []);

    
    const [searchTerm, setSearchTerm] = useState("");
    // useEffect(() => {
    //     setnamaToko(selectedOutlet.name);
    //     setIdOutlet(selectedOutlet.id);
    // }, [selectedOutlet]);

    


    const [activeButton, setActiveButton] = useState('Semua');
    const handleClickKategori = (name) => {
        if (name === 'Semua') {
            setActiveButton('Semua');
        } else {
            setActiveButton(name);
        }
    };

    // Filter data 
    const filteredData = DataMenu.filter(item => {
        // Filter berdasarkan searchTerm
        const matchesOutlet = selectedOutlet ? item.outlet === selectedOutlet.name : true;
        const matchesSearchTerm = searchTerm
            ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
    
        const matchesCategory = activeButton === 'Semua'
            ? true
            : item.kategori.toLowerCase() === activeButton.toLowerCase();
    
        return matchesOutlet && matchesSearchTerm && matchesCategory;
    });


    const handleAddToOrder = (menu) => {
        setDetailOrder((prevOrders) => {
            const existingOrderIndex = prevOrders.findIndex(order => order.id === menu.produkId);

            if (existingOrderIndex !== -1) {
                // Jika item sudah ada, update count-nya
                const updatedOrders = [...prevOrders];
                updatedOrders[existingOrderIndex] = {
                    ...updatedOrders[existingOrderIndex],
                    count: updatedOrders[existingOrderIndex].count + 1
                };
                return updatedOrders;
            } else {
                // Jika item belum ada, tambahkan item baru
                return [
                    ...prevOrders,
                    {
                        id: menu.produkId,
                        name: menu.name,
                        harga: menu.harga,
                        foto: menu.foto,
                        count: 1
                    }
                ];
            }
        });
    };

    return {
        handleSelectOutlet
    }, (
        <div>
            <div className='py-[16px] grid gap-[16px]'>
                <div className='flex px-[24px] justify-between w-full'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="mr-auto w-[180px] h-[36px] text-[14px] text-left justify-between ">
                                {selectedOutlet ? selectedOutlet.name : "Pilih outlet"}
                                <ChevronDown size={16} className="mr-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className='w-[180px]'>
                            <DropdownMenuLabel className='ml-[12px] text-[14px]'>Pilih Outlet</DropdownMenuLabel>
                            {DataOutlet.map((outlet) => (
                                <DropdownMenuCheckboxItem
                                    key={outlet.id}
                                    className="capitalize p-[12px]"
                                    onClick={() => handleSelectOutlet(outlet)}
                                    checked={selectedOutlet?.id === outlet.id}
                                >
                                    <span className="ml-[12px] text-[14px]">{outlet.name}</span>
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className='flex gap-[12px]'>
                        <BadgeDateTime />
                        <Button onClick={() => setIsDialogOpen(true)} className='text-[14px] h-[35px] rounded-full font-medium'><Door strokeWidth={1} size={24} />Tutup Kasir</Button>
                    </div>
                </div>
                <div className='px-[24px] grid gap-[16px]'>
                    <div className='flex justify-between'>
                        <h1 className='text-[18px] font-semibold'>Daftar Order <span className='text-slate-500'>{DaftarOrder.length}</span></h1>
                        <Link to="/admin-panel/sistem-kasir/daftar-order" className=" text-[14px] font-medium flex gap-[12px]">Lihat lainnya <ArrowRight size={18} /></Link>
                    </div>
                    <ScrollArea className="w-[100%]  ">
                        {DaftarOrder.length === 0 ? (
                            <div className="text-center flex justify-center items-center text-slate-500 text-[14px] h-[66px]" >Data order tidak tersedia</div>
                        ) : (
                            <div className='flex gap-[12px]'>
                                {DaftarOrder.map((daftarOrder) => (
                                    <div key={daftarOrder.id} onClick={() => handleSelectChange(daftarOrder.tipeOrder, daftarOrder.id, daftarOrder.KetBayar, daftarOrder.detailTransaksi, daftarOrder.nama, daftarOrder.tax , daftarOrder.diskon)} className=' p-[16px] w-[208px] grid gap-[12px] bg-white rounded-[6px] cursor-pointer hover:bg-slate-50'>
                                        <div className='flex justify-between'>
                                            <h1 className='text-[16px] font-semibold'>{daftarOrder.nama}</h1>
                                            <h1 className='text-[12px] font-medium text-slate-500 mt-[5px]'>#{String(daftarOrder.id).padStart(4, '0')}</h1>
                                        </div>
                                        <div className='flex justify-between'>
                                            <Badge variant={daftarOrder.KetBayar === 'Open bill' ? undefined : 'outline'} className='h-[22px] rounded-full text-[12px] font-medium'>{daftarOrder.KetBayar}</Badge>
                                            <h3 className='text-[14px] font-medium text-slate-500'>
                                                {Array.isArray(daftarOrder.detailTransaksi)
                                                    ? daftarOrder.detailTransaksi.reduce((sum, item) => sum + (item.stok || 0), 0)
                                                    : 0} Item
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </div>
            <div className='py-[16px] grid gap-[16px] border-t border-slate-300'>
                <div className='px-[24px] flex justify-between'>
                    <ScrollArea className="h-[36px] w-[489px]">
                        <div className='flex gap-[12px]'>
                            <Button variant={activeButton === 'Semua' ? 'default' : 'outline'} className=" text-[14px] rounded-full h-[30px]" onClick={() => handleClickKategori('Semua')}>Semua</Button>
                            {DataKategori.map((kategori) => (
                                <Button
                                    key={kategori.id}
                                    variant={activeButton === kategori.name ? 'default' : 'outline'}
                                    className="text-[14px] rounded-full h-[30px]"
                                    onClick={() => handleClickKategori(kategori.name)}
                                >
                                    {kategori.name}
                                </Button>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    <div className="relative">
                        <div className="absolute py-[7px]  left-0 flex items-center pl-3">
                            <SearchNormal1 size="16" />
                        </div>
                        <Input
                            className="pl-12 h-[30px] w-[259px] text-[14px] rounded-[6px]"
                            placeholder="Cari produk..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className='px-[24px] flex justify-between'>
                    <h1 className='text-[18px] font-semibold'>Semua</h1>
                    <p className='text-[14px] font-normal text-slate-500'>Menampilkan {filteredData.length} Item</p>
                </div>
                <div className="container px-[24px] mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {filteredData.length > 0 ? (
                            filteredData.map((menu) => (
                                <div key={menu.id} className="lg:w-1/3 md:w-1/4 sm:w-1/2 p-[16px] w-full ">
                                    <div onClick={() => handleAddToOrder(menu)} className='bg-white rounded-[8px] grid gap-[16px] cursor-pointer p-[16px] hover:bg-slate-50  '>
                                        <a className="block relative h-[127px] rounded-[6px] overflow-hidden">
                                            <img
                                                alt="ecommerce"
                                                className="object-cover object-center w-full h-full block"
                                                src={menu.foto ? `${API_URL}/images/${menu.foto}` : "https://github.com/shadcn.png"}
                                            />
                                        </a>
                                        <h1 className='text-[16px] font-semibold'>{menu.name}</h1>
                                        <p className='text-[14px] font-normal text-slate-500'>{menu.deskripsi.length > 60 ? `${menu.deskripsi.slice(0, 60)}...` : menu.deskripsi}</p>
                                        <div className='flex justify-between'>
                                            <p className='text-[14px] font-medium text-slate-500'>Stok {menu.stok}</p>
                                            <p className='text-[16px] font-semibold'>Rp {menu.harga.toLocaleString('id-ID')}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='w-full h-full px-[14px] pt-[14px]'>
                                <NoData />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu
