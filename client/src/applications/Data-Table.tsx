import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
  } from "@tanstack/react-table"
   
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftCircle, ArrowRightCircle, BookOpen, Columns2, TextSearch } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import JobApplicationSheet from "./AddJobApplicationSheet"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [ sorting, setSorting ] = useState<SortingState>([])
    const [ columnFilters, setColumnFilters ] = useState<ColumnFiltersState>([])
    const [ columnVisibility, setColumnVisibility ] = useState<VisibilityState>({})
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        }
        
    })
    const totalRows = data.length
    const currentPage = table.getState().pagination.pageIndex;
    const currentPageSize = table.getState().pagination.pageSize;
    const startRow = currentPage * currentPageSize + 1;
    const endRow = Math.min((currentPage + 1) * currentPageSize, totalRows)

    return (
        <Card className='rounded-2xl shadow-xl'>
            <CardContent>
                <div className='flex items-center py-4 gap-2'>
                    <div className='relative max-w-sm'>
                        <Input
                        placeholder='Filter companies...'
                        value={(table.getColumn('Company Name')?.getFilterValue() as string) ?? ''}
                        onChange={(e) => table.getColumn('Company Name')?.setFilterValue(e.target.value)}
                        className='font-tertiary font-medium px-10 ring-0 border-2 focus:!border-gray-600 focus-visible:ring-offset-0 focus-visible:ring-0' />
                        <TextSearch className='text-black absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600' />    
                    </div>
                    {/* Job Application Sheet Component */}
                    <JobApplicationSheet />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' className='ml-auto text-sm font-medium text-gray-600 font-tertiary'>
                                <Columns2 className='text-black'/> Columns 
                                <div className='flex items-center justify-center bg-black text-white rounded-[0.3rem] text-sm text-black font-tertiary font-medium w-5.5 px-1'>
                                    <span> {table.getVisibleFlatColumns().length} </span>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem key={column.id} className='capitalize font-tertiary font-medium' checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className='border rounded-xl overflow-hidden'>
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead className='bg-gray-100' key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell  key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className='h-24 text-center font-tertiary text-md'>
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>        
                </div>
                <div className='flex items-center justify-between py-5'>
                    <div>
                        <p className='text-md font-tertiary text-gray-600 font-medium'>
                            Showing <span className='text-black'> {startRow}-{endRow} </span> of <span className='text-black'> {totalRows} </span> results
                        </p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Button className='text-sm font-tertiary font-medium text-gray-600' variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            <ArrowLeftCircle className='text-black' /> Previous
                        </Button>
                        <Button className='text-sm font-tertiary font-medium text-gray-600' variant='outline' size='sm'>
                            <BookOpen className='text-black' /> Page: <span className='text-black'> {table.getState().pagination.pageIndex + 1} </span>
                        </Button>
                        <Button className='text-sm font-tertiary font-medium text-gray-600' variant='outline' size='sm'  onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            Next <ArrowRightCircle className='text-black' />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
