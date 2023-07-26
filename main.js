// main.js

const searchImages = async () => {
    const searchQuery = document.getElementById('searchInput').value;
    const response = await fetch(`/photos?query=${searchQuery}`);
    const data = await response.json();
  
    const imageGallery = document.getElementById('imageGallery');
    imageGallery.innerHTML = '';
  
    data.forEach((image) => {
      const imgElement = document.createElement('img');
      imgElement.src = image.img_url;
      imgElement.alt = image.id;
  
      imageGallery.appendChild(imgElement);
    });
  };
  