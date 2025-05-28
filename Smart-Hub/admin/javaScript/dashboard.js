document.addEventListener('DOMContentLoaded', function() {
    // Chart 1: New Users
    const ctx1 = document.getElementById('chart1').getContext('2d');
    const chart1 = new Chart(ctx1, {
        type: 'pie',
        data: {
            labels: ['New', 'Returning', 'Inactive'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: [
                    '#4e73df',
                    '#1cc88a',
                    '#36b9cc'
                ],
                hoverBackgroundColor: [
                    '#2e59d9',
                    '#17a673',
                    '#2c9faf'
                ],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        },
    });

    // Chart 2: Approved Clients
    const ctx2 = document.getElementById('chart2').getContext('2d');
    const chart2 = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['Approved', 'Pending', 'Rejected','Unassigned'],
            datasets: [{
                data: [50, 15, 10,25],
                backgroundColor: [
                    '#1cc88a',
                    '#5a5c69',
                    '#f6c23e',
                    '#e74a3b'
                ],
                hoverBackgroundColor: [
                    '#17a673',
                    '#5a5c60',
                    '#dda20a',
                    '#be2617'
                ],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        },
    });

    // Chart 3: Pending Payments
    const ctx3 = document.getElementById('chart3').getContext('2d');
    const chart3 = new Chart(ctx3, {
        type: 'pie',
        data: {
            labels: ['Paid', 'Pending', 'Overdue'],
            datasets: [{
                data: [60, 25, 15],
                backgroundColor: [
                    '#1cc88a',
                    '#f6c23e',
                    '#e74a3b'
                ],
                hoverBackgroundColor: [
                    '#17a673',
                    '#dda20a',
                    '#be2617'
                ],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        },
    });

    // Chart 4: Assigned Staff
    const ctx4 = document.getElementById('chart4').getContext('2d');
    const chart4 = new Chart(ctx4, {
        type: 'pie',
        data: {
            labels: ['Administrators', 'Managers', 'Support'],
            datasets: [{
                data: [15, 35, 50],
                backgroundColor: [
                    '#4e73df',
                    '#1cc88a',
                    '#36b9cc'
                ],
                hoverBackgroundColor: [
                    '#2e59d9',
                    '#17a673',
                    '#2c9faf'
                ],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        },
    });

    // Reports Charts
    // Growth Chart
    const growthCtx = document.getElementById('growth-chart').getContext('2d');
    const growthChart = new Chart(growthCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'New Clients',
                data: [15, 22, 18, 25, 30, 28, 35, 40, 38, 45, 50, 55],
                backgroundColor: 'rgba(78, 115, 223, 0.05)',
                borderColor: 'rgba(78, 115, 223, 1)',
                pointBackgroundColor: 'rgba(78, 115, 223, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
                tension: 0.3
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Payment Chart
    const paymentCtx = document.getElementById('payment-chart').getContext('2d');
    const paymentChart = new Chart(paymentCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Payments ($)',
                data: [2500, 3200, 2800, 3500, 4200, 3800, 4500, 5000, 4800, 5500, 6000, 6500],
                backgroundColor: 'rgba(28, 200, 138, 0.7)',
                borderColor: 'rgba(28, 200, 138, 1)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Monthly Chart
    const monthlyCtx = document.getElementById('monthly-chart').getContext('2d');
    const monthlyChart = new Chart(monthlyCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'New Clients',
                data: [15, 22, 18, 25, 30, 28, 35, 40, 38, 45, 50, 55],
                backgroundColor: 'rgba(78, 115, 223, 0.7)',
                borderColor: 'rgba(78, 115, 223, 1)',
                borderWidth: 1
            },
            {
                label: 'Payments ($1000)',
                data: [2.5, 3.2, 2.8, 3.5, 4.2, 3.8, 4.5, 5.0, 4.8, 5.5, 6.0, 6.5],
                backgroundColor: 'rgba(28, 200, 138, 0.7)',
                borderColor: 'rgba(28, 200, 138, 1)',
                borderWidth: 1,
                type: 'line',
                tension: 0.3,
                yAxisID: 'y1'
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'New Clients'
                    }
                },
                y1: {
                    position: 'right',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Payments ($1000)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
});