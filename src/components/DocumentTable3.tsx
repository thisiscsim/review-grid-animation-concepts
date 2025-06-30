"use client";

import React, { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FileText } from "lucide-react";
import { TextShimmer } from "../../components/motion-primitives/text-shimmer";
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

// Independent animation overlay component
const AnimationOverlay = React.memo(({ 
  isVisible, 
  cellId, 
  rowIndex, 
  columnId 
}: { 
  isVisible: boolean; 
  cellId: string; 
  rowIndex: number; 
  columnId: string; 
}) => {
  if (!isVisible) return null;
  
  return (
    <div 
      className="absolute flex items-center justify-between"
      style={{
        top: `${34 + (rowIndex * 32)}px`,
        left: columnId === 'agreementParties' ? '306px' : 
              columnId === 'forceMajeureClause' ? '608px' : '858px',
        width: columnId === 'forceMajeureClause' ? '240px' : '278px',
        height: '28px',
        paddingLeft: '12px',
        fontSize: '12px',
        lineHeight: '16px',
        zIndex: 10
      }}
    >
      <div style={{ minWidth: '150px', whiteSpace: 'nowrap' }}>
        <TextShimmer key={`shimmer-${cellId}`} duration={1.5} spread={2}>
          Generating answer...
        </TextShimmer>
      </div>
      <div 
        className="relative flex items-center justify-center"
        style={{
          marginLeft: columnId === 'agreementParties' ? '118px' : 
                       columnId === 'assignmentProvisionSummary' ? '112px' : '0px'
        }}
      >
        <motion.div 
          key={`pulse-${cellId}`}
          className="w-3 h-3 bg-gray-400/60 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="absolute w-1.5 h-1.5 bg-black rounded-full"></div>
      </div>
    </div>
  );
});

AnimationOverlay.displayName = 'AnimationOverlay';

export default function DocumentTable3() {
  const [loadingStates, setLoadingStates] = useState<Record<number, {
    agreementParties: boolean;
    forceMajeureClause: boolean;
    assignmentProvisionSummary: boolean;
  }>>({});

  useEffect(() => {
    // Initialize loading states for all rows
    const initialStates: typeof loadingStates = {};
    data.forEach((row) => {
      initialStates[row.id] = {
        agreementParties: true,
        forceMajeureClause: true,
        assignmentProvisionSummary: true,
      };
    });
    setLoadingStates(initialStates);

    // Set up staggered timeouts for revealing data
    data.forEach((row, index) => {
      const baseDelay = 2000; // Base delay before any data starts showing
      const staggerDelay = index * 300; // Stagger each row by 300ms
      
      // Agreement Parties - reveals first
      setTimeout(() => {
        setLoadingStates(prev => ({
          ...prev,
          [row.id]: {
            ...prev[row.id],
            agreementParties: false,
          }
        }));
      }, baseDelay + staggerDelay);

      // Force Majeure Clause - reveals 800ms after Agreement Parties
      setTimeout(() => {
        setLoadingStates(prev => ({
          ...prev,
          [row.id]: {
            ...prev[row.id],
            forceMajeureClause: false,
          }
        }));
      }, baseDelay + staggerDelay + 800);

      // Assignment Provision - reveals 1200ms after Agreement Parties
      setTimeout(() => {
        setLoadingStates(prev => ({
          ...prev,
          [row.id]: {
            ...prev[row.id],
            assignmentProvisionSummary: false,
          }
        }));
      }, baseDelay + staggerDelay + 1200);
    });
  }, []);

  const columns = React.useMemo(() => [
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
          <FileText className="h-3 w-3 text-gray-400 flex-shrink-0" />
          <span className="truncate">{getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor("agreementParties", {
      header: "Agreement Parties",
      size: 280,
      cell: ({ getValue, row }) => {
        const isLoading = loadingStates[row.original.id]?.agreementParties;
        return (
          <span 
            className={`block truncate transition-opacity duration-200 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {getValue()}
          </span>
        );
      },
    }),
    columnHelper.accessor("forceMajeureClause", {
      header: "Force Majeure Clause Reference",
      size: 250,
      cell: ({ getValue, row }) => {
        const isLoading = loadingStates[row.original.id]?.forceMajeureClause;
        const value = getValue();
        return (
          <span 
            className={`inline-block px-2 py-1 rounded-[6px] bg-[#FAFAF9] border border-[#ECEBE9] text-black transition-opacity duration-200 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {value}
          </span>
        );
      },
    }),
    columnHelper.accessor("assignmentProvisionSummary", {
      header: "Assignment Provision Summary",
      size: 280,
      cell: ({ getValue, row }) => {
        const isLoading = loadingStates[row.original.id]?.assignmentProvisionSummary;
        return (
          <span 
            className={`block truncate transition-opacity duration-200 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {getValue()}
          </span>
        );
      },
    }),
  ], [loadingStates]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex items-center justify-center" style={{ minHeight: '100vh' }}>
      <div className="mb-4 relative">
        <table className="border-separate border-spacing-0 rounded-[8px] border border-[#ECEBE9]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-3 h-8 text-left font-medium text-gray-700 ${
                      header.id === "select" ? "w-[48px]" : "" 
                    } ${header.id === "forceMajeureClause" ? "w-[250px]" : ""} ${header.id === "agreementParties" ? "w-[280px]" : ""} ${header.id === "assignmentProvisionSummary" ? "w-[280px]" : ""} ${header.index !== 0 ? 'border-l border-[#ECEBE9]' : ''} border-b border-[#ECEBE9]`}
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const cellPadding = cell.column.id === 'fileName' ? 'px-1' : 'px-3';
                  return (
                    <td
                      key={cell.id}
                      className={`${cellPadding} h-8 ${cell.column.id === 'forceMajeureClause' ? 'w-[250px]' : ''} ${cell.column.id === 'agreementParties' ? 'w-[280px]' : ''} ${cell.column.id === 'assignmentProvisionSummary' ? 'w-[280px]' : ''} ${cell.column.id !== table.getAllColumns()[0].id ? 'border-l border-[#ECEBE9]' : ''} ${row.index !== table.getRowModel().rows.length - 1 ? 'border-b border-[#ECEBE9]' : ''} relative overflow-hidden`}
                      style={{ fontSize: '12px', lineHeight: '16px' }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Independent Animation Overlays */}
        {data.map((row, rowIndex) => (
          <React.Fragment key={`animations-${row.id}`}>
            <AnimationOverlay
              isVisible={loadingStates[row.id]?.agreementParties === true}
              cellId={`agreement-${row.id}`}
              rowIndex={rowIndex}
              columnId="agreementParties"
            />
            <AnimationOverlay
              isVisible={loadingStates[row.id]?.forceMajeureClause === true}
              cellId={`force-majeure-${row.id}`}
              rowIndex={rowIndex}
              columnId="forceMajeureClause"
            />
            <AnimationOverlay
              isVisible={loadingStates[row.id]?.assignmentProvisionSummary === true}
              cellId={`assignment-${row.id}`}
              rowIndex={rowIndex}
              columnId="assignmentProvisionSummary"
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
} 