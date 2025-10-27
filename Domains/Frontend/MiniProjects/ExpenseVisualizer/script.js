// Expense Visualizer - Main Application Logic

class ExpenseVisualizer {
    constructor() {
        this.expenses = [];
        this.categories = {
            'food': { name: 'Food & Dining', color: '#ef4444', icon: '🍕' },
            'transport': { name: 'Transportation', color: '#f59e0b', icon: '🚗' },
            'shopping': { name: 'Shopping', color: '#8b5cf6', icon: '🛍️' },
            'entertainment': { name: 'Entertainment', color: '#ec4899', icon: '🎬' },
            'bills': { name: 'Bills & Utilities', color: '#06b6d4', icon: '📄' },
            'health': { name: 'Health & Medical', color: '#10b981', icon: '🏥' },
            'education': { name: 'Education', color: '#3b82f6', icon: '📚' },
            'other': { name: 'Other', color: '#6b7280', icon: '📦' }
        };
        
        this.currentFilter = 'month';
        this.selectedCategory = 'all';
        this.charts = {};
        
        this.initializeApp();
    }
    
    initializeApp() {
        this.loadExpenses();
        this.setupEventListeners();
        this.initializeCharts();
        this.updateUI();
        this.setDefaultDate();
    }
    
    setupEventListeners() {
        // Expense form
        document.getElementById('expenseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addExpense();
        });
        
