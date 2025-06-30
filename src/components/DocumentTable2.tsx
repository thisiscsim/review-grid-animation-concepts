"use client";

import React, { useState, useEffect } from "react";
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

export default function DocumentTable2() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedRows, setCompletedRows] = useState<Set<number>>(new Set());

  const thinkingSteps = [
    "Understanding document...",
    "Chunking and embedding...",
    "Generating output..."
  ];

  // Progress through steps for all rows
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    // First step shows immediately, then progress through remaining steps
    const mainInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < 2) {
          return prev + 1;
        } else {
          clearInterval(mainInterval);
          return prev;
        }
      });
    }, 1000);
    
    // After all steps complete, mark rows as done with varied timing
    const completionTimeouts: NodeJS.Timeout[] = [];
    data.forEach((_, index) => {
      const completionDelay = 3000 + (Math.random() * 1000); // 3-4 seconds total
      const timeout = setTimeout(() => {
        setCompletedRows(prev => new Set([...prev, index]));
      }, completionDelay);
      completionTimeouts.push(timeout);
    });
    
    return () => {
      clearInterval(mainInterval);
      intervals.forEach(clearInterval);
      completionTimeouts.forEach(clearTimeout);
    };
  }, []);

  // Simple display component
  const StepDisplay = () => {
    return (
      <motion.span
        key={currentStep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {thinkingSteps[currentStep]}
      </motion.span>
    );
  };

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
      <div className="flex items-center gap-1 px-2 py-1 rounded-[4px] bg-[#F3F3F1] min-w-0">
        <FileText className="h-3 w-3 text-gray-400 flex-shrink-0" />
        <span className="truncate">{getValue()}</span>
      </div>
    ),
  }),
    columnHelper.accessor("agreementParties", {
      header: "Agreement Parties",
      size: 280,
      cell: ({ getValue, row }) => {
        const isAnimating = !completedRows.has(row.index);
        
        if (isAnimating) {
          return (
            <div className="flex items-center w-full h-full overflow-hidden whitespace-nowrap min-h-[32px]">
              <StepDisplay />
            </div>
          );
        }
        return <div className="flex items-center w-full h-full min-h-[32px]"><span className="block truncate">{getValue()}</span></div>;
      },
    }),
    columnHelper.accessor("forceMajeureClause", {
      header: "Force Majeure Clause Reference",
      size: 250,
      cell: ({ getValue, row }) => {
        const isAnimating = !completedRows.has(row.index);
        
        if (isAnimating) {
          return (
            <div className="flex items-center w-full h-full overflow-hidden whitespace-nowrap min-h-[32px]">
              <StepDisplay />
            </div>
          );
        }
        const value = getValue();
        return (
          <div className="flex items-center w-full h-full min-h-[32px]">
            <span 
              className="inline-block px-2 py-1 rounded-[6px] bg-[#FAFAF9] border border-[#ECEBE9] text-black truncate max-w-full"
            >
              {value}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor("assignmentProvisionSummary", {
      header: "Assignment Provision Summary",
      size: 280,
      cell: ({ getValue, row }) => {
        const isAnimating = !completedRows.has(row.index);
        
        if (isAnimating) {
          return (
            <div className="flex items-center w-full h-full overflow-hidden whitespace-nowrap min-h-[32px]">
              <StepDisplay />
            </div>
          );
        }
        return <div className="flex items-center w-full h-full min-h-[32px]"><span className="block truncate">{getValue()}</span></div>;
      },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex items-center justify-center" style={{ minHeight: '100vh' }}>
      <div className="mb-4">
        <table className="border-separate border-spacing-0 rounded-[8px] border border-[#ECEBE9] table-fixed" style={{ width: '1100px' }}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-3 h-8 text-left font-medium text-gray-700 ${
                      header.id === "select" ? "w-[48px]" : "" 
                    } ${header.id === "forceMajeureClause" ? "w-[250px]" : ""} ${
                      header.id === "agreementParties" ? "w-[280px]" : ""
                    } ${
                      header.id === "assignmentProvisionSummary" ? "w-[280px]" : ""
                    } ${header.index !== 0 ? 'border-l border-[#ECEBE9]' : ''} border-b border-[#ECEBE9]`}
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
                      className={`${cellPadding} h-8 ${
                        cell.column.id === 'forceMajeureClause' ? 'w-[250px]' : ''
                      } ${
                        cell.column.id === 'agreementParties' ? 'w-[280px]' : ''
                      } ${
                        cell.column.id === 'assignmentProvisionSummary' ? 'w-[280px]' : ''
                      } ${cell.column.id !== table.getAllColumns()[0].id ? 'border-l border-[#ECEBE9]' : ''} ${row.index !== table.getRowModel().rows.length - 1 ? 'border-b border-[#ECEBE9]' : ''} relative overflow-hidden`}
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
      </div>
    </div>
  );
} 