// Export utilities for CSV and JSON

export const exportToCSV = (data, filename = 'transactions.csv') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  // CSV Headers
  const headers = ['Date', 'Category', 'Description', 'Amount', 'User'];
  
  // Convert data to CSV rows
  const csvRows = [
    headers.join(','),
    ...data.map(tx => [
      tx.date,
      tx.category,
      `"${tx.description}"`, // Quote to handle commas
      tx.amount.toFixed(2),
      tx.userId
    ].join(','))
  ];

  const csvContent = csvRows.join('\n');
  
  // Create blob and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (data, filename = 'transactions.json') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  const jsonContent = JSON.stringify(data, null, 2);
  
  // Create blob and trigger download
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