        // Filters
        document.getElementById('timeFilter').addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.handleTimeFilterChange();
            this.updateUI();
        });
        
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.selectedCategory = e.target.value;
            this.updateUI();
        });
        
        // Custom date range
        document.getElementById('applyRange').addEventListener('click', () => {
            this.updateUI();
        });
        
        // Buttons
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });
        
        document.getElementById('clearDataBtn').addEventListener('click', () => {
            this.showConfirmModal();
        });
        
        document.getElementById('confirmClear').addEventListener('click', () => {
            this.clearAllData();
            this.hideConfirmModal();
        });
        
        document.getElementById('cancelClear').addEventListener('click', () => {
            this.hideConfirmModal();
        });
        
        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.add('hidden');
            }
        });
    }
    
    setDefaultDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('expenseDate').value = today;
    }
    
    addExpense() {
        const description = document.getElementById('expenseDescription').value.trim();
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const category = document.getElementById('expenseCategory').value;
        const date = document.getElementById('expenseDate').value;
        const notes = document.getElementById('expenseNotes').value.trim();
        
        if (!description || !amount || !category || !date) {
            alert('Please fill in all required fields');
            return;
        }
        
        const expense = {
            id: Date.now(),
            description,
            amount,
            category,
            date,
            notes,
            createdAt: new Date().toISOString()
        };
        
        this.expenses.push(expense);
        this.saveExpenses();
        this.updateUI();
        this.resetForm();
        
        // Show success feedback
        this.showNotification('Expense added successfully!', 'success');
    }
    
    resetForm() {
        document.getElementById('expenseForm').reset();
        this.setDefaultDate();
    }
    
    deleteExpense(id) {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
        this.saveExpenses();
        this.updateUI();
        this.showNotification('Expense deleted successfully!', 'success');
    }
    
    getFilteredExpenses() {
        let filtered = [...this.expenses];
        
        // Apply time filter
        filtered = this.applyTimeFilter(filtered);
        
        // Apply category filter
        if (this.selectedCategory !== 'all') {
            filtered = filtered.filter(expense => expense.category === this.selectedCategory);
        }
        
        return filtered;
    }
    
    applyTimeFilter(expenses) {
        const now = new Date();
        
        switch (this.currentFilter) {
            case 'today':
                const today = now.toISOString().split('T')[0];
                return expenses.filter(expense => expense.date === today);
                
            case 'week':
                const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
                return expenses.filter(expense => new Date(expense.date) >= weekStart);
                
            case 'month':
                const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                return expenses.filter(expense => new Date(expense.date) >= monthStart);
                
            case 'year':
                const yearStart = new Date(now.getFullYear(), 0, 1);
                return expenses.filter(expense => new Date(expense.date) >= yearStart);
                
            case 'custom':
                const startDate = document.getElementById('startDate').value;
                const endDate = document.getElementById('endDate').value;
                if (startDate && endDate) {
                    return expenses.filter(expense => 
                        expense.date >= startDate && expense.date <= endDate
                    );
                }
                return expenses;
                
            default: // 'all'
                return expenses;
        }
    }
    
    handleTimeFilterChange() {
        const customRange = document.getElementById('customRange');
        if (this.currentFilter === 'custom') {
            customRange.classList.remove('hidden');
        } else {
            customRange.classList.add('hidden');
        }
    }
    
    calculateStats(expenses) {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        
        // Monthly spending (current month)
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthlyExpenses = expenses.filter(expense => 
            new Date(expense.date) >= monthStart
        );
        const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        
        // Category count
        const uniqueCategories = new Set(expenses.map(expense => expense.category)).size;
        
        return {
            total: total,
            monthly: monthlyTotal,
            categories: uniqueCategories
        };
    }
    
    updateUI() {
        const filteredExpenses = this.getFilteredExpenses();
        const stats = this.calculateStats(filteredExpenses);
        
        // Update statistics
        document.getElementById('totalSpent').textContent = `$${stats.total.toFixed(2)}`;
        document.getElementById('monthlySpent').textContent = `$${stats.monthly.toFixed(2)}`;
        document.getElementById('categoryCount').textContent = stats.categories;
        
        // Update charts
        this.updateCharts(filteredExpenses);
        
        // Update expenses list
        this.renderExpensesList(filteredExpenses);
        
        // Update category filter options
        this.updateCategoryFilter();
    }
    
    updateCategoryFilter() {
        const categoryFilter = document.getElementById('categoryFilter');
        const uniqueCategories = [...new Set(this.expenses.map(expense => expense.category))];
        
        // Keep "All Categories" option and remove others
        while (categoryFilter.children.length > 1) {
            categoryFilter.removeChild(categoryFilter.lastChild);
        }
        
        // Add current categories
        uniqueCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = this.categories[category].name;
            categoryFilter.appendChild(option);
        });
    }
    
    renderExpensesList(expenses) {
        const expensesList = document.getElementById('expensesList');
        
        if (expenses.length === 0) {
            expensesList.innerHTML = `
                <div class="empty-state">
                    <p>No expenses found for the selected filters.</p>
                    <p>Add your first expense to get started!</p>
                </div>
            `;
            return;
        }
        
        // Sort by date (newest first)
        const sortedExpenses = expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        expensesList.innerHTML = sortedExpenses.map(expense => `
            <div class="expense-item category-${expense.category}">
                <div class="expense-description">
                    <strong>${expense.description}</strong>
                    ${expense.notes ? `<br><small>${expense.notes}</small>` : ''}
                </div>
                <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
                <div class="expense-category">
                    ${this.categories[expense.category].icon} ${this.categories[expense.category].name}
                </div>
                <div class="expense-date">${this.formatDate(expense.date)}</div>
                <div class="expense-actions">
                    <button onclick="expenseApp.deleteExpense(${expense.id})" title="Delete expense">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    
    exportData() {
        const data = {
            expenses: this.expenses,
            exportDate: new Date().toISOString(),
            totalExpenses: this.expenses.length,
            totalAmount: this.expenses.reduce((sum, expense) => sum + expense.amount, 0)
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `expenses-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showNotification('Data exported successfully!', 'success');
    }
    
    clearAllData() {
        this.expenses = [];
        this.saveExpenses();
        this.updateUI();
        this.showNotification('All data cleared successfully!', 'success');
    }
    
    showConfirmModal() {
        document.getElementById('confirmModal').classList.remove('hidden');
    }
    
    hideConfirmModal() {
        document.getElementById('confirmModal').classList.add('hidden');
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 1001;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
        `;
        
        notification.querySelector('button').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }
    
    // LocalStorage methods
    saveExpenses() {
        localStorage.setItem('expenseVisualizer', JSON.stringify(this.expenses));
    }
    
    loadExpenses() {
        const saved = localStorage.getItem('expenseVisualizer');
        if (saved) {
            this.expenses = JSON.parse(saved);
        }
    }
}

// Initialize the application when the page loads
let expenseApp;
document.addEventListener('DOMContentLoaded', () => {
    expenseApp = new ExpenseVisualizer();
});