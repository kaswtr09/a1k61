// ============ DARK / LIGHT MODE TOGGLE ============

const themeToggleBtn = document.querySelector("#theme-toggle");

// 1. Kiểm tra bộ nhớ ngay khi vừa load trang
// Nếu lần trước người dùng đã chọn dark mode thì bật luôn
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggleBtn.textContent = "☀️"; // Hiện icon mặt trời
} else {
  themeToggleBtn.textContent = "🌙"; // Hiện icon mặt trăng
}

// 2. Nghe ngóng sự kiện khi bấm nút
themeToggleBtn.addEventListener("click", function () {
  // Bật/tắt class dark-mode trên body
  document.body.classList.toggle("dark-mode");

  // Kiểm tra xem body có đang mang class dark-mode không để lưu vào bộ nhớ
  if (document.body.classList.contains("dark-mode")) {
    themeToggleBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark"); // Ghi nhớ: Đã chọn Tối
  } else {
    themeToggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "light"); // Ghi nhớ: Đã chọn Sáng
  }
});