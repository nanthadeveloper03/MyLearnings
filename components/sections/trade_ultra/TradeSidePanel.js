import Link from "next/link";
import React, { useState } from 'react';
import TradeAssets from "@/components/sections/trade_ultra/TradeAssets";
import BuySell from "@/components/sections/trade_ultra/BuySell";
import TradingPair from "@/components/sections/trade_ultra/TradingPair";

const TradeSidePanel = () => {
  return (
    <>
    <TradingPair />
    <BuySell />
    <TradeAssets />    
    </>
  );
};

export default TradeSidePanel;
