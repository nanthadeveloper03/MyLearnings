'use client'
import Link from "next/link";
import React, { useState } from 'react';
import Assets from "@/components/sections/convert/Assets";
import BuySell from "@/components/sections/convert/BuySell";
import Pair from "@/components/sections/convert/Pair";

const SidePanel = () => {
  return (
    <>
    <Pair />
    <BuySell />
    <Assets />    
    </>
  );
};

export default SidePanel;