import React, { useEffect } from 'react';
import { DollarSign, TrendingUp, Activity, CreditCard } from 'lucide-react';
import useStore, { useFilteredTransactions } from './store/useStore';
import Header from './components/Header';
import InsightCard from './components/InsightCard';
import TransactionTable from './components/TransactionTable';
import Charts from './components/Charts';
import { calculateInsights } from './utils/insights';
import './App.css';

function App() {
  const theme = useStore((state) => state.theme);
  const transactions = useFilteredTransactions();
  const insights = calculateInsights(transactions);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0B] transition-colors duration-300">
      <Header />
      
      <main className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8">
        {/* Insights Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="insights-section">
          <InsightCard
            title="Total Spending"
            value={`$${insights.totalSpending.toFixed(2)}`}
            subtitle="Across all transactions"
            icon={DollarSign}
            index={0}
          />
          <InsightCard
            title="Highest Category"
            value={insights.highestCategory.category}
            subtitle={`$${insights.highestCategory.amount.toFixed(2)} spent`}
            icon={TrendingUp}
            index={1}
          />
          <InsightCard
            title="Monthly Change"
            value={`$${insights.monthlyComparison.current.toFixed(2)}`}
            subtitle={`vs $${insights.monthlyComparison.previous.toFixed(2)} last month`}
            icon={Activity}
            trend={insights.monthlyComparison.percentageChange}
            index={2}
          />
        </section>

        {/* Charts Section */}
        <section data-testid="charts-section">
          <Charts />
        </section>

        {/* Transactions Table */}
        <section data-testid="transactions-section">
          <h2 className="text-2xl font-medium tracking-tight mb-6">Transactions</h2>
          <TransactionTable />
        </section>
      </main>
    </div>
  );
}

export default App;
