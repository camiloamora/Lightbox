// al hacer clic en una imagen se abra más grande

//obtiene la galeria de imagenes
const getImages = container => [...container.querySelectorAll('img')];
//obtiene las rutas de las galeria de imagenes en versión grande
const getLargeImages = gallery => gallery
                                    .map(el => el.src)
                                    .map(el => el.replace('thumb', 'large'));
//Obtiene las descripciones de las imagenes
const getDescriptions = gallery => gallery.map(el => el.alt);
// console.log(getLargeImages(getImages(document.querySelector('.gallery-container'))));

//Captura el evnto click en la galeria para abrir el lightbox
const openLightboxEvent = ( container, gallery, larges, descriptions ) => {
    container.addEventListener('click', e => {
        let el = e.target,
            i  = gallery.indexOf(el);
        if(el.tagName === 'IMG'){
            openLightbox(gallery, i, larges, descriptions);
        }
    })
};


//Imprime overaly de ligthbox del body
const openLightbox = (gallery, i, larges, descriptions) =>{
    //abrir lightbox al pulsar el parametro image
    let lightboxElement = document.createElement('div');
    lightboxElement.innerHTML = `
        <div class="lightbox-overlay">
            <figure class="lightbox-container">
                <img src="${larges[i]}" class="lightbox-image">
                <figcaption>
                    <p class="lightbox-description">${descriptions[i]}</p>
                    <nav class="lightbox-navigation">
                        <a href="#" class="lightbox-navigation__button prev"></a>
                            <span class="lightbox"-navigation__counter> Imagen ${i + 1} de ${gallery.length}</span>
                        <a href="#" class="lightbox-navigation__button next"></a>
                    </nav>
                </figcaption>
            </figure>
        </div>
    `;
    lightboxElement.id='lightbox';
    document.body.appendChild(lightboxElement);
}

const lightbox = container => {
    let images = getImages(container),
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