import React, { useState, useEffect } from "react"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { MoreVertical } from "lucide-react"
import { GoPlus } from "react-icons/go";
import { User, } from 'iconsax-react';
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import NoData from "./NoData";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";
import dayjs from "dayjs";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from "@/components/ui/toast";








// Main component
const DataTableAktif = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    // data
    const [data, setData] = useState([
        // {
        //     id: "0001",
        //     name: 'Alinea',
        //     item:'Kopi, Taichan Premium, Mi indomie',
        //     harga: "5000",
        //     bayar: "Cash",
        //     date: "23 Oktober 2024, 13.00",
        // },
        // {
        //     id: "0002",
        //     name: 'Bayu',
        //     item:'Kopi, Taichan Premium, Mi indomie',
        //     harga: "5000",
        //     bayar: "QRIS",
        //     date: "23 Oktober 2024, 13.00",
        // },
        // {
        //     id: "0003",
        //     name: 'Abimayu',
        //     item:'Kopi, Taichan Premium, Mi indomie',
        //     harga: "5000",
        //     bayar: "Cash",
        //     date: "23 Oktober 2024, 13.00",
        // },
        // {
        //     id: "0004",
        //     name: 'Abimayu',
        //     item:'Kopi, Taichan Premium, Mi indomie',
        //     harga: "5000",
        //     bayar: "QRIS",
        //     date: "23 Oktober 2024, 13.00",
        // },
        // {
        //     id: "0005",
        //     name: 'Abimayu',
        //     item:'Kopi, Taichan Premium, Mi indomie',
        //     harga: "5000",
        //     bayar: "QRIS",
        //     date: "23 Oktober 2024, 13.00",
        // },
        // {
        //     id: "0006",
        //     name: 'Abimayu',
        //     item:'Kopi, Taichan Premium, Mi indomie',
        //     harga: "5000",
        //     bayar: "QRIS",
        //     date: "23 Oktober 2024, 13.00",
        // },
        
    ]);

    // status
    const [originalData, setOriginalData] = useState(data); // Tambahkan state untuk data asli


    const formatData = (apiData) => {
        return {
            id: apiData.transaksi_id,
            name: apiData.transaksi_name,
            tipeOrder: apiData.tipe_order,
            KetBayar: apiData.ket_bayar,
            tipe_bayar: apiData.tipe_bayar,
            date: apiData.createdAt,
            kasir: apiData.kasir_name,
            item : (apiData.detailtransaksi || []).map(item => item.product_name).join(', '),
            detailTransaksi: apiData.detailtransaksi || [],
            total: apiData.total,
            tax: apiData.detailpajaks || [],
            diskon: apiData.detaildiskons || [],
            subtotal: apiData.sub_total,
            bayar: apiData.bayar,
            kembalian: apiData.kembalian,
        };
    };

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        const id_kasir = localStorage.getItem("id_kasir");
        try {
            const response = await axios.get(`${API_URL}/api/transaksi?status=active&id_kasir=${id_kasir}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

           // Log untuk memastikan data yang diterima

            // Pastikan response.data adalah array
            if (Array.isArray(response.data.data)) {
                const formattedData = response.data.data.map(formatData);
               
                setData(formattedData);
                setOriginalData(formattedData); // Set originalData di sini
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

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.delete(`${API_URL}/api/transaksi/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          toast({
            title: "Sukses",
            description: "Data berhasil dihapus",
            action: <ToastAction altText="Try again">Cancel</ToastAction>,
          });
      
          // Panggil fetchData untuk memperbarui data setelah penghapusan
          fetchData();
        } catch (error) {
          console.error("Error deleting data", error);
      
          // Tampilkan pesan toast untuk error
          toast({
            variant: "destructive",
            title: "Gagal",
            description: "Data gagal dihapus. Silakan coba lagi.",
            action: <ToastAction altText="Try again">Coba Lagi</ToastAction>,
          });
        }
      };

    // Define columns
    const columns = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="h-[16px] w-[16px]"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="h-[16px] w-[16px]"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: "Id Order",
            cell: ({ row }) => (
                <div className="capitalize font-medium">#{row.getValue("id")}</div>
            ),
        },
        {
            accessorKey: "name",
            header: "Nama Pelanggan",
            cell: ({ row }) => (
                <div className="capitalize font-medium">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "item",
            header: "Item",
            cell: ({ row }) => (
                <div className="capitalize font-medium">{row.getValue("item")}</div>
            ),
        },
        {
            accessorKey: "subtotal",
            header: "Total Bayar",
            cell: ({ row }) => <div className=" font-medium">Rp {parseInt(row.getValue("subtotal")).toLocaleString('id-ID')}</div>,
        },
        {
            accessorKey: "tipe_bayar",
            header: "Metode Bayar",
            cell: ({ row }) => (
                <div className="capitalize font-medium">{row.getValue("tipe_bayar")}</div>
            ),
        },
        {
            accessorKey: "date",
            header: "Waktu & Tanggal",
            cell: ({ row }) => {
                const dateValue = row.getValue("date"); // Ambil nilai `date` dari baris
                const formattedDate = dayjs(dateValue).format('DD MMMM YYYY, HH.mm'); // Format tanggalnya
            
                return (
                  <div className="capitalize font-medium">
                    {formattedDate.length > 18 ? `${formattedDate.slice(0, 18)}...` : formattedDate}
                  </div>
                );
              },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {

                return (
                    <Button  variant="secondary" className="text-[12px]">Buka</Button>
                )
            },
        },
        {
            id: "actions-dropdown",
            enableHiding: false,
            cell: ({ row }) => {
                const id = row.getValue("id");
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button  variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[164px]">
                            <DropdownMenuItem onClick={() => handleDelete(id)} className="p-3 gap-3 text-[14px] font-medium text-rose-500 focus:text-rose-500">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]



    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });;


    // Tentukan jumlah halaman berdasarkan total data dan pageSize
    const pageCount = Math.ceil(data.length / pagination.pageSize);

    // Tentukan data untuk halaman saat ini berdasarkan pageIndex dan pageSize
    const startIdx = pagination.pageIndex * pagination.pageSize;
    const endIdx = startIdx + pagination.pageSize;
    const pageData = originalData.slice(startIdx, endIdx);

    const table = useReactTable({
        data: pageData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
        pageCount, // Total halaman
        manualPagination: true,  // Menggunakan pagination manual
        pageSize: pagination.pageSize,
        pageIndex: pagination.pageIndex,
        onPaginationChange: setPagination,
    })

    const totalPages = Math.ceil(data.length / pagination.pageSize);
    const [filters, setFilters] = useState({
        bayar: [],
      });
    const DataBayar = [
        { id: "m5gr84i9", name: 'Cash' },
        { id: "m5gr84i7", name: 'QRIS' },
    ]
    const handleFilterChange = (selectedValue) => {
        setColumnFilters([{ id: 'tipe_bayar', value: selectedValue }]);
        setFilters({ bayar: [selectedValue] });
      };
      const handleClearFilters = () => {
        setFilters({ bayar: [] });  
        setColumnFilters([]);  
      };
    
    return (
        <div className="w-full grid gap-[16px] mt-[24px]">
            <div className="flex items-center  justify-between">
                <div className="flex gap-[12px]">
                    <Input
                        placeholder="Cari"
                        value={(table.getColumn("name")?.getFilterValue() || "")}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="w-[266px] h-[36px]"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto h-[36px] text-[14px] border-slate-300">
                                <ChevronDown size={16} className="mr-2" /> Metode Bayar
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[184px]">
                            {DataBayar.map((bayar) => (
                                <DropdownMenuItem key={bayar.id} className="h-[36px] p-[12px]" onClick={() => handleFilterChange(bayar.name)}>
                                    <Checkbox 
                                       checked={filters.bayar.includes(bayar.name)}
                                       onCheckedChange={() => handleFilterChange(bayar.name)}
                                       className="capitalize"
                                    />
                                    <span className="ml-[8px] text-[14px]">{bayar.name}</span>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuItem onClick={handleClearFilters} className="h-[36px] font-medium  p-[12px] flex items-center justify-center text-[14px]">
                                Hapus Filter
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto h-[32px] text-[14px] border-slate-300">
                            <ChevronDown size={16} className="mr-2" /> View
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[184px]">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuItem key={column.id} className="h-[36px] p-[12px]"  onClick={() => column.toggleVisibility(!column.getIsVisible())}>
                                    <Checkbox
                                        
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    />
                                    <span className="ml-[8px] text-[14px]">{column.id}</span>
                                </DropdownMenuItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {pageData.length === 0 ? (
                <NoData />
            ) : (
                <div className="">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        <NoData/>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Bagian Pagination hanya ditampilkan jika ada data */}
                    {table.getRowModel().rows.length > 0 && (
                        <div className="flex items-center justify-end space-x-2 ">
                            <div className="flex-1 text-[14px] text-muted-foreground">
                                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                                {table.getFilteredRowModel().rows.length} row(s) selected.
                            </div>
                            <div className="space-x-2">
                                <Pagination>
                                    <PaginationContent>
                                        {/* Tombol Previous */}
                                        <PaginationItem>
                                            <Button
                                                variant="outline"
                                                onClick={() => table.previousPage()}
                                                disabled={pagination.pageIndex === 0}
                                                className="text-[14px]"
                                            >
                                                Previous
                                            </Button>
                                        </PaginationItem>

                                        {/* Loop untuk menampilkan nomor halaman */}
                                        {[...Array(totalPages).keys()].map((pageIndex) => (
                                            <PaginationItem key={pageIndex}>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={() => setPagination({ ...pagination, pageIndex })} // Ubah halaman
                                                    isActive={pagination.pageIndex === pageIndex} // Tandai halaman aktif
                                                    className={`border-0 font-medium text-[14px] ${pagination.pageIndex === pageIndex ? 'text-black' : 'text-slate-400'}`}
                                                >
                                                    {pageIndex + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}

                                        {/* Ellipsis untuk banyak halaman */}
                                        {totalPages > 5 && <PaginationEllipsis />}

                                        {/* Tombol Next */}
                                        <PaginationItem>
                                            <Button
                                                variant="outline"
                                                onClick={() => table.nextPage()}
                                                disabled={pagination.pageIndex >= totalPages - 1}
                                                className="text-[14px]"
                                            >
                                                Next
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    )}
                </div>
            )}  
        </div>
    )
}

export default DataTableAktif
