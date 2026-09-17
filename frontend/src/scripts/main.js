console.log("DIGITECHKH Prototype Initialized");

// --- Mock Data for future use ---
// You can use this data later when connecting to the Spring Boot backend via fetch()

const statsData = {
    revenue: "$27,350",
    expense: "$7,020",
    profit: "$4,950",
    customers: "3,065"
};

// Example function showing how you can update the DOM using JS without writing raw HTML
export function updateStats(data) {
    const revenueEl = document.getElementById("stat-revenue");
    const expenseEl = document.getElementById("stat-expense");
    const profitEl = document.getElementById("stat-profit");
    const customersEl = document.getElementById("stat-customers");

    if (revenueEl) revenueEl.innerText = data.revenue;
    if (expenseEl) expenseEl.innerText = data.expense;
    if (profitEl) profitEl.innerText = data.profit;
    if (customersEl) customersEl.innerText = data.customers;
}

// Another example for updating the chart label
export function updateOrders(period) {
    const titleEl = document.getElementById("total-orders");
    const changeEl = document.getElementById("total-orders-change");
    
    if (!titleEl || !changeEl) return;

    if (period === 'month') {
        titleEl.innerText = "12,450";
        changeEl.innerHTML = '<i class="fas fa-arrow-up mr-1"></i> +420';
    } else {
        titleEl.innerText = "3,021";
        changeEl.innerHTML = '<i class="fas fa-arrow-up mr-1"></i> +164';
    }
}

// Make updateOrders available globally so the HTML onchange attribute can access it
window.updateOrders = updateOrders;

document.addEventListener("DOMContentLoaded", () => {
    // We can call updateStats(statsData) here if we wanted to dynamically set the initial values
    // updateStats(statsData);
});
