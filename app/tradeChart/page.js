'use client'

import DashboardLayout from "@/components/dashboard/DashboardLayout";

import dynamic from 'next/dynamic';

const TVChartContainer = dynamic(
  () => import('./TVChartContainer/index'),
  { ssr: false, loading: () => <p>Loading Chart...</p> }
);

export default function tradeChart() {
  const pairInfo = { pair: 'BTC_USDT', streamPair: 'BTCUSDT', toCurrency: 'USDT', fromCurrency: 'BTC' }
  return (
    <TVChartContainer pairInfo={pairInfo} />
  );
}