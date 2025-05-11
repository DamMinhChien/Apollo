$(document).ready(function() {
    // Khởi tạo bản đồ Leaflet
    const map = L.map('map').setView([21.0285, 105.8542], 13); // Mặc định là Hà Nội, Việt Nam

    // Thêm lớp bản đồ OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // Biến để lưu marker
    let marker = null;

    // Hàm cập nhật các trường địa chỉ dựa trên tọa độ
    async function updateAddress(lat, lng) {
        try {
            const response = await $.getJSON(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
            
            if (response.address) {
                // Cập nhật trường địa chỉ cụ thể
                $('#address').val(response.address.road || '');

                // Cập nhật tỉnh/thành phố
                const province = response.address.state || response.address.city;
                if (province) {
                    $('#province').val(province).trigger('change');
                }

                // Cập nhật quận/huyện
                const district = response.address.county || response.address.district;
                if (district) {
                    $('#district').val(district).trigger('change');
                }

                // Cập nhật phường/xã
                const ward = response.address.suburb || response.address.village;
                if (ward) {
                    $('#ward').val(ward);
                }
            }
        } catch (error) {
            console.error('Lỗi khi lấy địa chỉ:', error);
        }
    }

    // Xử lý sự kiện nhấp vào bản đồ
    map.on('click', function(e) {
        const { lat, lng } = e.latlng;

        // Xóa marker cũ nếu có
        if (marker) {
            map.removeLayer(marker);
        }

        // Thêm marker mới
        marker = L.marker([lat, lng]).addTo(map);

        // Cập nhật địa chỉ
        updateAddress(lat, lng);
    });

    // Thêm tính năng lấy vị trí hiện tại
    if (navigator.geolocation) {
        $('#map').after('<button id="use-location" class="btn btn-outline-primary mt-2">Sử dụng vị trí hiện tại</button>');

        $('#use-location').on('click', function() {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const { latitude, longitude } = position.coords;
                    map.setView([latitude, longitude], 15);

                    // Xóa marker cũ nếu có
                    if (marker) {
                        map.removeLayer(marker);
                    }

                    // Thêm marker mới
                    marker = L.marker([latitude, longitude]).addTo(map);

                    // Cập nhật địa chỉ
                    updateAddress(latitude, longitude);
                },
                function(error) {
                    console.error('Lỗi khi lấy vị trí:', error);
                    alert('Không thể lấy vị trí hiện tại. Vui lòng chọn vị trí trên bản đồ.');
                }
            );
        });
    }
});