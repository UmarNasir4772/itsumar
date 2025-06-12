// Chart JS setup for Dashboard
document.addEventListener("DOMContentLoaded", function () {
  const quarterLabels = ["1st Qtr", "2nd Qtr", "3rd Qtr", "4th Qtr"];
  const quarterColors = ["#0d6efd", "#fd7e14", "#6c757d", "#ffc107"];

  function createPieChart(ctxId, dataValues) {
    new Chart(document.getElementById(ctxId), {
      type: "pie",
      data: {
        labels: quarterLabels,
        datasets: [
          {
            data: dataValues,
            backgroundColor: quarterColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.parsed}%`;
              },
            },
          },
        },
      },
    });
  }

  // Create pie charts with example data
  createPieChart("salesChart", [60, 25, 10, 5]);
  createPieChart("purchaseChart", [55, 20, 15, 10]);
  createPieChart("accountsChart", [65, 20, 10, 5]);
  createPieChart("hrChart", [50, 30, 10, 10]);
});
