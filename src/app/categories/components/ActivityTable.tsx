import Backdrop from '@/app/(shared)/components/backdrop'
import { Button } from '@/app/(shared)/components/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/(shared)/components/table'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table'
import { IActivity } from '@/models/activity'
import { useState } from 'react'
import { formatDailyDateToDate } from '@/app/(shared)/util/formatDate'

type RowDataType = IActivity | null

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [currentAtvt, setCurrentAtvt] = useState<RowDataType>(null)
  const [atvtDetail, setAtvtDetail] = useState(false)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 12,
  })

  const table = useReactTable({
    data,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  return (
    <div>
      {!!atvtDetail && currentAtvt && (
        <div>
          <Backdrop handleCancel={() => setAtvtDetail(false)} />
          <div className='fixed top-[14svh] left-0 w-1/2 translate-x-1/2 bg-white z-40 rounded-md min-h-fit max-h-[50svh] p-4 space-y-4 overflow-y-auto'>
            <div className='font-semibold text-lg'>
              {currentAtvt.summary} <br />
              {formatDailyDateToDate(currentAtvt.dailyDate)} <br />
            </div>
            <div className='font-light text-xs text-neutral-500'>
              생성일자: <span> </span>
              {currentAtvt.createdAt ? (
                <span>
                  {new Date(currentAtvt.createdAt).toLocaleDateString('ko-kr', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              ) : null}
              <br />
              수정일자: <span> </span>
              {currentAtvt.updatedAt ? (
                <span>
                  {new Date(currentAtvt.updatedAt).toLocaleDateString('ko-kr', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              ) : null}
            </div>
            <div className='whitespace-pre-line text-sm'>
              {currentAtvt.contents}
            </div>
          </div>
        </div>
      )}
      <Table className='w-[80vw]'>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
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
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={() => {
                  setAtvtDetail(true)
                  setCurrentAtvt(row.original as IActivity)
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      maxWidth: `${cell.column.getSize()}px`,
                      height: '20px',
                      maxHeight: '20px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      wordBreak: 'break-word',
                      whiteSpace: 'nowrap',
                      WebkitLineClamp: 2,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>No results.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {table.getPageCount() > 1 && (
        <div className='flex items-center justify-center space-x-2 py-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <p>
            {pagination.pageIndex + 1} / {table.getPageCount()}
          </p>

          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
