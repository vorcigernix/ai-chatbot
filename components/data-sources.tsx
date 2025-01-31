'use client';

import { cn } from '@/lib/utils';
import { DatabaseIcon, TableIcon } from 'lucide-react';

interface DataSource {
  id: string;
  type: string;
  schema: string;
  columns: string[];
  rowCount: number;
}

interface DataSourcesProps {
  sources: DataSource[];
}

export function DataSources({ sources = [] }: DataSourcesProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl p-4 border max-w-[500px]">
      <div className="flex items-center gap-2 text-lg font-medium">
        <DatabaseIcon className="h-5 w-5" />
        <span>Available Data Sources</span>
      </div>
      
      <div className="flex flex-col gap-3">
        {sources.map(source => (
          <div 
            key={source.id}
            className="flex flex-col gap-2 p-3 rounded-lg bg-muted/50"
          >
            <div className="flex items-center gap-2">
              <TableIcon className="h-4 w-4" />
              <span className="font-medium">{source.id}</span>
              <span className="text-sm text-muted-foreground">
                ({source.schema})
              </span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {source.columns.join(', ')}
            </div>
            
            <div className="text-xs text-muted-foreground">
              {source.rowCount.toLocaleString()} rows
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}