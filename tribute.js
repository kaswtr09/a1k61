// ============ WISHBOARD - LỜI CHÚC LƯU BẰNG localStorage ============

const wishForm = document.querySelector("#wish-form");
const wishNameInput = document.querySelector("#wish-name");
const wishMessageInput = document.querySelector("#wish-message");
const wishList = document.querySelector("#wish-list");

// localStorage chỉ lưu được CHUỖI CHỮ (string), không lưu được mảng/object trực tiếp
// nên phải dùng JSON.stringify (mảng -> chuỗi) khi LƯU
// và JSON.parse (chuỗi -> mảng) khi ĐỌC LẠI

// Hàm lấy danh sách lời chúc đã lưu trước đó ra (nếu chưa có gì thì trả về mảng rỗng [])
function getSavedWishes() {
  const data = localStorage.getItem("wishes"); // "wishes" là cái tên (key) mình tự đặt để lưu
  return data ? JSON.parse(data) : [];
  // dòng trên: nếu data có giá trị (khác null) thì parse ra mảng, không thì trả về mảng rỗng
}

// Hàm lưu lại toàn bộ danh sách lời chúc vào localStorage
function saveWishes(wishesArray) {
  localStorage.setItem("wishes", JSON.stringify(wishesArray));
}

// Hàm vẽ 1 tấm thiệp lời chúc ra màn hình
function renderWish(wish) {
  const card = document.createElement("div"); // tạo mới 1 thẻ <div>
  card.className = "wish-card";
  // Đưa tên và lời chúc vào bên trong thẻ div vừa tạo
  card.innerHTML = "<strong>" + wish.name + "</strong><p>" + wish.message + "</p>";
  wishList.appendChild(card); // gắn thẻ div này vào cuối #wish-list để hiển thị ra trang
}

// Hàm hiện lại TẤT CẢ lời chúc đã lưu, gọi 1 lần ngay khi trang vừa load xong
function renderAllWishes() {
  const wishes = getSavedWishes();
  wishes.forEach(renderWish); // vẽ lần lượt từng lời chúc đã lưu ra màn hình
}

// Khi người dùng bấm nút "Gửi" trong form
wishForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // preventDefault(): chặn hành vi mặc định của form là tải lại trang khi bấm Gửi
  // vì mình muốn xử lý bằng JS, không muốn trang bị load lại mất hết dữ liệu

  const newWish = {
    name: wishNameInput.value.trim(),
    message: wishMessageInput.value.trim()
  };

  if (newWish.name === "" || newWish.message === "") return; // nếu bỏ trống thì không làm gì cả

  const wishes = getSavedWishes(); // lấy danh sách cũ ra
  wishes.push(newWish); // thêm lời chúc mới vào cuối danh sách
  saveWishes(wishes); // lưu lại toàn bộ danh sách (cũ + mới) vào localStorage

  renderWish(newWish); // vẽ ngay tấm thiệp mới lên màn hình, không cần load lại trang

  wishForm.reset(); // xoá trắng lại 2 ô nhập để người tiếp theo gõ lời chúc mới
});

// Chạy ngay khi trang vừa mở, để hiện lại các lời chúc đã có từ trước
renderAllWishes();
