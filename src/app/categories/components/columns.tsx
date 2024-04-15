import { IActivity } from '@/models/activity'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<IActivity>[] = [
  {
    accessorKey: 'summary',
    header: 'Summary',
    size: 300,
    maxSize: 300,
  },
  {
    accessorKey: 'contents',
    header: 'Contents',
    size: 850,
    maxSize: 850,
  },
  {
    accessorKey: 'dailyDate',
    header: 'Daily Date',
    minSize: 100,
    maxSize: 100,
  },
]
