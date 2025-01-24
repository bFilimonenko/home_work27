const INTERVAL = 3000;
let currentSlide = 0;
const slidesElement = document.querySelector(".slides");
const indicatorsElement = document.querySelector(".indicators");
const DEFAULT_ACTION = "next";

const imagesArray = [
  { src: "images/1.jpg", alt: "big cars" },
  { src: "images/2.jpg", alt: "car1" },
  { src: "images/3.jpg", alt: "car2" },
  { src: "images/4.jpg", alt: "car3" },
  { src: "images/5.jpg", alt: "car with parrot" }
];

function generateSlider() {
  imagesArray.forEach((image, index) => {
    // 1. generate slides
    generateSlide(image, index, slidesElement);

    // 2. generate indicators
    generateIndicator(index, indicatorsElement);
  });
}

function generateSlide(image, index, parent) {
  const slide = document.createElement("div");
  slide.classList.add("slide");

  if (index === 0) {
    slide.classList.add("active");
  }

  const img = document.createElement("img");
  img.src = image.src;
  img.alt = image.alt;
  slide.appendChild(img);

  parent.appendChild(slide);
}

function generateIndicator(index, parent) {
  const indicator = document.createElement("div");
  indicator.classList.add("indicator");
  if (index === 0) {
    indicator.classList.add("active");
  }

  indicator.setAttribute("data-id", index);
  parent.appendChild(indicator);
}

generateSlider();

function changeSlide(event, slideNumber = -1) {
  const buttonAction = !event ? DEFAULT_ACTION : event.target.getAttribute("data-action") || event.key;
  slidesElement.children[currentSlide].classList.remove("active");
  indicatorsElement.children[currentSlide].classList.remove("active");

  if (event || slideNumber !== -1) {
    clearInterval(timer);
    timer = setInterval(changeSlide, INTERVAL);
  }

  if (slideNumber !== -1) {
    currentSlide = slideNumber;
  } else {
    const lastElement = slidesElement.children.length - 1;

    if (buttonAction === "prev" || buttonAction === "ArrowLeft") {
      currentSlide = currentSlide === 0 ? lastElement : (currentSlide - 1);
    } else {
      currentSlide = currentSlide === lastElement ? 0 : (currentSlide + 1);
    }
  }

  slidesElement.children[currentSlide].classList.add("active");
  indicatorsElement.children[currentSlide].classList.add("active");
}

let timer = setInterval(changeSlide, INTERVAL);

document.querySelector(".prev-btn").addEventListener("click", changeSlide);

document.querySelector(".next-btn").addEventListener("click", changeSlide);

document.querySelector(".indicators").addEventListener("click", event => {
  if (event.target.tagName === "DIV" && event.target.classList.contains("indicator")) {
    const indicatorId = parseInt(event.target.getAttribute("data-id"));

    changeSlide(null, indicatorId);
  }
});

// document.addEventListener('keydown', event)

/*
 Next lesson:
  1) touch events
  2) next/prev with keyboard
*/

document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight") {
    changeSlide(event);
  }
  if (event.code === "ArrowLeft") {
    changeSlide(event);
  }
});

