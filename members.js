// ============ TÌM KIẾM + LỌC THEO TỔ ============

const searchInput = document.querySelector("#search-input");
const filterButtons = document.querySelectorAll(".filter-btn"); 
const memberCards = document.querySelectorAll(".member-card");
const noResultText = document.querySelector("#no-result");

let currentFilter = "all"; 

function filterMembers() {
  const keyword = searchInput.value.trim().toLowerCase();
  let visibleCount = 0; 

  memberCards.forEach(function (card) {
    const name = card.dataset.name; 
    const to = card.dataset.to;

    const matchName = name.includes(keyword); 
    const matchFilter = currentFilter === "all" || to === currentFilter;

    if (matchName && matchFilter) {
      card.style.display = "block"; 
      visibleCount++;
    } else {
      card.style.display = "none"; 
    }
  });

  noResultText.style.display = visibleCount === 0 ? "block" : "none";
}

searchInput.addEventListener("input", filterMembers);

filterButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    currentFilter = btn.dataset.to; 
    filterButtons.forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    filterMembers(); 
  });
});


// ============ MODAL CHI TIẾT THÀNH VIÊN ============

const modal = document.querySelector("#member-modal");
const modalImg = document.querySelector("#modal-img");
// ============ PHÓNG TO AVATAR TRONG BẢNG THÔNG TIN ============

modalImg.addEventListener("click", function(e) {
  e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài (giúp không bị tắt bảng thông tin đi)
  
  const imageModal = document.getElementById("imageModal");
  const imgExpanded = document.getElementById("imgExpanded");
  
  if (imageModal && imgExpanded && this.src) {
      imgExpanded.src = this.src; // Lấy link của avatar đưa vào khung phóng to
      imageModal.classList.remove("hidden"); // Hiện khung nền tối phóng to ảnh
  }
});

const modalFullname = document.querySelector("#modal-fullname");
const modalRole = document.querySelector("#modal-role");
const modalQuote = document.querySelector("#modal-quote");
const modalClose = document.querySelector("#modal-close");
const modalFb = document.querySelector("#modal-fb");
const modalGallery = document.querySelector("#modal-gallery");

function renderGallery(card) {
  modalGallery.innerHTML = ""; 

  const photosString = card.dataset.photos; 
  if (!photosString) return; 

  const photoList = photosString.split(","); 

  photoList.forEach(function (path) {
    const img = document.createElement("img");
    img.src = path.trim(); 
    
    // SỬA LỖI 2: Thêm sự kiện click để phóng to trực tiếp cho các ảnh nhỏ
    img.addEventListener("click", function(e) {
        e.stopPropagation(); // Không đóng modal thành viên bên dưới
        const imageModal = document.getElementById("imageModal");
        const imgExpanded = document.getElementById("imgExpanded");
        if (imageModal && imgExpanded) {
            imgExpanded.src = this.src;
            imageModal.classList.remove("hidden");
        }
    });

    modalGallery.appendChild(img);
  });
}

// Mở Modal chi tiết thành viên
memberCards.forEach(function (card) {
  card.addEventListener("click", function () {
    const imgSrc = card.querySelector("img").src;

    modalImg.src = imgSrc;
    modalFullname.textContent = card.dataset.fullname;
    modalRole.textContent = card.dataset.role;
    modalQuote.textContent = "\"" + card.dataset.quote + "\"";
    modalFb.href = card.dataset.fb;

    renderGallery(card); 

    modal.classList.remove("hidden");
  });
});

modalClose.addEventListener("click", function () {
  modal.classList.add("hidden");
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

// ============ PHÓNG TO ẢNH CHUNG TRONG TRANG ============

document.addEventListener("DOMContentLoaded", function () {
  const imageModal = document.getElementById("imageModal");
  const modalImg = document.getElementById("imgExpanded");
  const closeBtn = document.querySelector(".close-modal");

  function closeModal() {
    if (imageModal) imageModal.classList.add("hidden");
    if (modalImg) modalImg.removeAttribute("src");
  }

  // SỬA LỖI 1: Bỏ ".member-card img" ra khỏi danh sách này. 
  // Giờ chỉ các ảnh trong thư viện (.gallery img) mới bị bắt sự kiện này.
  const images = document.querySelectorAll(".gallery img, .insta-grid img");
  
  images.forEach(function (img) {
    img.addEventListener("click", function (e) {
      e.stopPropagation(); 
      const src = img.getAttribute("src");
      if (src && src.trim() !== "" && imageModal && modalImg) {
        modalImg.src = src;
        imageModal.classList.remove("hidden");
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (imageModal) {
    imageModal.addEventListener("click", function (e) {
      if (e.target === imageModal) closeModal();
    });
  }

  // Xử lý video
  const videos = document.querySelectorAll(".gallery video");
  videos.forEach(function (vid) {
    vid.addEventListener("click", function (e) {
      e.stopPropagation(); 

      if (vid.requestFullscreen) {
        vid.requestFullscreen();
      } else if (vid.webkitRequestFullscreen) {
        vid.webkitRequestFullscreen();
      } else if (vid.msRequestFullscreen) {
        vid.msRequestFullscreen();
      }

      if (vid.paused) {
        vid.play();
      }
    });
  });
});