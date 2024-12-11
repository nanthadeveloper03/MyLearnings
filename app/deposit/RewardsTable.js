"use client";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { TextField, InputAdornment, Switch } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const columns = [
  {
    field: "number",
    headerName: "S.No",
    flex: 0.2,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "tradingPair",
    headerName: "Currency Name",
    flex: 1,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Link href="#">
        <span className={`icon-${params.row.icon}`}>
          {params.row.iconPaths &&
            params.row.iconPaths.map((path, index) => (
              <span key={index} className={path} />
            ))}
        </span>
        <span>{params.row.name}</span>
        <span className="unit">{params.row.unit}</span>
      </Link>
    ),
  },
  {
    field: "lastTraded",
    headerName: "Currency Value",
    flex: 0.6,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "availablebalance",
    headerName: "Available Balance",
    flex: 1,
    sortable: false,
    disableColumnMenu: true,
  },
];

const rows = [
  {
    id: 1,
    number: 1,
    tradingPair: "Bitcoin",
    icon: "btc",
    iconPaths: ["path1", "path2"],
    name: "Bitcoin",
    unit: "BTC",
    lastTraded: "25,000",
    availablebalance: "1.23B(USD)",
  },
  {
    id: 2,
    number: 2,
    tradingPair: "Ethereum",
    icon: "eth",
    iconPaths: ["path1", "path2, path3"],
    name: "Ethereum",
    unit: "ETH",
    lastTraded: "1,800",
    availablebalance: "2.45B(USD)",
  },
  {
    id: 3,
    number: 3,
    tradingPair: "Ripple",
    icon: "eth",
    iconPaths: ["path1", "path2, path3", "path4"],
    name: "Ripple",
    unit: "XRP",
    lastTraded: "0.50",
    availablebalance: "0.67B(USD)",
  },
  {
    id: 4,
    number: 4,
    tradingPair: "Litecoin",
    icon: "eth",
    iconPaths: ["path1", "path2, path3", "path4", "path5", "path6"],
    name: "Litecoin",
    unit: "XRP",
    lastTraded: "100",
    availablebalance: "0.89B(USD)",
  },
  {
    id: 5,
    number: 5,
    tradingPair: "Chainlink",
    icon: "eth",
    iconPaths: ["path1", "path2, path3", "path4", "path5", "path6"],
    name: "Chainlink",
    unit: "XRP",
    lastTraded: "10",
    availablebalance: "0.56B(USD)",
  },
];

export default function BalanceTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hideZeroBalance, setHideZeroBalance] = useState(false);

  const filteredRows = rows.filter((row) => {
    const matchesSearch = row.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesZeroBalance = hideZeroBalance
      ? parseFloat(row.availablebalance) > 0
      : true;
    return matchesSearch && matchesZeroBalance;
  });

  return (
    <div className="wallet_listtable">
      <div style={{ height: "100%", width: "100%" }}>
        <div className="row wallet_table_head">
          <h3>Wallet Balances</h3>
          <div className="input-group search-area">
            <input
              type="text"
              className="form-control"
              placeholder="Currency Name, Symbol"
            />
            <span className="input-group-text">
              <a href="javascript:void(0)">
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6 18.3994L10.3 12.0994C9.8 12.4994 9.225 12.8161 8.575 13.0494C7.925 13.2827 7.23333 13.3994 6.5 13.3994C4.68333 13.3994 3.14583 12.7702 1.8875 11.5119C0.629167 10.2536 0 8.71608 0 6.89941C0 5.08275 0.629167 3.54525 1.8875 2.28691C3.14583 1.02858 4.68333 0.399414 6.5 0.399414C8.31667 0.399414 9.85417 1.02858 11.1125 2.28691C12.3708 3.54525 13 5.08275 13 6.89941C13 7.63275 12.8833 8.32441 12.65 8.97441C12.4167 9.62441 12.1 10.1994 11.7 10.6994L18 16.9994L16.6 18.3994ZM6.5 11.3994C7.75 11.3994 8.8125 10.9619 9.6875 10.0869C10.5625 9.21191 11 8.14941 11 6.89941C11 5.64941 10.5625 4.58691 9.6875 3.71191C8.8125 2.83691 7.75 2.39941 6.5 2.39941C5.25 2.39941 4.1875 2.83691 3.3125 3.71191C2.4375 4.58691 2 5.64941 2 6.89941C2 8.14941 2.4375 9.21191 3.3125 10.0869C4.1875 10.9619 5.25 11.3994 6.5 11.3994Z"
                    fill="var(--onsurface)"
                  />
                </svg>
              </a>
            </span>
          </div>
        </div>

        <div className="switchfield">
          {/* Switch Field */}
          <Switch />
          <span className="swtich_label">Hide Zero Balance</span>
        </div>

        {/* Your DataGrid component here */}
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
        />
      </div>
    </div>
  );
}
