// ============ XỬ LÝ PHÓNG TO ẢNH & VIDEO ============

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

// Lấy TẤT CẢ các mục trong thư viện (cả ảnh và video)
const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach(function(item) {
  item.addEventListener("click", function(e) {
    
    // KIỂM TRA: NẾU LÀ ẢNH (IMG)
    if (item.tagName.toLowerCase() === "img") {
      if (lightboxImg && lightbox) {
        lightboxImg.src = item.src;           // Gắn link ảnh
        lightbox.classList.remove("hidden");  // Mở khung nền tối
      }
    } 
    
    // KIỂM TRA: NẾU LÀ VIDEO
    else if (item.tagName.toLowerCase() === "video") {
      e.preventDefault(); // Ngăn hành vi nổi bọt mặc định
      
      // Yêu cầu trình duyệt phóng to toàn màn hình video này
      if (item.requestFullscreen) {
        item.requestFullscreen();
      } else if (item.webkitRequestFullscreen) { /* Dành cho Safari */
        item.webkitRequestFullscreen();
      } else if (item.msRequestFullscreen) { /* Dành cho IE */
        item.msRequestFullscreen();
      }

      // Tự động phát video luôn khi vừa phóng to
      if (item.paused) {
        item.play();
      }
    }
  });
});

// Đóng lightbox ảnh khi bấm vào nút X
if (lightboxClose) {
  lightboxClose.addEventListener("click", function() {
    lightbox.classList.add("hidden");
    lightboxImg.src = ""; // Xóa link ảnh để tránh lỗi
  });
}

// Đóng lightbox ảnh khi bấm ra ngoài khoảng tối
if (lightbox) {
  lightbox.addEventListener("click", function(event) {
    if (event.target === lightbox) {
      lightbox.classList.add("hidden");
      lightboxImg.src = "";
    }
  });
}