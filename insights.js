// Utility functions to calculate insights from transaction data

export const calculateInsights = (transactions) => {
  if (!transactions || transactions.length === 0) {
    return {
      totalSpending: 0,
      highestCategory: { category: 'N/A', amount: 0 },
      monthlyComparison: { current: 0, previous: 0, percentageChange: 0 },
      averageTransaction: 0,
      categoryBreakdown: [],
      monthlyTrends: []
    };
  }

  // Total spending
  const totalSpending = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  // Highest spending category
  const categoryTotals = {};
  transactions.forEach(tx => {
    categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
  });
  
  const highestCategory = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])[0] || ['N/A', 0];

  // Monthly comparison
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const currentMonthTransactions = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
  });
  
  const lastMonthTransactions = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    return txDate.getMonth() === lastMonth && txDate.getFullYear() === lastMonthYear;
  });

  const currentMonthTotal = currentMonthTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const lastMonthTotal = lastMonthTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  
  const percentageChange = lastMonthTotal === 0 
    ? 0 
    : ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;

  // Average transaction
  const averageTransaction = totalSpending / transactions.length;

  // Category breakdown for charts
  const categoryBreakdown = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / totalSpending) * 100
    }))
    .sort((a, b) => b.amount - a.amount);

  // Monthly trends (last 3 months)
  const monthlyTrends = [];
  for (let i = 2; i >= 0; i--) {
    const targetDate = new Date(currentYear, currentMonth - i, 1);
    const monthName = targetDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    const monthTransactions = transactions.filter(tx => {
      const txDate = new Date(tx.date);
      return txDate.getMonth() === targetDate.getMonth() && 
             txDate.getFullYear() === targetDate.getFullYear();
    });
    
    const monthTotal = monthTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    
    // Category breakdown for this month
    const monthCategories = {};
    monthTransactions.forEach(tx => {
      monthCategories[tx.category] = (monthCategories[tx.category] || 0) + tx.amount;
    });
    
    monthlyTrends.push({
      month: monthName,
      total: monthTotal,
      ...monthCategories
    });
  }

  return {
    totalSpending,
    highestCategory: { category: highestCategory[0], amount: highestCategory[1] },
    monthlyComparison: {
      current: currentMonthTotal,
      previous: lastMonthTotal,
      percentageChange: parseFloat(percentageChange.toFixed(1))
    },
    averageTransaction,
    categoryBreakdown,
    monthlyTrends
  };
};
