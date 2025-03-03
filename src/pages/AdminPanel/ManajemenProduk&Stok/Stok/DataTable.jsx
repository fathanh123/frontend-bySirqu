import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
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
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from '@/components/ui/label';
import { Add, Minus } from 'iconsax-react';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from "@/components/ui/toast";
import NoData from './NoData';
import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";



const DataTable = () => {
    const [DataOutlet, setDataOutlet] = useState([
        // { id: "m5gr84i9", name: 'Outlet 1' },
        // { id: "m5gr84i7", name: 'Outlet 2' },
        // { id: "m5gr84i8", name: 'Outlet 3' }
    ]);
    const [selectedOutlet, setSelectedOutlet] = useState(null);

    const formatOutletData = (apiData) => {
        return {
            id: apiData.id_outlet.toString(),
            name: apiData.nama_outlet
        };
    };


    const fetchDataOutlet = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/outlets`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
           // Log untuk memastikan data yang diterima
    
            // Pastikan response.data adalah array
            if (Array.isArray(response.data.data)) {
                const formattedData = response.data.data.map(formatOutletData);
               
                setDataOutlet(formattedData);
                setSelectedOutlet(formattedData[0])
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
        fetchDataOutlet();
    }, []);

    const [DataKategori, setDataKategori] = useState([
        // { id: "m5gr84i9", name: 'Makanan' },
        // { id: "m5gr84i7", name: 'Buah' },
        // { id: "m5gr84i8", name: 'Sayuran' }
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

    const DataStatus = [
        { id: "m5gr84i9", name: 'Produk Aktif' },
        { id: "m5gr84i7", name: 'Produk Tidak Aktif' },
        { id: "m5gr84i8", name: 'Produk Habis' }
    ];

    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [formData, setFormData] = useState({
        produkId:'',
        nama: '',
        kategori: '',
        status: '',
        stok: '',
        foto: '',
        deskripsi:''
    });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const handleCheckboxChange = (kategori) => {
        setSelectedCategory(kategori);
    };
    const handleCheckboxChangestatus = (status) => {
        setSelectedStatus(status);
    };


    const handleSelectOutlet = (outlet) => {
        setSelectedOutlet(outlet);
    };

    const handleRemoveFilter = () => {
        setSelectedCategory(null);
    }
    const handleRemoveFilterstatus = () => {
        setSelectedStatus(null);
    }

    // const Data = [
    //     { id: "m5gr84i9", outlet: 'Outlet 1', nama: 'Sate taichan extracombo', kategori: 'Makanan', status: 'Aktif', stok: '4', foto: 'https://github.com/shadcn.png' },
    //     { id: "m5gr84ig", outlet: 'Outlet 1', nama: 'Mangga', kategori: 'Buah', status: 'Aktif', stok: '99', foto: 'https://github.com/shadcn.png' },
    //     { id: "m5gr8478", outlet: 'Outlet 1', nama: 'Bubur ', kategori: 'Makanan', status: 'Tidak Aktif', stok: '98', foto: 'https://github.com/shadcn.png' },
    //     { id: "m5gr8498", outlet: 'Outlet 1', nama: 'Sate taichan extracombo', kategori: 'Makanan', status: 'Habis', stok: '0', foto: 'https://github.com/shadcn.png' },
    //     { id: "m5gr84e2", outlet: 'Outlet 2', nama: 'Sate taichan ', kategori: 'Makanan', status: 'Aktif', stok: '4', foto: 'https://github.com/shadcn.png' },
    //     { id: "m5gr847d", outlet: 'Outlet 2', nama: 'Sate taichan ', kategori: 'Makanan', status: 'Tidak Aktif', stok: '98', foto: 'https://github.com/shadcn.png' },
    //     { id: "m5gr840d", outlet: 'Outlet 2', nama: 'Melon ', kategori: 'Buah', status: 'Tidak Aktif', stok: '98', foto: 'https://github.com/shadcn.png' },
    //     { id: "m5gr849w", outlet: 'Outlet 2', nama: 'Sate taichan ', kategori: 'Makanan', status: 'Habis', stok: '0', foto: 'https://github.com/shadcn.png' },
    //     { id: "m5gr84iv", outlet: 'Outlet 3', nama: 'Sate ', kategori: 'Makanan', status: 'Aktif', stok: '4', foto: 'https://github.com/shadcn.png' },
    //     { id: "m5gr847w", outlet: 'Outlet 3', nama: 'Sate ', kategori: 'Makanan', status: 'Tidak Aktif', stok: '98', foto: 'https://github.com/shadcn.png' },
    //     { id: "m5gr849i", outlet: 'Outlet 3', nama: 'Sate ', kategori: 'Makanan', status: 'Habis', stok: '0', foto: 'https://github.com/shadcn.png' },
    //     { id: "m5gr849o", outlet: 'Outlet 3', nama: 'Sawi ', kategori: 'Sayuran', status: 'Habis', stok: '0', foto: 'https://github.com/shadcn.png' },
    // ];

    const [Data, setData] = useState([]);

    const formatData = (apiData) => {
        return apiData.map((item, index) => ({
            id: index + 1, 
            produkId: item.product_id, 
            outlet: item.outlet_name,
            nama: item.product_name,
            kategori: item.category_name,
            status: item.status,
            stok: item.stock,
            foto: item.product_image,
            unlimited_stock: item.unlimited_stock,
            deskripsi: item.description
        }));
    };
   
    const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/products/menu?status=default`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
   
           // Log untuk memastikan data yang diterima
   
            // Pastikan response.data adalah array
            if (Array.isArray(response.data.data)) {
                const formattedData = formatData(response.data.data);
               
                setData(formattedData);
                // console.log(formattedData)
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



    // Filter data 
   const filteredData = Data.filter(item => {
    const matchesSearchTerm = searchTerm
            ? item.nama.toLowerCase().includes(searchTerm.toLowerCase())
            : true; // Jika searchTerm kosong, selalu cocok
        // Filter berdasarkan selectedCategory
        const matchesCategory = selectedCategory
            ? item.kategori.toLowerCase() === selectedCategory.name.toLowerCase()
            : true; // Jika tidak ada kategori terpilih, selalu cocok
        // Filter berdasarkan selectedCategory
        const matchesStatus = selectedStatus
            ? item.status.toLowerCase() === selectedStatus.name.toLowerCase()
            : true; // Jika tidak ada kategori terpilih, selalu cocok

    return item.outlet === selectedOutlet.name && matchesSearchTerm && matchesCategory && matchesStatus;
});


    const handleEditClick = (id) => {
        setSelectedId(id);
        setIsDialogOpen(true);
    };

    const [count, setCount] = useState(0);

    useEffect(() => {
        const selectedData = Data.find(item => item.id === selectedId);
        if (selectedData) {
            setFormData({
                produkId: selectedData.produkId,
                nama: selectedData.nama,
                kategori: selectedData.kategori,
                status: selectedData.status,
                stok: selectedData.stok,
                foto: selectedData.foto,
                deskripsi: selectedData.deskripsi
            });

            if (selectedData.stok=== null) {
                setCount(0)
            } else {
                setCount(selectedData.stok)
            }

            

        }
    }, [selectedId]);

    const handleIncrement = () => {
        setCount(count + 1); // Tambah nilai saat tombol diklik
    };
    const handleDecrement = () => {
        setCount(count > 0 ? count - 1 : 0); // Mengurangi nilai, tidak boleh kurang dari 0
    };

    const handleSubmit = async (id) => {
        const token = localStorage.getItem("token");
        const stokValue = count === 0 ? 0 : count;  
        const unlimitedStockValue = count === 0 ? true : false; 
        try {
            
            const response = await axios.put(`${API_URL}/api/products/${id}/status?stock=${stokValue}&status=${formData.status}&unlimited_stock=${unlimitedStockValue}`,{}, {
                headers: {
                     'accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            toast({
                title: "Sukses!",
                description: "Stok berhasil diperbarui.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });    
            
            fetchData();
        } catch (error) {
            console.error('Error:', error);
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error occurred";

            toast({
                variant: "destructive",
                title: "Error ",
                description: errorMessage,
                status: "error",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
        }

        
        setIsDialogOpen(false);
    };


    return (
        <div className='w-full h-full'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="mr-auto w-[180px] h-[36px] text-[14px] text-left border-slate-300 justify-between ">
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
            <div className='py-[32px] mt-[36px]'>
                <div className='flex gap-[12px] w-[416px]'>
                    <Input
                        placeholder="Cari"
                        className="w-[266px] h-[36px] text-[14px] border-slate-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto h-[36px] text-[14px] border-slate-300">
                                <ChevronDown size={16} className="mr-2" /> Kategori
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[184px]">
                            {DataKategori.map((kategori) => (
                                <DropdownMenuItem key={kategori.id} className="h-[36px] p-[12px]"  onClick={() => handleCheckboxChange(kategori)}>
                                    <Checkbox
                                        className="capitalize"
                                        checked={selectedCategory?.id === kategori.id} // Cek jika kategori ini dipilih
                                        onCheckedChange={() => handleCheckboxChange(kategori)}
                                    />
                                    <span className="ml-[8px] text-[14px] font-medium">{kategori.name}</span>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator className="border-[1px] border-slate-200" />
                            <DropdownMenuItem className="h-[36px] font-medium  p-[12px] flex items-center justify-center text-[14px]"  onClick={handleRemoveFilter}>
                                Hapus Filter
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto h-[36px] text-[14px] border-slate-300">
                                <ChevronDown size={16} className="mr-2" /> Status
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[184px]">
                            {DataStatus.map((status) => (
                                <DropdownMenuItem key={status.id} className="h-[36px] p-[12px]" onClick={() => handleCheckboxChangestatus(status)}>
                                    <Checkbox
                                        className="capitalize"
                                        checked={selectedStatus?.id === status.id} // Cek jika kategori ini dipilih
                                        onCheckedChange={() => handleCheckboxChangestatus(status)}
                                    />
                                    <span className="ml-[8px] text-[14px]">{status.name}</span>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator className="border-[1px] border-slate-200" />
                            <DropdownMenuItem className="h-[36px] font-medium  p-[12px] flex items-center justify-center text-[14px]"  onClick={handleRemoveFilterstatus}>
                                Hapus Filter
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className='flex flex-wrap gap-[24px]'>
                {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <div key={item.id} className='w-[360px] h-[175px] border border-slate-300 rounded-[8px] p-[16px] grid gap-[17px]'>
                            <div className='flex gap-[17px]'>
                                <img src={item.foto ? `${API_URL}/images/${item.foto}` : "https://github.com/shadcn.png"} alt={item.nama} className='w-[86px] h-[86px] rounded-[6px]' />
                                <div className='grid gap-[12px]'>
                                    <div className='flex gap-[12px]'>
                                        <h2 className='text-[14px] text-slate-500 font-medium'>{item.kategori}</h2>
                                        <Badge
                                            variant={item.status === "Produk Aktif" ? "secondary" : item.status === "Produk Tidak Aktif" ? "destructive" : item.status === "Produk Habis" ? "destructive" : "outline"}
                                            className="text-[12px] px-[11px]"
                                        >
                                            {item.status}
                                        </Badge>
                                    </div>
                                    <h1 className='text-[16px] font-semibold'>{item.nama}</h1>
                                    <h1 className='text-[14px] font-medium'>Stok : {item.stok !== null ? item.stok : "Tidak terbatas"}</h1>
                                </div>
                            </div>
                            <Button variant="outline" className="ml-auto h-[32px] w-full text-[14px] border-slate-300" onClick={() => handleEditClick(item.id)}>
                                Ubah Stok
                            </Button>
                        </div>
                    ))
                ) : (
                    <div className='w-full h-full'>
                        <NoData />
                    </div>
                )}
            </div>

            {/* edit stok */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[495px] my-[20px] p-[25px]">
                    <div className='flex justify-between'>
                        <DialogHeader>
                            <DialogTitle className='text-[18px] py-[16px]'>Ubah Stok</DialogTitle>
                        </DialogHeader>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">
                                <X className='h-[16px] w-[16px]' />
                            </Button>
                        </DialogClose>

                    </div>
                    <div className="grid gap-[16px] text-[14px]">
                        <div className='flex gap-[17px]'>
                            <img src={formData.foto ? `${API_URL}/images/${formData.foto}` : "https://github.com/shadcn.png"} alt={formData.nama} className='w-[86px] h-[86px] rounded-[6px]' />
                            <div className=''>
                                <p className='text-[14px] text-slate-500 font-medium'>{formData.kategori}</p>
                                <p className='text-[16px] font-semibold'>{formData.nama}</p>
                            </div>
                        </div>
                        <div className='flex'>
                            <p className='w-[200px] text-[14px] font-medium py-[11px]'>Status produk</p>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="airplane-mode"
                                    checked={formData.status === "Produk Aktif"}
                                    onCheckedChange={(checked) => {
                                        const newStatus = checked ? "Produk Aktif" : "Produk Tidak Aktif" || "Produk Habis";
                                        setFormData({ ...formData, status: newStatus });
                                    }}
                                />
                                <Label htmlFor="airplane-mode" className="text-[14px]">{formData.status} </Label>
                            </div>
                        </div>
                        <div className='flex'>
                            <p className='w-[200px] text-[14px] font-medium py-[11px]'>Stok produk</p>
                            <div className="flex items-center space-x-2 bg-zinc-100 rounded-lg border-2 border-zinc-100 h-[36px]">
                                <button
                                    onClick={handleDecrement}
                                    className="bg-white text-black rounded-md p-2"
                                >
                                    <Minus size="16" />
                                </button>
                                <input
                                    type="number"
                                    value={count}
                                    readOnly
                                    className=" w-[80px] text-center font-medium text-[14px] pl-[8px] bg-transparent border-0 focus:outline-none"
                                />
                                <button
                                    onClick={handleIncrement}
                                    className="bg-white text-black rounded-md p-2"
                                >
                                    <Add size="16" />
                                </button>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button className='text-[14px] h-[36px]' onClick={() => handleSubmit(formData.produkId)}>Simpan</Button>
                        </DialogFooter>
                    </div>

                </DialogContent>
            </Dialog>

        </div>
    )
}

export default DataTable;
