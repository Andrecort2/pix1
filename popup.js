const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const pixelSizeInput = document.getElementById('pixel-size');
const imageUrlInput = document.getElementById('image-url');
const pixelateButton = document.getElementById('pixelate');
const downloadButton = document.getElementById('download');

const pixelateImage = () => {
  const pixelSize = parseInt(pixelSizeInput.value);
  const imageUrl = imageUrlInput.value;

  if (isNaN(pixelSize) || pixelSize < 1) {
    alert('Por favor, insira um valor válido para o tamanho dos pixels.');
    return;
  }

  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = imageUrl;
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;

    ctx.drawImage(img, 0, 0, img.width / pixelSize, img.height / pixelSize);
    ctx.drawImage(canvas, 0, 0, img.width / pixelSize, img.height / pixelSize, 0, 0, img.width, img.height);

    const dataURL = canvas.toDataURL('image/png');
    downloadButton.href = dataURL;
    downloadButton.download = 'pixelated-image.png';
    downloadButton.style.display = 'block';
  };
};

pixelateButton.addEventListener('click', pixelateImage);

// Função para obter a URL da imagem da guia ativa
const fetchImageUrl = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;

    if (url.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
      document.getElementById("image-url").value = url;
    }
  });
};

// Adicionar evento para preencher automaticamente o campo de URL da imagem
document.addEventListener("DOMContentLoaded", fetchImageUrl);
