import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const gallery = document.querySelector('.gallery');

insertGalleryMarkup(createGalleryMarkup(galleryItems));

new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, });

function createGalleryMarkup(galleryItems) {
    return galleryItems.reduce((acc, { preview, original, description }) => acc +
        `<div><a class="gallery__item" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a></div>`, "");
};

function insertGalleryMarkup(markup) {
    gallery.insertAdjacentHTML('beforeend', markup);
};