"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FileText, Loader2 } from "lucide-react";
import { TextLoop } from "../../components/motion-primitives/text-loop";

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
  {
    id: 13,
    selected: false,
    fileName: "Legal_Memo_IP_Dispute.pdf",
    agreementParties: "Dynavax Technologies Corporation, Nitto Denk...",
    forceMajeureClause: "Not Disputed",
    assignmentProvisionSummary: "Company needs Arons consent to assign; Aron...",
  },
  {
    id: 14,
    selected: false,
    fileName: "Contract_Translation_French.pdf",
    agreementParties: "Synacor, Inc. and Verizon Corporate Services...",
    forceMajeureClause: "Disputed",
    assignmentProvisionSummary: "Assignment requires prior written consent.",
  },
  {
    id: 15,
    selected: false,
    fileName: "NDA_Tracked_Changes.pdf",
    agreementParties: "General Electric Company (GE) through GE Po...",
    forceMajeureClause: "Disputed",
    assignmentProvisionSummary: "Binding on successors and permitted assigns",
  },
  {
    id: 16,
    selected: false,
    fileName: "Case_Brief_Johnson_v_Smith.pdf",
    agreementParties: "No information",
    forceMajeureClause: "Somewhat Disputed",
    assignmentProvisionSummary: "No assignment without prior written approval.",
  },
  {
    id: 17,
    selected: false,
    fileName: "LLC_Operating_Agreement.pdf",
    agreementParties: "J. Aron & Company LLC (\"Aron\"), Lion Oil Com...",
    forceMajeureClause: "Somewhat Disputed",
    assignmentProvisionSummary: "No assignment without prior written approval.",
  },
  {
    id: 18,
    selected: false,
    fileName: "AT&T MobiTV Developer License Agr...",
    agreementParties: "J. Aron & Company LLC, Alon Refining Krotz S...",
    forceMajeureClause: "Disputed",
    assignmentProvisionSummary: "Binding on parties and successors, assignable...",
  },
  {
    id: 19,
    selected: false,
    fileName: "MSG License Agreement.pdf",
    agreementParties: "United Launch Alliance, L.L.C. (ULA), The Boei...",
    forceMajeureClause: "Disputed",
    assignmentProvisionSummary: "Shipper can assign rights and obligations with...",
  },
  {
    id: 20,
    selected: false,
    fileName: "Rivian_SClub-Supply-Agreement.pdf",
    agreementParties: "Agilent Technologies, Inc. and Ophthtotech Cor...",
    forceMajeureClause: "Somewhat Disputed",
    assignmentProvisionSummary: "Purchaser can assign to Affiliates; Manufacture...",
  },
  {
    id: 21,
    selected: false,
    fileName: "sec.gov_archives_edgar_data_7823...",
    agreementParties: "Gramercy Alumina LLC (Seller), Gramercy Alu...",
    forceMajeureClause: "Somewhat Disputed",
    assignmentProvisionSummary: "Assignment requires prior written consent.",
  },
  {
    id: 22,
    selected: false,
    fileName: "sec.gov_archives_edgar_data_12322...",
    agreementParties: "Textron Inc., Scott C. Donnelly on behalf of his I...",
    forceMajeureClause: "Not Disputed",
    assignmentProvisionSummary: "Assignment requires consent, except to Affiliat...",
  },
];

const columnHelper = createColumnHelper<Document>();

const columns = [
  columnHelper.display({
    id: "select",
    header: () => (
      <div className="flex justify-center">
        <input type="checkbox" className="custom-checkbox" />
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
    cell: ({ getValue }) => <span className="block truncate">{getValue()}</span>,
  }),
  columnHelper.accessor("forceMajeureClause", {
    header: "Force Majeure Clause Reference",
    size: 250,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <span className="inline-block px-2 py-1 rounded-[6px] bg-[#FAFAF9] border border-[#ECEBE9] text-black whitespace-nowrap">
          {value}
        </span>
      );
    },
  }),
  columnHelper.accessor("assignmentProvisionSummary", {
    header: "Assignment Provision Summary",
    size: 280,
    cell: ({ getValue }) => <span className="block truncate">{getValue()}</span>,
  }),
];



export default function DocumentTable4() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const rowHeight = 32; // Height of each table row in pixels
  const maxVisibleRows = 4; // Number of rows to show at once

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalRows = table.getRowModel().rows.length;

  // Handle row scrolling
  useEffect(() => {
    const scrollTimer = setInterval(() => {
      setScrollPosition((prevPosition) => {
        const maxScroll = (totalRows - maxVisibleRows) * rowHeight;
        return (prevPosition + rowHeight) % (maxScroll + rowHeight);
      });
    }, 1800); // Advance every 1.8 seconds

    return () => clearInterval(scrollTimer);
  }, [totalRows, rowHeight, maxVisibleRows]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6" style={{ minHeight: '100vh' }}>
      {/* Status line with spinner */}
      <div className="flex items-center space-x-2 text-gray-600 font-medium">
        <Loader2 className="h-4 w-4 animate-spin" />
        <TextLoop 
          className="text-gray-600 font-medium text-sm"
          interval={3} // Cycle through status every ~2.4 rows (4.32 seconds)
        >
          <span>Understanding review grid...</span>
          <span>Identifying key terms...</span>
          <span>Analyzing documents...</span>
        </TextLoop>
      </div>

      {/* Table container with limited height and scrolling */}
      <div className="relative">
        <div
          ref={tableContainerRef}
          className="overflow-hidden"
          style={{ 
            height: `${maxVisibleRows * rowHeight}px`, // No extra height needed without headers
            width: '860px', // Clip the table to show overflow effect
          }}
        >
          <div style={{ transform: `translateY(${-scrollPosition}px)`, transition: 'transform 0.6s ease-out' }}>
            <table className="border-separate border-spacing-0 rounded-[8px] border border-[#ECEBE9]">
              <tbody>
                {table.getRowModel().rows.map((row, rowIndex) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const cellPadding = cell.column.id === 'fileName' ? 'px-1' : 'px-3';
                      return (
                        <td
                          key={cell.id}
                          className={`${cellPadding} h-8 ${cell.column.id === 'select' ? 'w-[48px]' : ''} ${cell.column.id === 'forceMajeureClause' ? 'w-[250px]' : ''} ${cell.column.id === 'agreementParties' ? 'w-[280px]' : ''} ${cell.column.id === 'assignmentProvisionSummary' ? 'w-[280px]' : ''} ${cell.column.id !== table.getAllColumns()[0].id ? 'border-l border-[#ECEBE9]' : ''} ${rowIndex !== table.getRowModel().rows.length - 1 ? 'border-b border-[#ECEBE9]' : ''}`}
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

        {/* Top/bottom gradient overlay for clipping effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.3) 15%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0) 70%, rgba(255, 255, 255, 0.3) 85%, rgba(255, 255, 255, 0.95) 100%)",
            zIndex: 20,
          }}
        />

        {/* Right-side gradient overlay to suggest more columns */}
        <div
          className="absolute top-0 right-0 bottom-0 pointer-events-none"
          style={{
            width: '80px',
            background:
              "linear-gradient(to left, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 25%, rgba(255, 255, 255, 0.4) 60%, rgba(255, 255, 255, 0) 100%)",
            zIndex: 25,
          }}
        />
      </div>
    </div>
  );
} 