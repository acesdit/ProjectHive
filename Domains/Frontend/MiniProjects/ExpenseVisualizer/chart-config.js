// Chart.js Configuration and Setup

class ChartManager {
    constructor(expenseApp) {
        this.expenseApp = expenseApp;
        this.charts = {};
        this.initializeCharts();
    }
    
    initializeCharts() {
        this.createCategoryChart();
        this.createTrendChart();
        this.createDailyChart();
        this.createDonutChart();
    }
    
    createCategoryChart() {
        const ctx = document.getElementById('categoryChart').getContext('2d');
        this.charts.category = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Spending by Category',
                    data: [],
                    backgroundColor: [],
                    borderColor: [],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `$${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => `$${value}`
                        }
                    }
                }
            }
        });
    }
    
    createTrendChart() {
        const ctx = document.getElementById('trendChart').getContext('2d');
        this.charts.trend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Monthly Spending Trend',
                    data: [],
                    borderColor: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `$${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => `$${value}`
                        }
                    }
                }
            }
        });
    }
    
    createDailyChart() {
        const ctx = document.getElementById('dailyChart').getContext('2d');
        this.charts.daily = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Daily Spending',
                    data: [],
                    backgroundColor: 'rgba(99, 102, 241, 0.6)',
                    borderColor: 'rgba(99, 102, 241, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `$${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => `$${value}`
                        }
                    }
                }
            }
        });
    }
    
    createDonutChart() {
        const ctx = document.getElementById('donutChart').getContext('2d');
        this.charts.donut = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    borderColor: 'white',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `$${value.toFixed(2)} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    updateCharts(expenses) {
        this.updateCategoryChart(expenses);
        this.updateTrendChart(expenses);
        this.updateDailyChart(expenses);
        this.updateDonutChart(expenses);
    }
    
    updateCategoryChart(expenses) {
        const categoryData = this.getCategoryData(expenses);
        
        this.charts.category.data.labels = categoryData.labels;
        this.charts.category.data.datasets[0].data = categoryData.amounts;
        this.charts.category.data.datasets[0].backgroundColor = categoryData.colors;
        this.charts.category.data.datasets[0].borderColor = categoryData.colors;
        
        this.charts.category.update();
    }
    
    updateTrendChart(expenses) {
        const trendData = this.getTrendData(expenses);
        
        this.charts.trend.data.labels = trendData.labels;
        this.charts.trend.data.datasets[0].data = trendData.amounts;
        
        this.charts.trend.update();
    }
    
    updateDailyChart(expenses) {
        const dailyData = this.getDailyData(expenses);
        
        this.charts.daily.data.labels = dailyData.labels;
        this.charts.daily.data.datasets[0].data = dailyData.amounts;
        
        this.charts.daily.update();
    }
    
    updateDonutChart(expenses) {
        const categoryData = this.getCategoryData(expenses);
        
        this.charts.donut.data.labels = categoryData.labels;
        this.charts.donut.data.datasets[0].data = categoryData.amounts;
        this.charts.donut.data.datasets[0].backgroundColor = categoryData.colors;
        
        this.charts.donut.update();
    }
    
    getCategoryData(expenses) {
        const categoryTotals = {};
        
        // Initialize all categories with 0
        Object.keys(this.expenseApp.categories).forEach(category => {
            categoryTotals[category] = 0;
        });
        
        // Sum amounts by category
        expenses.forEach(expense => {
            categoryTotals[expense.category] += expense.amount;
        });
        
        // Filter out categories with 0 spending and prepare data
        const labels = [];
        const amounts = [];
        const colors = [];
        
        Object.keys(categoryTotals).forEach(category => {
            if (categoryTotals[category] > 0) {
                labels.push(this.expenseApp.categories[category].name);
                amounts.push(categoryTotals[category]);
                colors.push(this.expenseApp.categories[category].color);
            }
        });
        
        return { labels, amounts, colors };
    }
    
    getTrendData(expenses) {
        // Get last 6 months of data
        const months = [];
        const amounts = [];
        
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
            months.push(monthKey);
            
            const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
            const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            
            const monthExpenses = expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate >= monthStart && expenseDate <= monthEnd;
            });
            
            const monthTotal = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
            amounts.push(monthTotal);
        }
        
        return { labels: months, amounts };
    }
    
    getDailyData(expenses) {
        // Get last 7 days of data
        const days = [];
        const amounts = [];
        
        const now = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(now.getDate() - i);
            const dayKey = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
            days.push(dayKey);
            
            const dateStr = date.toISOString().split('T')[0];
            const dayExpenses = expenses.filter(expense => expense.date === dateStr);
            
            const dayTotal = dayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
            amounts.push(dayTotal);
        }
        
        return { labels: days, amounts };
    }
}

// Initialize chart manager when the page loads
let chartManager;
document.addEventListener('DOMContentLoaded', () => {
    // Wait for expenseApp to be initialized
    setTimeout(() => {
        chartManager = new ChartManager(expenseApp);
        expenseApp.chartManager = chartManager;
        
        // Add updateCharts method to expenseApp
        expenseApp.updateCharts = function(expenses) {
            chartManager.updateCharts(expenses);
        };
        
        // Initial chart update
        expenseApp.updateUI();
    }, 100);
});