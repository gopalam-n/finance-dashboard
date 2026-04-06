// Generate realistic transaction data
// Categories: Food, Travel, Rent, Shopping, Bills
// Multiple users for RBAC demo
// Dates across multiple months

const categories = ['Food', 'Travel', 'Rent', 'Shopping', 'Bills'];
const users = [
  { id: 'user-001', name: 'Sarah Chen' },
  { id: 'user-002', name: 'Michael Park' },
  { id: 'user-003', name: 'Emma Davis' }
];

const foodDescriptions = ['Grocery Shopping', 'Coffee Shop', 'Restaurant Dinner', 'Fast Food', 'Bakery', 'Food Delivery'];
const travelDescriptions = ['Uber Ride', 'Gas Station', 'Flight Tickets', 'Hotel Booking', 'Train Ticket', 'Parking Fee'];
const rentDescriptions = ['Monthly Rent', 'Apartment Deposit', 'Utilities', 'HOA Fee'];
const shoppingDescriptions = ['Online Shopping', 'Clothing Store', 'Electronics', 'Bookstore', 'Furniture', 'Home Decor'];
const billsDescriptions = ['Internet Bill', 'Phone Bill', 'Electricity', 'Water Bill', 'Insurance Premium', 'Gym Membership'];

const descriptionsByCategory = {
  'Food': foodDescriptions,
  'Travel': travelDescriptions,
  'Rent': rentDescriptions,
  'Shopping': shoppingDescriptions,
  'Bills': billsDescriptions
};

const amountRanges = {
  'Food': [15, 120],
  'Travel': [8, 450],
  'Rent': [800, 2500],
  'Shopping': [25, 350],
  'Bills': [45, 280]
};

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomAmount = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate dates across last 3 months
const generateDate = (monthsAgo, dayOfMonth) => {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);
  date.setDate(dayOfMonth);
  return date.toISOString().split('T')[0];
};

