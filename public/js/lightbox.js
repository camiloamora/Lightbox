'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// al hacer clic en una imagen se abra más grande

//obtiene la galeria de imagenes
var getImages = function getImages(container) {
    return [].concat(_toConsumableArray(container.querySelectorAll('img')));
};
//obtiene las rutas de las galeria de imagenes en versión grande
var getLargeImages = function getLargeImages(gallery) {
    return gallery.map(function (el) {
        return el.src;
    }).map(function (el) {
        return el.replace('thumb', 'large');
    });
};
//Obtiene las descripciones de las imagenes
var getDescriptions = function getDescriptions(gallery) {
    return gallery.map(function (el) {
        return el.alt;
    });
};
// console.log(getLargeImages(getImages(document.querySelector('.gallery-container'))));

//Captura el evnto click en la galeria para abrir el lightbox
var openLightboxEvent = function openLightboxEvent(container, gallery, larges, descriptions) {
    container.addEventListener('click', function (e) {
        var el = e.target,
            i = gallery.indexOf(el);
        if (el.tagName === 'IMG') {
            openLightbox(gallery, i, larges, descriptions);
        }
    });
};

//Imprime overaly de ligthbox del body
var openLightbox = function openLightbox(gallery, i, larges, descriptions) {
    //abrir lightbox al pulsar el parametro image
    var lightboxElement = document.createElement('div');
    lightboxElement.innerHTML = '\n        <div class="lightbox-overlay">\n            <figure class="lightbox-container">\n                <div class="close-modal">x</div>\n                <img src="' + larges[i] + '" class="lightbox-image">\n                <figcaption>\n                    <p class="lightbox-description">' + descriptions[i] + '</p>\n                    <nav class="lightbox-navigation">\n                        <a href="#" class="lightbox-navigation__button prev"><<</a>\n                            <span class="lightbox"-navigation__counter> Imagen ' + (i + 1) + ' de ' + gallery.length + '</span>\n                        <a href="#" class="lightbox-navigation__button next">>></a>\n                    </nav>\n                </figcaption>\n            </figure>\n        </div>\n    ';
    lightboxElement.id = 'lightbox';
    document.body.appendChild(lightboxElement);
    closeModal(lightboxElement);
    navigateLightbox(lightboxElement, i, larges, descriptions);
};

var navigateLightbox = function navigateLightbox(lightboxElement, i, larges, descriptions) {
    var prevButton = lightboxElement.querySelector('.prev'),
        nextButton = lightboxElement.querySelector('.next'),
        image = lightboxElement.querySelector('img'),
        description = lightboxElement.querySelector('p'),
        counter = lightboxElement.querySelector('span');
    lightboxElement.addEventListener('click', function (e) {
        console.log(image);
        e.preventDefault();
        image.src = larges[i + 1];
        i++;
    });
};

var closeModal = function closeModal(modalElement) {
    var closeModal = modalElement.querySelector('.close-modal');
    closeModal.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.removeChild(modalElement);
    });
};

var lightbox = function lightbox(container) {
    var images = getImages(container),
        largesImages = getLargeImages(images),
        descriptions = getDescriptions(images);

    openLightboxEvent(container, images, largesImages, descriptions);
};

lightbox(document.getElementById('gallery-container'));
// se abre en un overlay
//la versión grande pueda cerrarse
//Al abrirse la versión grande debe tener
//Descripción de la imagen del atributo alt
//Navegación entre la imagen siguiente y la anterior