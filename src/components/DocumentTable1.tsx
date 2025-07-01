'use client';

import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { motion } from 'framer-motion';

// SVG Icon Components
const PdfHarveyIcon = ({ className }: { className?: string }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 1.25H13.7578C14.487 1.25012 15.1865 1.54005 15.7021 2.05566L19.9443 6.29785C20.46 6.81347 20.7499 7.51301 20.75 8.24219V20C20.75 21.5188 19.5188 22.75 18 22.75H6C4.48122 22.75 3.25 21.5188 3.25 20V4C3.25 2.48122 4.48122 1.25 6 1.25Z" fill="#FAFAF9" stroke="#CCCAC6" strokeWidth="0.5"/>
    <path d="M7.77703 17C9.56757 17 12.4054 9.90541 12.4054 7.81081C12.4054 7.37162 12.0338 7 11.6284 7C11.223 7 10.9527 7.50676 10.9527 8.08108C10.9527 11.6622 14.7365 14.5 16.1892 14.5C16.5781 14.5 17 14.3649 17 13.8243C17 13.2838 16.4595 12.9797 15.8176 12.9797C12.4054 12.9797 7 15.1081 7 16.3243C7 16.7635 7.30405 17 7.77703 17Z" stroke="#E7000B" strokeWidth="1.25"/>
  </svg>
);

