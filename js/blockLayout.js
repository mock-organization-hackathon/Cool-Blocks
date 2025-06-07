const backgroundColorPicker = document.getElementById("background-color");
const blockColorPicker = document.getElementById("block-color");
const blocks = document.getElementsByClassName("block");
const button = document.getElementById("generate");
var blockAmount;

// Set default red color
blockColorPicker.value = "#dc143c";

generate();

button.addEventListener("click", function () {
  generate();
});

blockColorPicker.addEventListener("change", function () {
  const selectedColor = blockColorPicker.value;
  const darkerColor = adjustBrightness(selectedColor, -30);
  const darkestColor = adjustBrightness(selectedColor, -60);
  
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].style.background = `linear-gradient(135deg, ${selectedColor}, ${darkerColor}, ${darkestColor})`;
    blocks[i].style.boxShadow = `0 8px 32px ${selectedColor}50, 0 0 20px ${selectedColor}30`;
  }
});

backgroundColorPicker.addEventListener("change", function () {
  document.body.style.background =
    "linear-gradient(180deg, #f9f9f9, " + backgroundColorPicker.value + ")";
});

function generate() {
  var blockAmount = Math.floor(Math.random() * 10) + 1;
  document.getElementById("block-container").innerHTML = "";
  for (var i = 0; i < blockAmount; i++) {
    createBlocks();
  }
}

function createBlocks() {
  var block = document.createElement("div");
  block.classList.add("block");
  
  // Enhanced size ranges
  block.style.height = Math.floor(Math.random() * 25) + 15 + "%";
  block.style.width = Math.floor(Math.random() * 25) + 15 + "%";
  
  // Set CSS custom property for rotation
  const rotation = Math.floor(Math.random() * 360);
  block.style.setProperty('--rotation', rotation + 'deg');
  
  // Improved positioning
  block.style.left = Math.floor(Math.random() * 70) + 5 + "%";
  block.style.top = Math.floor(Math.random() * 70) + 5 + "%";
  
  // Better opacity range
  block.style.opacity = Math.random() * 0.6 + 0.4;
  
  // Random animation delay
  block.style.animationDelay = Math.random() * 3 + "s";
  
  // Cool transform effects
  block.style.transform = `rotate(${rotation}deg) scale(${Math.random() * 0.3 + 0.8})`;
  
  // Apply current color scheme
  const selectedColor = blockColorPicker.value;
  const darkerColor = adjustBrightness(selectedColor, -30);
  const darkestColor = adjustBrightness(selectedColor, -60);
  block.style.background = `linear-gradient(135deg, ${selectedColor}, ${darkerColor}, ${darkestColor})`;
  
  document.getElementById("block-container").appendChild(block);
}

function adjustBrightness(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}