"use client";

import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

type Document = {
  id: number;
  selected: boolean;
  fileName: string;
  agreementParties: string;
  forceMajeureClause: "Disputed" | "Not Disputed" | "Somewhat Disputed";
  assignmentProvisionSummary: string;
};

const data: Document[] = [
  {
    id: 1,
    selected: false,
    fileName: "SEC_Filing_10-K_2023.pdf",
    agreementParties: "TerreStar 1.4 Holdings LLC (Lessor), TerreStar...",
    forceMajeureClause: "Disputed",
    assignmentProvisionSummary: "No assignment without consent, except to wh...",
  },
  {
    id: 2,
    selected: false,
    fileName: "C05763098.pdf",
    agreementParties: "T-Mobile USA, Inc., DISH Purchasing Corporat...",
    forceMajeureClause: "Somewhat Disputed",
    assignmentProvisionSummary: "No assignment without prior written consent.",
  },
  {
    id: 3,
    selected: false,
    fileName: "Probable Cause Hearing Transcripts...",
    agreementParties: "SunSpark Technology Inc. (California corporati...",
    forceMajeureClause: "Not Disputed",
    assignmentProvisionSummary: "No assignment without consent, null if viola...",
  },
  {
    id: 4,
    selected: false,
    fileName: "Delta Inventory Supply Agreement.pdf",
    agreementParties: "Delta Airlines LLC (Georgia corporation)",
    forceMajeureClause: "Not Disputed",
    assignmentProvisionSummary: "No assignment without prior written consent.",
  },
  {
    id: 5,
    selected: false,
    fileName: "menlo-shankar-PEO.pdf",
    agreementParties: "Smith & Wesson Inc., Crimson Trace Corporati...",
    forceMajeureClause: "Not Disputed",
    assignmentProvisionSummary: "WKKC cannot assign the contract without Kel...",
  },
  {
    id: 6,
    selected: false,
    fileName: "Deposition_Transcript_Jones.pdf",
    agreementParties: "No information",
    forceMajeureClause: "Disputed",
    assignmentProvisionSummary: "No assignment without consent, except to wh...",
  },
  {
    id: 7,
    selected: false,
    fileName: "Discovery_Request_21083.pdf",
    agreementParties: "Ultragenyx Pharmaceutical Inc. (UGX), IOI Oleo...",
    forceMajeureClause: "Disputed",
    assignmentProvisionSummary: "Assignment allowed with conditions.",
  },
  {
    id: 8,
    selected: false,
    fileName: "AD08912631234.pdf",
    agreementParties: "No information",
    forceMajeureClause: "Disputed",
    assignmentProvisionSummary: "Assignment requires prior written consent.",
  },
  {
    id: 9,
    selected: false,
    fileName: "tmp_lease_document2023621.pdf",
    agreementParties: "Pilgrim's Pride Corporation (Shipper), Pat Pilgri...",
    forceMajeureClause: "Somewhat Disputed",
    assignmentProvisionSummary: "No assignment without prior written consent.",
  },
  {
    id: 10,
    selected: false,
    fileName: "policy_document_12_24_08.pdf",
    agreementParties: "No information",
    forceMajeureClause: "Somewhat Disputed",
    assignmentProvisionSummary: "Assignment requires consent, with exception...",
  },
  {
    id: 11,
    selected: false,
    fileName: "2-23-20250207T001925Z-001.pdf",
    agreementParties: "Seattle Genetics, Inc. and SAFC, an operating...",
    forceMajeureClause: "Disputed",
    assignmentProvisionSummary: "Assignment requires consent, with exception...",
  },
  {
    id: 12,
    selected: false,
    fileName: "Plaintiff_Exhibit_List.pdf",
    agreementParties: "Crown Electrokinetics Corp., Brandywine O...",
    forceMajeureClause: "Not Disputed",
    assignmentProvisionSummary: "Company needs Aron's consent to assign; Aro...",
  },
];

const columnHelper = createColumnHelper<Document>();

const columns = [
  columnHelper.display({
    id: "select",
    header: () => (
      <div className="flex justify-center">
        <input
          type="checkbox"
          className="custom-checkbox"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span>{row.index + 1}</span>
      </div>
    ),
  }),
  columnHelper.accessor("fileName", {
    header: "File",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-1 px-2 py-1 rounded-[4px] bg-[#F3F3F1]">
        <FileText className="h-3 w-3 text-gray-400" />
        <span>{getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor("agreementParties", {
    header: "Agreement Parties",
    cell: ({ getValue }) => <span>{getValue()}</span>,
  }),
  columnHelper.accessor("forceMajeureClause", {
    header: "Force Majeure Clause Reference",
    size: 250,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <span 
          className="inline-block px-2 py-1 rounded-[6px] bg-[#FAFAF9] border border-[#ECEBE9] text-black"
        >
          {value}
        </span>
      );
    },
  }),
  columnHelper.accessor("assignmentProvisionSummary", {
    header: "Assignment Provision Summary",
    cell: ({ getValue }) => <span>{getValue()}</span>,
  }),
];

// Cell wrapper component with animation
const AnimatedCell = ({ children, rowIndex, columnIndex, shouldAnimate, cellPadding }: { 
  children: React.ReactNode, 
  rowIndex: number, 
  columnIndex: number,
  shouldAnimate: boolean,
  cellPadding: string
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

  return (
    <div className="relative">
      {/* Content - initially invisible */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.01,
          delay: delay + 0.24 // Reveal content when gradient is in the middle
        }}
      >
        {children}
      </motion.div>
      
      {/* White overlay that covers the cell initially */}
      <motion.div
        className="absolute bg-white"
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
          delay: delay
        }}
      />
      
      {/* Animated gradient overlay with #F6F5F4 based gradient */}
      <motion.div
        className="absolute"
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
        initial={{ y: "-100%" }}
        animate={{ y: "50%" }} // Move to 50% so gradient exits at bottom
        transition={{ 
          duration: 0.6,
          ease: "easeInOut" as const,
          delay: delay
        }}
      />
    </div>
  );
};

export default function DocumentTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });



  return (
    <div className="flex items-center justify-center" style={{ minHeight: '100vh' }}>
      <table className="border-separate border-spacing-0 rounded-[8px] border border-[#ECEBE9]">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-3 h-8 text-left font-medium text-gray-700 ${
                    header.id === "select" ? "w-[48px]" : "" 
                  } ${header.id === "forceMajeureClause" ? "w-[250px]" : ""} ${header.index !== 0 ? 'border-l border-[#ECEBE9]' : ''} border-b border-[#ECEBE9]`}
                  style={{ fontSize: '12px', lineHeight: '16px' }}
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
                const shouldAnimate = cell.column.id !== 'select' && cell.column.id !== 'fileName';
                const cellPadding = cell.column.id === 'fileName' ? 'px-1' : 'px-3';
                return (
                  <td
                    key={cell.id}
                    className={`${cellPadding} h-8 ${cell.column.id === 'forceMajeureClause' ? 'w-[250px]' : ''} ${cell.column.id !== table.getAllColumns()[0].id ? 'border-l border-[#ECEBE9]' : ''} ${row.index !== table.getRowModel().rows.length - 1 ? 'border-b border-[#ECEBE9]' : ''} relative overflow-hidden`}
                    style={{ fontSize: '12px', lineHeight: '16px' }}
                  >
                    <AnimatedCell 
                      rowIndex={rowIndex} 
                      columnIndex={cellIndex}
                      shouldAnimate={shouldAnimate}
                      cellPadding={cellPadding}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </AnimatedCell>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 