const TypeIcon = ({ className }: { className?: string }) => (
  <svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M3 4.5V3H9M9 3H15V4.5M9 3V15M9 15H7.5M9 15H10.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SelectionIcon = ({ className }: { className?: string }) => (
  <svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M5.65721 7.12331L6.50096 7.68585L7.9047 5.81418M10.5434 6.75H12.0434M10.5 11.25H12M5.65721 11.6242L6.50096 12.1867L7.9047 10.315M3.75 15H14.25C14.6642 15 15 14.6642 15 14.25V3.75C15 3.33579 14.6642 3 14.25 3H3.75C3.33579 3 3 3.33579 3 3.75V14.25C3 14.6642 3.33579 15 3.75 15Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FileIcon = ({ className }: { className?: string }) => (
  <svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9.75 2.625V5.25C9.75 6.07843 10.4216 6.75 11.25 6.75H13.875M5.25 2.25H9.1287C9.5265 2.25 9.90803 2.40803 10.1894 2.68934L13.8106 6.31066C14.092 6.59197 14.25 6.97349 14.25 7.37132V14.25C14.25 15.0784 13.5784 15.75 12.75 15.75H5.25C4.42157 15.75 3.75 15.0784 3.75 14.25V3.75C3.75 2.92157 4.42157 2.25 5.25 2.25Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
  {
    id: 11,
    selected: false,
    fileName: '2-23-20250207T001925Z-001.pdf',
    agreementParties: 'Seattle Genetics, Inc. and SAFC, an operating...',
    forceMajeureClause: 'Disputed',
    assignmentProvisionSummary:
      'Assignment requires consent, with exception...',
  },
  {
    id: 12,
    selected: false,
    fileName: 'Plaintiff_Exhibit_List.pdf',
    agreementParties: 'Crown Electrokinetics Corp., Brandywine O...',
    forceMajeureClause: 'Not Disputed',
    assignmentProvisionSummary:
      "Company needs Aron's consent to assign; Aro...",
  },
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
        <span className='inline-block px-2 py-1 rounded-[6px] bg-[#FAFAF9] border border-[#ECEBE9] text-black'>
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

// Cell wrapper component with animation
const AnimatedCell = ({
  children,
  rowIndex,
  columnIndex,
  shouldAnimate,
  cellPadding,
}: {
  children: React.ReactNode;
  rowIndex: number;
  columnIndex: number;
  shouldAnimate: boolean;
  cellPadding: string;
}) => {
  if (!shouldAnimate) {
    return <>{children}</>;
  }

  // Calculate negative margins based on padding
  const negativeMargin = cellPadding === 'px-1' ? '-0.25rem' : '-0.75rem';
  // Create a more organic diagonal wave pattern
  const normalizedRow = rowIndex / 12; // Normalize to 0-1 based on ~12 rows
  const normalizedCol = (columnIndex - 2) / 3; // Normalize to 0-1 for columns 2-4
  const delay = (normalizedRow + normalizedCol) * 0.45;

  // Animation timing: 2 preview waves + 1 reveal wave
  const singleWaveDuration = 0.6;
  const thirdWaveStartTime = delay + singleWaveDuration * 2; // When this cell's 3rd wave starts

  return (
    <div className='relative'>
      {/* Content - initially invisible, reveals during 3rd wave */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.01,
          delay: thirdWaveStartTime + 0.24, // Reveal content when gradient is in the middle of 3rd wave
        }}
      >
        {children}
      </motion.div>

      {/* White overlay that covers the cell initially, disappears at start of 3rd wave */}
      <motion.div
        className='absolute bg-white'
        style={{
          top: negativeMargin,
          left: negativeMargin,
          right: negativeMargin,
          bottom: negativeMargin,
          height: `calc(100% + ${cellPadding === 'px-1' ? '0.5rem' : '1.5rem'})`,
          width: `calc(100% + ${cellPadding === 'px-1' ? '0.5rem' : '1.5rem'})`,
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          duration: 0.01,
          delay: thirdWaveStartTime, // Disappear at start of 3rd wave
        }}
      />

      {/* Animated gradient overlay - repeats 2 times, then final reveal wave */}
      <motion.div
        className='absolute'
        style={{
          top: negativeMargin,
          left: negativeMargin,
          right: negativeMargin,
          bottom: negativeMargin,
          height: `calc(200% + ${cellPadding === 'px-1' ? '1rem' : '3rem'})`, // Double height for gradient
          width: `calc(100% + ${cellPadding === 'px-1' ? '0.5rem' : '1.5rem'})`,
          background: `linear-gradient(to bottom, 
            transparent 0%, 
            rgba(246, 245, 244, 0.3) 20%,
            rgba(226, 225, 224, 0.6) 35%,
            rgba(206, 205, 204, 0.8) 50%,
            rgba(186, 185, 184, 0.6) 65%,
            rgba(166, 165, 164, 0.3) 80%,
            transparent 100%)`,
        }}
        initial={{ y: '-100%' }}
        animate={{ y: '50%' }}
        transition={{
          duration: singleWaveDuration,
          ease: 'easeInOut' as const,
          delay: delay,
          repeat: 2, // Repeat 2 times (3 total waves)
          repeatType: 'loop' as const,
          repeatDelay: 0, // No delay between repeats
        }}
      />
    </div>
  );
};

export default function DocumentTable1() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className='flex items-center justify-center'
      style={{ minHeight: '100vh' }}
    >
      <div className='mb-4'>
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
                    style={{ fontSize: '12px', lineHeight: '16px', color: '#514E48' }}
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
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, cellIndex) => {
                  const shouldAnimate =
                    cell.column.id !== 'select' &&
                    cell.column.id !== 'fileName';
                  const cellPadding =
                    cell.column.id === 'fileName' ? 'px-1' : 'px-3';
                  return (
                    <td
                      key={cell.id}
                      className={`${cellPadding} h-8 ${cell.column.id === 'forceMajeureClause' ? 'w-[250px]' : ''} ${cell.column.id === 'agreementParties' ? 'w-[280px]' : ''} ${cell.column.id === 'assignmentProvisionSummary' ? 'w-[280px]' : ''} ${cell.column.id !== table.getAllColumns()[0].id ? 'border-l border-[#ECEBE9]' : ''} ${row.index !== table.getRowModel().rows.length - 1 ? 'border-b border-[#ECEBE9]' : ''} relative overflow-hidden`}
                      style={{ fontSize: '12px', lineHeight: '16px' }}
                    >
                      <AnimatedCell
                        rowIndex={rowIndex}
                        columnIndex={cellIndex}
                        shouldAnimate={shouldAnimate}
                        cellPadding={cellPadding}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </AnimatedCell>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
