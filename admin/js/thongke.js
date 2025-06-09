window.addEventListener('DOMContentLoaded', () => {
  const primaryColor = '#2563eb';  // xanh dương chính
  const successColor = '#22c55e';  // xanh lá thành công
  const warningColor = '#f59e0b';  // vàng cảnh báo
  const dangerColor = '#ef4444';   // đỏ lỗi
  const infoColor = '#3b82f6';     // xanh dương sáng hơn

  // Hàm chung tạo biểu đồ với options chuẩn đẹp
  function createChart(ctx, type, data, options = {}) {
    return new Chart(ctx, {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 800, easing: 'easeOutQuart' },
        plugins: {
          legend: {
            labels: { font: { size: 14, weight: '600' }, padding: 20 },
            position: options.legendPosition || 'top',
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0,0,0,0.75)',
            titleFont: { weight: '700' },
            bodyFont: { size: 13 }
          },
          ...options.plugins
        },
        scales: options.scales || {},
        ...options.extraOptions
      }
    });
  }

  // Biểu đồ doanh thu theo tháng (Bar Chart)
  createChart(
    document.getElementById('chartDoanhThu').getContext('2d'),
    'bar',
    {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      datasets: [{
        label: 'Doanh thu (triệu đồng)',
        data: [30, 45, 28, 60, 70, 55, 80, 90, 75, 85, 95, 100],
        backgroundColor: primaryColor,
        borderRadius: 8,
        borderSkipped: false,
        maxBarThickness: 35,
        hoverBackgroundColor: infoColor,
      }]
    },
    {
      legendPosition: 'top',
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#e0e7ff' },
          ticks: { font: { size: 13, weight: '600' } }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 13, weight: '600' } }
        }
      }
    }
  );

  // Biểu đồ sản phẩm bán chạy (Pie Chart)
  createChart(
    document.getElementById('chartSanPham').getContext('2d'),
    'pie',
    {
      labels: ['iPhone 15 Pro Max', 'Samsung Galaxy S23', 'OPPO Reno10', 'Xiaomi Redmi Note 12'],
      datasets: [{
        data: [35, 25, 20, 20],
        backgroundColor: [primaryColor, dangerColor, warningColor, successColor],
        hoverOffset: 35,
        borderColor: '#fff',
        borderWidth: 3
      }]
    },
    {
      legendPosition: 'right'
    }
  );

  // Biểu đồ khách hàng mới theo tháng (Line Chart)
  createChart(
    document.getElementById('chartKhachHang').getContext('2d'),
    'line',
    {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
      datasets: [{
        label: 'Khách hàng mới',
        data: [20, 30, 15, 40, 50, 60],
        borderColor: primaryColor,
        backgroundColor: 'rgba(37, 99, 235, 0.3)',
        fill: true,
        tension: 0.3,
        pointRadius: 6,
        pointHoverRadius: 9,
        borderWidth: 3,
        hoverBorderWidth: 4,
        hoverBackgroundColor: 'rgba(37, 99, 235, 0.5)'
      }]
    },
    {
      legendPosition: 'top',
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#f0f9ff' },
          ticks: { font: { size: 13, weight: '600' } }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 13, weight: '600' } }
        }
      }
    }
  );

  // Biểu đồ đơn hàng theo trạng thái (Doughnut Chart)
  createChart(
    document.getElementById('chartDonHang').getContext('2d'),
    'doughnut',
    {
      labels: ['Chờ xử lý', 'Đang giao', 'Đã giao', 'Đã hủy'],
      datasets: [{
        label: 'Đơn hàng',
        data: [10, 20, 50, 5],
        backgroundColor: [warningColor, infoColor, successColor, dangerColor],
        hoverOffset: 40,
        borderColor: '#fff',
        borderWidth: 4,
      }]
    },
    {
      legendPosition: 'bottom'
    }
  );
});
