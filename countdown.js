// ============ ĐỒNG HỒ ĐẾM NGƯỢC ============

// Bước 1: Đặt ngày đích - SỬA NGÀY NÀY LẠI THÀNH NGÀY THẬT của lớp bạn
// Định dạng: "Năm-Tháng-Ngày" (Tháng và Ngày viết 2 chữ số)
const targetDate = new Date("2027-06-18T00:00:00").getTime();
// .getTime() đổi ngày thành 1 con số (mốc thời gian), để dễ trừ với thời gian hiện tại

// Bước 2: Lấy sẵn 4 ô số ra từ HTML (theo id đã đặt trong index.html)
const daysEl = document.querySelector("#days");
const hoursEl = document.querySelector("#hours");
const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");

// Bước 3: Viết 1 hàm để tính toán và cập nhật số hiển thị
function updateCountdown() {
  const now = new Date().getTime(); // thời gian hiện tại, tính bằng mili-giây
  const distance = targetDate - now; // khoảng cách còn lại, tính bằng mili-giây

  // Đổi mili-giây thành ngày / giờ / phút / giây
  // 1000 mili-giây = 1 giây, 60 giây = 1 phút, 60 phút = 1 giờ, 24 giờ = 1 ngày
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Bước 4: Đưa số đã tính vào lại HTML để hiển thị
  // padStart(2, "0"): nếu số chỉ có 1 chữ số (ví dụ 5) thì thêm số 0 phía trước -> "05"
  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");

  // Nếu đã quá ngày đích, dừng không đếm nữa
  if (distance < 0) {
    clearInterval(countdownInterval);
    daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = "00";
  }
}

// Bước 5: Chạy hàm updateCountdown() ngay lập tức 1 lần (để không phải chờ 1 giây mới thấy số)
updateCountdown();

// Bước 6: setInterval = lặp lại hàm này mỗi 1000 mili-giây (1 giây) để đồng hồ luôn cập nhật
const countdownInterval = setInterval(updateCountdown, 1000);
