import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { calculateInsights } from '../utils/insights';
import useStore, { useFilteredTransactions } from '../store/useStore';

const Charts = () => {
  const transactions = useFilteredTransactions();
  const theme = useStore((state) => state.theme);
  const insights = calculateInsights(transactions);

  const isDark = theme === 'dark';

  // Colors for charts
  const COLORS = {
    Food: isDark ? '#60A5FA' : '#3B82F6',
    Travel: isDark ? '#C084FC' : '#9333EA',
    Rent: isDark ? '#FB923C' : '#F97316',
    Shopping: isDark ? '#F472B6' : '#EC4899',
    Bills: isDark ? '#4ADE80' : '#22C55E'
  };

  const chartColors = {
    grid: isDark ? '#27272A' : '#E4E4E7',
    text: isDark ? '#A1A1AA' : '#71717A',
    tooltip: {
      bg: isDark ? '#121214' : '#FFFFFF',
      border: isDark ? '#27272A' : '#E4E4E7'
    }
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div 
        className="rounded-lg border bg-white dark:bg-[#121214] border-zinc-200 dark:border-zinc-800 p-3 shadow-lg"
        style={{ backgroundColor: chartColors.tooltip.bg, borderColor: chartColors.tooltip.border }}
      >
        <p className="text-sm font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-mono font-medium">${entry.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Monthly Trends - Takes 2 columns */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="lg:col-span-2 rounded-xl border bg-white dark:bg-[#121214] border-zinc-200 dark:border-zinc-800 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] p-6"
        data-testid="monthly-trends-chart"
      >
        <h3 className="text-lg font-medium tracking-tight mb-4">Monthly Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={insights.monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} strokeOpacity={0.2} />
            <XAxis 
              dataKey="month" 
              stroke={chartColors.text}
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke={chartColors.text}
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
            <Bar dataKey="Food" fill={COLORS.Food} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Travel" fill={COLORS.Travel} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Rent" fill={COLORS.Rent} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Shopping" fill={COLORS.Shopping} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Bills" fill={COLORS.Bills} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Category Breakdown - Takes 1 column */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl border bg-white dark:bg-[#121214] border-zinc-200 dark:border-zinc-800 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] p-6"
        data-testid="category-breakdown-chart"
      >
        <h3 className="text-lg font-medium tracking-tight mb-4">Category Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={insights.categoryBreakdown}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ category, percentage }) => `${category} ${percentage.toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="amount"
            >
              {insights.categoryBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.category]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {insights.categoryBreakdown.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-sm" 
                  style={{ backgroundColor: COLORS[item.category] }}
                />
                <span>{item.category}</span>
              </div>
              <span className="font-mono font-medium">${item.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Charts;
