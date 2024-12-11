'use client'
import Link from "next/link";
import React, { useState } from 'react';
import TradeAssets from "@/components/sections/trade/TradeAssets";
import BuySell from "@/components/sections/trade/BuySell";
import TradingPair from "@/components/sections/trade/TradingPair";

const TradeSidePanel = ({pairInfo,pairBalance}) => {
  return (
    <>
    <TradingPair />
    <BuySell pairInfo = {pairInfo} pairBalancefrom={pairBalance}/>
    <TradeAssets pairInfo = {pairInfo} pairBalancefrom={pairBalance} />    
    </>
  );
};

export default TradeSidePanel;