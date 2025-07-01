'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { TextLoop } from '../../components/motion-primitives/text-loop';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

// SVG Icon Components
const PdfHarveyIcon = ({ className }: { className?: string }) => (
  <svg
    width='12'
    height='12'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M6 1.25H13.7578C14.487 1.25012 15.1865 1.54005 15.7021 2.05566L19.9443 6.29785C20.46 6.81347 20.7499 7.51301 20.75 8.24219V20C20.75 21.5188 19.5188 22.75 18 22.75H6C4.48122 22.75 3.25 21.5188 3.25 20V4C3.25 2.48122 4.48122 1.25 6 1.25Z'
      fill='#FAFAF9'
      stroke='#CCCAC6'
      strokeWidth='0.5'
    />
    <path
      d='M7.77703 17C9.56757 17 12.4054 9.90541 12.4054 7.81081C12.4054 7.37162 12.0338 7 11.6284 7C11.223 7 10.9527 7.50676 10.9527 8.08108C10.9527 11.6622 14.7365 14.5 16.1892 14.5C16.5781 14.5 17 14.3649 17 13.8243C17 13.2838 16.4595 12.9797 15.8176 12.9797C12.4054 12.9797 7 15.1081 7 16.3243C7 16.7635 7.30405 17 7.77703 17Z'
      stroke='#E7000B'
      strokeWidth='1.25'
    />
  </svg>
);

