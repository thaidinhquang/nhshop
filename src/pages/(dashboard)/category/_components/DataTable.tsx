/* eslint-disable @typescript-eslint/no-explicit-any */
import { flexRender } from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { deleteCategory } from "@/services/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const DataTable = ({ table, columns }: any) => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset } = useForm();
    const mutation = useMutation({
        mutationFn: async (id: number) => {
            if(confirm('Bạn có muốn xóa ?')){
                const { data } = await deleteCategory(id);
                return data;
            }
        },
        onSuccess: () => {
            reset();
            toast({
                title: "Xóa danh mục thành công",
                variant: "success",
            });
            queryClient.invalidateQueries();
        },
    });

    const handleDelete = (id: number) => {
        mutation.mutate(id);
    }
    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup: any) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header: any) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </TableHead>
                            );
                        })}
                        <TableHead key="delete" >Action</TableHead>
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row: any) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell: any) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </TableCell>
                            ))}
                            <TableCell key="delete">
                            <button onClick={() => handleDelete(row.original._id)} className="bg-red-600 p-2  text-white rounded">Delete</button>
                            </TableCell>
                            
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                        >
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default DataTable;
