const imageGrid = document.querySelector(".image__grid");
const scrollable = document.querySelector(".scrollable");

let images = [];

let currentY = 0;
let targetY = 0;
let imagesLoaded = 0;
// add images
for (let i = 0; i < 6; i++) {
	let div = document.createElement("div"); // creating a div
	div.classList.add("image__container"); // adding a class to the div

	let image = document.createElement("img"); // creating an image
	image.src = `./images/${i + 1}.jpg`;
	image.className = "lazyload";
	images.push(image);

	div.style.gridRowStart = i + 1; // row start of each image

	let overlay = document.createElement("div");
	overlay.classList.add("overlay");

	let textDiv = document.createElement("div"); // creating text div in each image element
	textDiv.innerHTML =
		"<h3> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut inventore ad, corporis numquam, explicabo neque dolores iste nihil aliquam doloribus nulla aperiam quaerat hic obcaecati dolor eum perferendis? Molestiae, sint.</h3>"; // adding content
	textDiv.style.gridRowStart = i + 1;

	div.append(image, overlay); // appending image and overlay to div

	imageGrid.append(div, textDiv); // appending div to image grid

	if (i % 2 == 1) {
		div.style.gridColumnStart = 1;
		div.style.gridColumnEnd = 1 + 5;
		textDiv.style.gridColumnStart = 8;
		textDiv.style.gridColumnEnd = 8 + 5;
	} else {
		div.style.gridColumnStart = 8;
		div.style.gridColumnEnd = 8 + 5;
		textDiv.style.gridColumnStart = 1;
		textDiv.style.gridColumnEnd = 1 + 5;
	}
	createPixel(div);
}

function createPixel(image) {
	let { width, height } = image.getBoundingClientRect();
	for (let x = 0; x < width; x += 20) {
		for (let y = 0; y < height; y += 20) {
			let imagePixel = document.createElement("div");
			imagePixel.className = "pixel";
			imagePixel.style.left = x + "px";
			imagePixel.style.top = y + "px";
			image.append(imagePixel);
		}
	}
}

function setup() {
	const scrollHeight = scrollable.offsetHeight;
	document.body.style.height = `${scrollHeight}px`;
}

function lerp(start, end, t) {
	return start * (1 - t) + end * t;
}

window.addEventListener("scroll", () => {
	targetY = window.scrollY;
});

function smoothScroll() {
	currentY = lerp(currentY, targetY, 0.075);
	scrollable.style.transform = `translate3d(0,${-currentY}px,0)`;

	for (let i = 0; i < images.length; i++) {
		let { top, height } = images[i].parentElement.getBoundingClientRect();
		top -= window.innerHeight / 2 - height / 2;
		images[i].style.transform = `translate3d(0,${top * 0.15}px,0)`;
	}
	requestAnimationFrame(smoothScroll);
}

setup();
smoothScroll();