const TypeIcon = ({ className }: { className?: string }) => (
  <svg
    width='12'
    height='12'
    viewBox='0 0 18 18'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M3 4.5V3H9M9 3H15V4.5M9 3V15M9 15H7.5M9 15H10.5'
      stroke='black'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const SelectionIcon = ({ className }: { className?: string }) => (
  <svg
    width='12'
    height='12'
    viewBox='0 0 18 18'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M5.65721 7.12331L6.50096 7.68585L7.9047 5.81418M10.5434 6.75H12.0434M10.5 11.25H12M5.65721 11.6242L6.50096 12.1867L7.9047 10.315M3.75 15H14.25C14.6642 15 15 14.6642 15 14.25V3.75C15 3.33579 14.6642 3 14.25 3H3.75C3.33579 3 3 3.33579 3 3.75V14.25C3 14.6642 3.33579 15 3.75 15Z'
      stroke='black'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const FileIcon = ({ className }: { className?: string }) => (
  <svg
    width='12'
    height='12'
    viewBox='0 0 18 18'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M9.75 2.625V5.25C9.75 6.07843 10.4216 6.75 11.25 6.75H13.875M5.25 2.25H9.1287C9.5265 2.25 9.90803 2.40803 10.1894 2.68934L13.8106 6.31066C14.092 6.59197 14.25 6.97349 14.25 7.37132V14.25C14.25 15.0784 13.5784 15.75 12.75 15.75H5.25C4.42157 15.75 3.75 15.0784 3.75 14.25V3.75C3.75 2.92157 4.42157 2.25 5.25 2.25Z'
      stroke='black'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

type Document = {
  id: number;
  selected: boolean;
  fileName: string;
  agreementParties: string;
  forceMajeureClause: 'Disputed' | 'Not Disputed' | 'Somewhat Disputed';
  assignmentProvisionSummary: string;
};

const data: Document[] = [
  {
    id: 1,
    selected: false,
    fileName: 'SEC_Filing_10-K_2023.pdf',
    agreementParties: 'TerreStar 1.4 Holdings LLC (Lessor), TerreStar...',
    forceMajeureClause: 'Disputed',
    assignmentProvisionSummary:
      'No assignment without consent, except to wh...',
  },
  {
    id: 2,
    selected: false,
    fileName: 'C05763098.pdf',
    agreementParties: 'T-Mobile USA, Inc., DISH Purchasing Corporat...',
    forceMajeureClause: 'Somewhat Disputed',
    assignmentProvisionSummary: 'No assignment without prior written consent.',
  },
  {
    id: 3,
    selected: false,
    fileName: 'Probable Cause Hearing Transcripts...',
    agreementParties: 'SunSpark Technology Inc. (California corporati...',
    forceMajeureClause: 'Not Disputed',
    assignmentProvisionSummary:
      'No assignment without consent, null if viola...',
  },
  {
    id: 4,
    selected: false,
    fileName: 'Delta Inventory Supply Agreement.pdf',
    agreementParties: 'Delta Airlines LLC (Georgia corporation)',
    forceMajeureClause: 'Not Disputed',
    assignmentProvisionSummary: 'No assignment without prior written consent.',
  },
  {
    id: 5,
    selected: false,
    fileName: 'menlo-shankar-PEO.pdf',
    agreementParties: 'Smith & Wesson Inc., Crimson Trace Corporati...',
    forceMajeureClause: 'Not Disputed',
    assignmentProvisionSummary:
      'WKKC cannot assign the contract without Kel...',
  },
  {
    id: 6,
    selected: false,
    fileName: 'Deposition_Transcript_Jones.pdf',
    agreementParties: 'No information',
    forceMajeureClause: 'Disputed',
    assignmentProvisionSummary:
      'No assignment without consent, except to wh...',
  },
  {
    id: 7,
    selected: false,
    fileName: 'Discovery_Request_21083.pdf',
    agreementParties: 'Ultragenyx Pharmaceutical Inc. (UGX), IOI Oleo...',
    forceMajeureClause: 'Disputed',
    assignmentProvisionSummary: 'Assignment allowed with conditions.',
  },
  {
    id: 8,
    selected: false,
    fileName: 'AD08912631234.pdf',
    agreementParties: 'No information',
    forceMajeureClause: 'Disputed',
    assignmentProvisionSummary: 'Assignment requires prior written consent.',
  },
  {
    id: 9,
    selected: false,
    fileName: 'tmp_lease_document2023621.pdf',
    agreementParties: "Pilgrim's Pride Corporation (Shipper), Pat Pilgri...",
    forceMajeureClause: 'Somewhat Disputed',
    assignmentProvisionSummary: 'No assignment without prior written consent.',
  },
  {
    id: 10,
    selected: false,
    fileName: 'policy_document_12_24_08.pdf',
    agreementParties: 'No information',
    forceMajeureClause: 'Somewhat Disputed',
    assignmentProvisionSummary:
      'Assignment requires consent, with exception...',
  },
];

type ActiveCell = {
  rowIndex: number;
  columnId: string;
};

// Active cell movement pattern - cycles through different cells systematically
const activeCellSequence: ActiveCell[] = [
  // First pass: File names
  { rowIndex: 0, columnId: 'fileName' },
  { rowIndex: 1, columnId: 'fileName' },
  { rowIndex: 2, columnId: 'fileName' },
  { rowIndex: 3, columnId: 'fileName' },
  // Agreement parties
  { rowIndex: 0, columnId: 'agreementParties' },
  { rowIndex: 4, columnId: 'agreementParties' },
  { rowIndex: 1, columnId: 'agreementParties' },
  { rowIndex: 7, columnId: 'agreementParties' },
  // Force majeure clauses
  { rowIndex: 2, columnId: 'forceMajeureClause' },
  { rowIndex: 5, columnId: 'forceMajeureClause' },
  { rowIndex: 8, columnId: 'forceMajeureClause' },
  { rowIndex: 0, columnId: 'forceMajeureClause' },
  // Assignment provisions
  { rowIndex: 3, columnId: 'assignmentProvisionSummary' },
  { rowIndex: 6, columnId: 'assignmentProvisionSummary' },
  { rowIndex: 9, columnId: 'assignmentProvisionSummary' },
  { rowIndex: 1, columnId: 'assignmentProvisionSummary' },
  // More complex pattern covering remaining rows
  { rowIndex: 4, columnId: 'agreementParties' },
  { rowIndex: 7, columnId: 'fileName' },
  { rowIndex: 2, columnId: 'agreementParties' },
  { rowIndex: 9, columnId: 'forceMajeureClause' },
  { rowIndex: 5, columnId: 'assignmentProvisionSummary' },
  { rowIndex: 8, columnId: 'fileName' },
  { rowIndex: 6, columnId: 'forceMajeureClause' },
];

const columnHelper = createColumnHelper<Document>();

const columns = [
  columnHelper.display({
    id: 'select',
    header: () => (
      <div className='flex justify-center'>
        <input type='checkbox' className='custom-checkbox' />
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex justify-center'>
        <span>{row.index + 1}</span>
      </div>
    ),
  }),
  columnHelper.accessor('fileName', {
    header: () => (
      <div className='flex items-center gap-1'>
        <FileIcon />
        <span>File</span>
      </div>
    ),
    cell: ({ getValue }) => (
      <div className='flex items-center gap-1 px-2 py-1 rounded-[4px] bg-[#F3F3F1]'>
        <PdfHarveyIcon className='h-3 w-3 text-gray-400 flex-shrink-0' />
        <span className='truncate'>{getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor('agreementParties', {
    header: () => (
      <div className='flex items-center gap-1'>
        <TypeIcon />
        <span>Agreement Parties</span>
      </div>
    ),
    size: 280,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <span
          className='block truncate'
          style={{ color: value === 'No information' ? '#706D66' : 'inherit' }}
        >
          {value}
        </span>
      );
    },
  }),
  columnHelper.accessor('forceMajeureClause', {
    header: () => (
      <div className='flex items-center gap-1'>
        <SelectionIcon />
        <span>Force Majeure Clause Reference</span>
      </div>
    ),
    size: 250,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <span className='inline-block px-2 py-1 rounded-[6px] bg-[#FAFAF9] border border-[#ECEBE9] text-black whitespace-nowrap'>
          {value}
        </span>
      );
    },
  }),
  columnHelper.accessor('assignmentProvisionSummary', {
    header: () => (
      <div className='flex items-center gap-1'>
        <TypeIcon />
        <span>Assignment Provision Summary</span>
      </div>
    ),
    size: 280,
    cell: ({ getValue }) => (
      <span className='block truncate'>{getValue()}</span>
    ),
  }),
];

export default function DocumentTable5() {
  const [activeCell, setActiveCell] = useState<ActiveCell | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ['1/3', '2/3', '3/3'];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });





  useEffect(() => {
    let currentIndex = 0;
    
    // Start active cell animation immediately
    const cellTimer = setInterval(() => {
      setActiveCell(activeCellSequence[currentIndex]);
      currentIndex = (currentIndex + 1) % activeCellSequence.length;
    }, 800); // Change active cell every 800ms

    return () => clearInterval(cellTimer);
  }, []);

  useEffect(() => {
    // Step counter animation - sync with TextLoop (4 seconds)
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(stepTimer);
  }, [steps.length]);



  const isCellActive = (rowIndex: number, columnId: string) => {
    return (
      activeCell?.rowIndex === rowIndex && activeCell?.columnId === columnId
    );
  };

  return (
    <div
      className='flex items-center justify-center relative'
      style={{ minHeight: '100vh' }}
    >
      {/* Main Table Container */}
      <div className='flex flex-col'>
        <table className='border-separate border-spacing-0 rounded-[8px] border border-[#ECEBE9]'>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className={`px-3 h-8 text-left font-medium ${
                      header.id === 'select' ? 'w-[48px]' : ''
                    } ${header.id === 'forceMajeureClause' ? 'w-[250px]' : ''} ${header.id === 'agreementParties' ? 'w-[280px]' : ''} ${header.id === 'assignmentProvisionSummary' ? 'w-[280px]' : ''} ${header.index !== 0 ? 'border-l border-[#ECEBE9]' : ''} border-b border-[#ECEBE9]`}
                    style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#514E48',
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    const cellPadding =
                      cell.column.id === 'fileName' ? 'px-1' : 'px-3';
                    const isActive = isCellActive(row.index, cell.column.id);

                                          return (
                        <td
                          key={cell.id}
                          className={`${cellPadding} h-8 relative transition-all duration-300 ${cell.column.id === 'forceMajeureClause' ? 'w-[250px]' : ''} ${cell.column.id === 'agreementParties' ? 'w-[280px]' : ''} ${cell.column.id === 'assignmentProvisionSummary' ? 'w-[280px]' : ''} ${cell.column.id !== table.getAllColumns()[0].id ? 'border-l border-[#ECEBE9]' : ''} ${row.index !== table.getRowModel().rows.length - 1 ? 'border-b border-[#ECEBE9]' : ''}`}
                          style={{
                            fontSize: '12px',
                            lineHeight: '16px',
                          }}
                        >
                      {/* Active cell highlight */}
                      {isActive && (
                        <>
                          {/* Static border with purple color */}
                          <div className="absolute inset-0 rounded-tl-md rounded-bl-md rounded-br-md border-2 pointer-events-none z-10" style={{ borderColor: '#8D76BC' }} />
                          {/* Subtle background glow */}
                          <div className="absolute inset-0 rounded-tl-md rounded-bl-md rounded-br-md pointer-events-none z-0" style={{ backgroundColor: '#F0EBFA' }} />
                          {/* Harvey tag */}
                          <div className="absolute -top-[21px] -right-[0px] inline-flex items-center gap-1 rounded-tl-full rounded-tr-full rounded-bl-full py-0.5 pl-0.5 pr-2 pointer-events-none z-20" style={{ backgroundColor: '#8D76BC' }}>
                            <Image 
                              src="/harvey_avatar.png" 
                              alt="Harvey"
                              width={14}
                              height={14}
                              className="rounded-full flex-shrink-0"
                            />
                            <span className="text-[12px]" style={{ color: 'white' }}>Harvey</span>
                          </div>
                        </>
                      )}
                      
                      <div className="relative z-20">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Step Status - Below Table */}
        <div className='w-full border border-[#ECEBE9] rounded-[8px] px-4 py-3 bg-white mt-3'>
          <div className='flex items-center justify-between text-gray-600 font-medium text-sm'>
            <div className='flex items-center space-x-2'>
              <Loader2 className='h-4 w-4 animate-spin' />
              <TextLoop
                className='text-gray-600 font-medium text-sm'
                interval={4}
              >
                <span>Harvey is chunking and embedding the documents</span>
                <span>Harvey is identifying key contract terms</span>
                <span>Harvey is extracting the chronology of key events</span>
              </TextLoop>
            </div>
            <span className='text-xs' style={{ color: '#706D66' }}>
              {steps[currentStep]}
            </span>
          </div>
        </div>
      </div>



      {/* Custom CSS for scan line animation */}
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
