const ORDER_URL =
  "https://docs.google.com/document/d/1M7FTZQ4tBs0zgJTzExDCf6ctYibihCHFnPOlZBEEDHY/edit?tab=t.0";

const products = [
  {
    id: 1,
    name: "商品 1",
    media: [
      "./商品圖01/商品頁-商品圖01-1.png?v=20260512b",
      "./商品圖01/商品頁-商品圖01-2.png?v=20260512b",
      "./商品圖01/商品頁-商品圖01-3.png?v=20260512b",
    ],
  },
  {
    id: 2,
    name: "商品 2",
    media: ["./商品圖02/商品頁-商品圖02-1.png?v=20260512b"],
  },
  {
    id: 3,
    name: "商品 3",
    media: ["./商品圖-03/商品頁-商品圖03-1.png?v=20260512b"],
  },
  {
    id: 4,
    name: "商品 4",
    media: ["./商品圖04/商品頁-商品圖04-1.png?v=20260512b"],
  },
  {
    id: 5,
    name: "商品 5",
    media: ["./商品圖05/商品頁-商品圖05-1.png?v=20260512b"],
  },
  {
    id: 6,
    name: "商品 6",
    media: ["./商品圖06/商品頁-商品圖06-1.png?v=20260512b"],
  },
];

const params = new URLSearchParams(window.location.search);
const currentId = Number(params.get("id")) || 1;
const product = products.find((item) => item.id === currentId) || products[0];
const index = products.findIndex((item) => item.id === product.id);
const previousProduct = products[(index - 1 + products.length) % products.length];
const nextProduct = products[(index + 1) % products.length];

document.title = `Lessert - ${product.name}`;
document.getElementById("prevProduct").href = `./product.html?id=${previousProduct.id}`;
document.getElementById("nextProduct").href = `./product.html?id=${nextProduct.id}`;
document.getElementById("googleOrder").href = ORDER_URL;
document.getElementById("lineOrder").href = ORDER_URL;

const carousel = document.querySelector(".media-carousel");
const slides = document.getElementById("slides");
const dots = document.getElementById("slideDots");
let activeSlide = 0;

product.media.forEach((src, mediaIndex) => {
  const slide = document.createElement("div");
  slide.className = "slide";

  const isVideo = /\.(mp4|mov|webm|m4v)(\?.*)?$/i.test(src);
  const media = document.createElement(isVideo ? "video" : "img");
  media.src = src;

  if (isVideo) {
    media.controls = true;
    media.playsInline = true;
  } else {
    media.alt = `${product.name} 圖片 ${mediaIndex + 1}`;
  }

  slide.append(media);
  slides.append(slide);

  const dot = document.createElement("span");
  dots.append(dot);
});

if (product.media.length > 1) {
  carousel.classList.add("has-multiple");
}

function updateSlide() {
  slides.style.transform = `translateX(-${activeSlide * 100}%)`;
  [...dots.children].forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === activeSlide);
  });
}

function moveSlide(direction) {
  activeSlide = (activeSlide + direction + product.media.length) % product.media.length;
  updateSlide();
}

document.querySelector(".carousel-control.previous").addEventListener("click", () => moveSlide(-1));
document.querySelector(".carousel-control.next").addEventListener("click", () => moveSlide(1));

let touchStartX = 0;

carousel.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
});

carousel.addEventListener("touchend", (event) => {
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (product.media.length > 1 && Math.abs(distance) > 48) {
    moveSlide(distance > 0 ? -1 : 1);
  }
});

updateSlide();