export const mockTransactions = [
  // Current Month (January 2026)
  { id: 'tx-001', userId: 'user-001', date: generateDate(0, 25), category: 'Food', description: 'Grocery Shopping', amount: 89.50, type: 'expense' },
  { id: 'tx-002', userId: 'user-002', date: generateDate(0, 24), category: 'Travel', description: 'Uber Ride', amount: 25.00, type: 'expense' },
  { id: 'tx-003', userId: 'user-001', date: generateDate(0, 23), category: 'Shopping', description: 'Online Shopping', amount: 145.99, type: 'expense' },
  { id: 'tx-004', userId: 'user-003', date: generateDate(0, 22), category: 'Bills', description: 'Internet Bill', amount: 79.99, type: 'expense' },
  { id: 'tx-005', userId: 'user-001', date: generateDate(0, 21), category: 'Food', description: 'Coffee Shop', amount: 12.50, type: 'expense' },
  { id: 'tx-006', userId: 'user-002', date: generateDate(0, 20), category: 'Rent', description: 'Monthly Rent', amount: 1800.00, type: 'expense' },
  { id: 'tx-007', userId: 'user-001', date: generateDate(0, 19), category: 'Travel', description: 'Gas Station', amount: 55.00, type: 'expense' },
  { id: 'tx-008', userId: 'user-003', date: generateDate(0, 18), category: 'Food', description: 'Restaurant Dinner', amount: 85.75, type: 'expense' },
  { id: 'tx-009', userId: 'user-001', date: generateDate(0, 17), category: 'Bills', description: 'Phone Bill', amount: 65.00, type: 'expense' },
  { id: 'tx-010', userId: 'user-002', date: generateDate(0, 16), category: 'Shopping', description: 'Clothing Store', amount: 210.00, type: 'expense' },
  { id: 'tx-011', userId: 'user-001', date: generateDate(0, 15), category: 'Food', description: 'Food Delivery', amount: 32.40, type: 'expense' },
  { id: 'tx-012', userId: 'user-003', date: generateDate(0, 14), category: 'Travel', description: 'Parking Fee', amount: 18.00, type: 'expense' },
  { id: 'tx-013', userId: 'user-001', date: generateDate(0, 13), category: 'Shopping', description: 'Electronics', amount: 299.99, type: 'expense' },
  { id: 'tx-014', userId: 'user-002', date: generateDate(0, 12), category: 'Bills', description: 'Electricity', amount: 120.50, type: 'expense' },
  { id: 'tx-015', userId: 'user-001', date: generateDate(0, 11), category: 'Food', description: 'Grocery Shopping', amount: 95.30, type: 'expense' },
  { id: 'tx-016', userId: 'user-003', date: generateDate(0, 10), category: 'Travel', description: 'Uber Ride', amount: 18.50, type: 'expense' },
  { id: 'tx-017', userId: 'user-001', date: generateDate(0, 9), category: 'Shopping', description: 'Bookstore', amount: 45.00, type: 'expense' },
  { id: 'tx-018', userId: 'user-002', date: generateDate(0, 8), category: 'Food', description: 'Bakery', amount: 28.75, type: 'expense' },
  { id: 'tx-019', userId: 'user-001', date: generateDate(0, 7), category: 'Bills', description: 'Gym Membership', amount: 55.00, type: 'expense' },
  { id: 'tx-020', userId: 'user-003', date: generateDate(0, 6), category: 'Food', description: 'Coffee Shop', amount: 15.25, type: 'expense' },
  
  // Last Month (December 2025)
  { id: 'tx-021', userId: 'user-001', date: generateDate(1, 28), category: 'Shopping', description: 'Home Decor', amount: 189.99, type: 'expense' },
  { id: 'tx-022', userId: 'user-002', date: generateDate(1, 27), category: 'Food', description: 'Restaurant Dinner', amount: 110.00, type: 'expense' },
  { id: 'tx-023', userId: 'user-001', date: generateDate(1, 26), category: 'Travel', description: 'Gas Station', amount: 48.00, type: 'expense' },
  { id: 'tx-024', userId: 'user-003', date: generateDate(1, 25), category: 'Bills', description: 'Water Bill', amount: 45.20, type: 'expense' },
  { id: 'tx-025', userId: 'user-001', date: generateDate(1, 24), category: 'Food', description: 'Grocery Shopping', amount: 102.50, type: 'expense' },
  { id: 'tx-026', userId: 'user-002', date: generateDate(1, 23), category: 'Rent', description: 'Monthly Rent', amount: 1800.00, type: 'expense' },
  { id: 'tx-027', userId: 'user-001', date: generateDate(1, 22), category: 'Shopping', description: 'Online Shopping', amount: 78.99, type: 'expense' },
  { id: 'tx-028', userId: 'user-003', date: generateDate(1, 21), category: 'Food', description: 'Fast Food', amount: 22.50, type: 'expense' },
  { id: 'tx-029', userId: 'user-001', date: generateDate(1, 20), category: 'Bills', description: 'Insurance Premium', amount: 175.00, type: 'expense' },
  { id: 'tx-030', userId: 'user-002', date: generateDate(1, 19), category: 'Travel', description: 'Uber Ride', amount: 32.00, type: 'expense' },
  { id: 'tx-031', userId: 'user-001', date: generateDate(1, 18), category: 'Food', description: 'Coffee Shop', amount: 11.75, type: 'expense' },
  { id: 'tx-032', userId: 'user-003', date: generateDate(1, 17), category: 'Shopping', description: 'Clothing Store', amount: 165.00, type: 'expense' },
  { id: 'tx-033', userId: 'user-001', date: generateDate(1, 16), category: 'Food', description: 'Food Delivery', amount: 38.90, type: 'expense' },
  { id: 'tx-034', userId: 'user-002', date: generateDate(1, 15), category: 'Bills', description: 'Phone Bill', amount: 65.00, type: 'expense' },
  { id: 'tx-035', userId: 'user-001', date: generateDate(1, 14), category: 'Travel', description: 'Parking Fee', amount: 15.00, type: 'expense' },
  { id: 'tx-036', userId: 'user-003', date: generateDate(1, 13), category: 'Food', description: 'Grocery Shopping', amount: 87.25, type: 'expense' },
  { id: 'tx-037', userId: 'user-001', date: generateDate(1, 12), category: 'Shopping', description: 'Electronics', amount: 249.99, type: 'expense' },
  { id: 'tx-038', userId: 'user-002', date: generateDate(1, 11), category: 'Bills', description: 'Electricity', amount: 135.75, type: 'expense' },
  { id: 'tx-039', userId: 'user-001', date: generateDate(1, 10), category: 'Food', description: 'Restaurant Dinner', amount: 92.50, type: 'expense' },
  { id: 'tx-040', userId: 'user-003', date: generateDate(1, 9), category: 'Travel', description: 'Gas Station', amount: 52.00, type: 'expense' },

  // Two Months Ago (November 2025)
  { id: 'tx-041', userId: 'user-001', date: generateDate(2, 28), category: 'Food', description: 'Grocery Shopping', amount: 98.60, type: 'expense' },
  { id: 'tx-042', userId: 'user-002', date: generateDate(2, 27), category: 'Shopping', description: 'Furniture', amount: 425.00, type: 'expense' },
  { id: 'tx-043', userId: 'user-001', date: generateDate(2, 26), category: 'Bills', description: 'Internet Bill', amount: 79.99, type: 'expense' },
  { id: 'tx-044', userId: 'user-003', date: generateDate(2, 25), category: 'Food', description: 'Coffee Shop', amount: 14.50, type: 'expense' },
  { id: 'tx-045', userId: 'user-001', date: generateDate(2, 24), category: 'Travel', description: 'Flight Tickets', amount: 385.00, type: 'expense' },
  { id: 'tx-046', userId: 'user-002', date: generateDate(2, 23), category: 'Rent', description: 'Monthly Rent', amount: 1800.00, type: 'expense' },
  { id: 'tx-047', userId: 'user-001', date: generateDate(2, 22), category: 'Food', description: 'Restaurant Dinner', amount: 78.25, type: 'expense' },
  { id: 'tx-048', userId: 'user-003', date: generateDate(2, 21), category: 'Shopping', description: 'Online Shopping', amount: 134.99, type: 'expense' },
  { id: 'tx-049', userId: 'user-001', date: generateDate(2, 20), category: 'Bills', description: 'Phone Bill', amount: 65.00, type: 'expense' },
  { id: 'tx-050', userId: 'user-002', date: generateDate(2, 19), category: 'Food', description: 'Food Delivery', amount: 29.75, type: 'expense' },
  { id: 'tx-051', userId: 'user-001', date: generateDate(2, 18), category: 'Travel', description: 'Uber Ride', amount: 21.50, type: 'expense' },
  { id: 'tx-052', userId: 'user-003', date: generateDate(2, 17), category: 'Food', description: 'Bakery', amount: 18.90, type: 'expense' },
  { id: 'tx-053', userId: 'user-001', date: generateDate(2, 16), category: 'Shopping', description: 'Clothing Store', amount: 189.00, type: 'expense' },
  { id: 'tx-054', userId: 'user-002', date: generateDate(2, 15), category: 'Bills', description: 'Electricity', amount: 128.40, type: 'expense' },
  { id: 'tx-055', userId: 'user-001', date: generateDate(2, 14), category: 'Food', description: 'Grocery Shopping', amount: 91.30, type: 'expense' },
  { id: 'tx-056', userId: 'user-003', date: generateDate(2, 13), category: 'Travel', description: 'Gas Station', amount: 46.00, type: 'expense' },
  { id: 'tx-057', userId: 'user-001', date: generateDate(2, 12), category: 'Food', description: 'Coffee Shop', amount: 13.25, type: 'expense' },
  { id: 'tx-058', userId: 'user-002', date: generateDate(2, 11), category: 'Shopping', description: 'Bookstore', amount: 62.50, type: 'expense' },
  { id: 'tx-059', userId: 'user-001', date: generateDate(2, 10), category: 'Bills', description: 'Gym Membership', amount: 55.00, type: 'expense' },
  { id: 'tx-060', userId: 'user-003', date: generateDate(2, 9), category: 'Food', description: 'Restaurant Dinner', amount: 105.00, type: 'expense' }
];

export const userProfiles = {
  'admin': {
    name: 'Admin User',
    email: 'admin@company.com',
    avatar: 'https://images.unsplash.com/photo-1758600587839-56ba05596c69?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBwZXJzb24lMjBwb3J0cmFpdCUyMG5ldXRyYWwlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc3NTM3NjE0OXww&ixlib=rb-4.1.0&q=85'
  },
  'user': {
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    avatar: 'https://images.unsplash.com/photo-1770058443069-e384cd001e9b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwZXJzb24lMjBwb3J0cmFpdCUyMG5ldXRyYWwlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc3NTM3NjE0OXww&ixlib=rb-4.1.0&q=85'
  }
};
