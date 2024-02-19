/* START: BIBLIOTECAS DE FUNCIONES*/
const PlusButton = {
    // Array para rastrear las canciones agregadas
    addedSongs: [],
    // Función para agregar una canción a favoritos
    addToFavorites: function (songElement) {
        // Verificar si la canción ya ha sido agregada
        if (!this.addedSongs.includes(songElement)) {
            // Clonar la canción seleccionada
            const clonedSong = songElement.cloneNode(true);

            // Eliminar el botón de favorito de la copia
            clonedSong.querySelector('.fa-solid.fa-heart').remove();

            // Crear el botón de eliminar
            const trashBtn = document.createElement("button");
            trashBtn.classList.add("fa-solid", "fa-trash");

            // Escuchar el evento de clic en el botón de eliminar
            trashBtn.addEventListener("click", function () {
                // Eliminar la canción del contenedor "myplaylist"
                this.parentElement.remove();
                // Actualizar el array de canciones agregadas
                PlusButton.addedSongs = PlusButton.addedSongs.filter(song => song !== songElement);
            });

            // Agregar el botón de eliminar a la copia
            clonedSong.appendChild(trashBtn);

            // Agregar el elemento clonado al contenedor "myplaylist"
            this.myPlaylistContainer.appendChild(clonedSong);

            // Agregar la canción al array de canciones agregadas
            this.addedSongs.push(songElement);
        }
    },
    // Referencia al contenedor "favoritos"
    myPlaylistContainer: document.querySelector('#favoritos')
};

// FUNCIÓN: Agarra la canción como parámetro
function createPlayBtn(song) {
    // Crear botón de reproducción
    const playBtn = document.createElement("button");
    playBtn.classList.add("fa-solid", "fa-play");
    playBtn.addEventListener("click", function () {


        // Actualizar la información
        const infoElement = document.getElementById("info");
        infoElement.innerHTML = `
            <p><strong>Nombre:</strong> ${song.nombre}</p>
            <p><strong>Artista:</strong> ${song.artista}</p>
            <p><strong>Año:</strong> ${song.anio}</p>
            <p><strong>Duración:</strong> ${song.duracion}</p>
            <p><strong>Género:</strong> ${song.genero}</p>
            `;
    });
    return playBtn;
}

// FUNCIÓN: Reproducir la canción
function reproducirCancion(song) {
    // Detener la reproducción de la canción actual, si la hay
    currentAudio.pause();
    currentAudio.currentTime = 0;

    // Establecer la URL de la nueva canción seleccionada
    currentAudio.src = song.urlSong;

    // Reproducir la nueva canción
    currentAudio.volume = 0.25;
    currentAudio.play();

    // Obtener referencia al contenedor de la portada
    const portadaContainer = document.querySelector('#portada');

    // Crear un elemento img para la cubierta de la canción
    const coverElement = document.createElement('img');
    coverElement.src = song.cover;
    coverElement.style.width = '200px';
    coverElement.style.height = '200px';

    // Limpia el contenedor de la portada y agrega la nueva cubierta
    portadaContainer.innerHTML = '';
    portadaContainer.appendChild(coverElement);    

    // Actualizar la información
    const infoElement = document.getElementById("info");
    infoElement.innerHTML = `
            <p><strong>Nombre:</strong> ${song.nombre}</p>
            <p><strong>Artista:</strong> ${song.artista}</p>
            <p><strong>Año:</strong> ${song.anio}</p>
            <p><strong>Duración:</strong> ${song.duracion}</p>
            <p><strong>Género:</strong> ${song.genero}</p>
        `;
}

/* FUNCIÓN: Limpiar contenedor con trash*/
function stopSong(clonedSong) {
    // Detener la reproducción de la canción actual
    currentAudio.pause();
    currentAudio.currentTime = 0;
  
    // Limpiar el contenido del contenedor de la portada y la información
    const portadaContainer = document.querySelector('#portada');
    portadaContainer.innerHTML = 'Portada';
  
    const infoElement = document.getElementById("info");
    infoElement.innerHTML = `
    <p><strong>Nombre:</strong></p>
    <p><strong>Artista:</strong></p>
    <p><strong>Año:</strong></p>
    <p><strong>Duración:</strong></p>
    <p><strong>Género:</strong></p>
    `;

    // Eliminar la canción del contenedor myPlaylistContainer
    clonedSong.parentElement.removeChild(clonedSong);
  }

/* END: BIBLIOTECAS DE FUNCIONES*/


/* START: CLASES*/

class Song {
    constructor({ id, nombre, artista, anio, duracion, genero, cover, urlSong }) {
        this.id = id;
        this.nombre = nombre;
        this.artista = artista;
        this.anio = anio;
        this.duracion = duracion;
        this.genero = genero;
        this.cover = cover;
        this.urlSong = urlSong;
    }

    getSongnombreAndArtista() {
        return `${this.nombre} - ${this.artista}`
    }

    getSongid() {
        return `${this.id}`;
    }

    getSonganio() {
        return `${this.anio}`;
    }
    getSongduracion() {
        return `${this.duracion}`;
    }
    getSonggenero() {
        return `${this.genero}`;
    }
    getSongCover() {
        return `${this.cover}`;
    }
    getSongUrlSong() {
        return `${this.urlSong}`;
    }

}

class Reproduccion {
    constructor(playlist) {
        this.currentSong = null; // Inicialmente no hay ninguna canción
        this.isPlaying = false;
        this.activeCover = null; //ya que debe ser actualizado cuando cambies de canción.//
        this.activePlaylist = playlist; // La lista de reproducción activa
    }

    play() {
        if (this.currentSong) {
            this.isPlaying = true;
            console.log(`Reproduciendo: ${this.currentSong.nombre}`);
        }
    }

    pause() {
        this.isPlaying = false;
        console.log(`Reproducción pausada en: ${this.currentSong.nombre}`);
    }

    changeSong(song) {
        this.currentSong = song;
        this.activeCover = song.cover; // Actualiza el cover activo al cover de la nueva canción
        console.log(`Cambiada la canción a: ${this.currentSong.nombre}`);
    }

    changePlaylist(playlist) {
        this.activePlaylist = playlist;
        if (playlist.songs.length > 0) {
            this.changeSong(playlist.songs[0]); // Cambia a la primera canción de la lista
            this.play(); // Reproduce automáticamente la primera canción de la lista
        } else {
            this.currentSong = null; // Si la lista está vacía, no hay ninguna canción para reproducir
        }
    }
}

class Playlist extends Reproduccion {
    constructor(name) {
        super(null); // Playlist doesn't have an initial song
        this.name = name;
        this.songs = [];
    }

    addSong(song) {
        this.songs.push(song);
    }

    removeSong(song) {
        const index = this.songs.indexOf(song);
        if (index !== -1) {
            this.songs.splice(index, 1);
        }
    }
}

class Favorites extends Reproduccion {
    constructor() {
        super(null); // Favorites doesn't have an initial song
    }

    addSong(song) {
        this.currentSong = song; // Add the song to favorites by setting it as the current song
    }

    removeSong(song) {
        const index = this.songs.indexOf(song);
        if (index !== -1) {
            this.songs.splice(index, 1);
        }
    }
}

/* Continuando con las clases, se crea la lista de canciones y se agrega a "Catálogo"*/
const songs = [
    new Song({ id: "1", nombre: "cancion 1", artista: "artista 1", anio: "año 1", duracion: "duracion 1", genero: "genero 1", cover: "./imagenes/cancion1.jpg", urlSong: "./canciones/cancion1.mp3" }),
    new Song({ id: "2", nombre: "cancion 2", artista: "artista 2", anio: "año 2", duracion: "duracion 2", genero: "genero 2", cover: "./imagenes/cancion2.jpg", urlSong: "./canciones/cancion2.mp3" }),
    new Song({ id: "3", nombre: "cancion 3", artista: "artista 3", anio: "año 3", duracion: "duracion 3", genero: "genero 3", cover: "./imagenes/cancion3.jpg", urlSong: "./canciones/cancion3.mp3" }),
    new Song({ id: "4", nombre: "cancion 4", artista: "artista 4", anio: "año 4", duracion: "duracion 4", genero: "genero 4", cover: "./imagenes/cancion4.jpg", urlSong: "./canciones/cancion4.mp3" }),
    new Song({ id: "5", nombre: "cancion 5", artista: "artista 5", anio: "año 5", duracion: "duracion 5", genero: "genero 5", cover: "./imagenes/cancion5.jpg", urlSong: "./canciones/cancion5.mp3" }),
    new Song({ id: "6", nombre: "cancion 6", artista: "artista 6", anio: "año 6", duracion: "duracion 6", genero: "genero 6", cover: "./imagenes/cancion6.jpg", urlSong: "./canciones/cancion6.mp3" }),
    new Song({ id: "7", nombre: "cancion 7", artista: "artista 7", anio: "año 7", duracion: "duracion 7", genero: "genero 7", cover: "./imagenes/cancion7.jpg", urlSong: "./canciones/cancion7.mp3" }),
    new Song({ id: "8", nombre: "cancion 8", artista: "artista 8", anio: "año 8", duracion: "duracion 8", genero: "genero 8", cover: "./imagenes/cancion8.jpg", urlSong: "./canciones/cancion8.mp3" }),
    new Song({ id: "9", nombre: "cancion 9", artista: "artista 9", anio: "año 9", duracion: "duracion 9", genero: "genero 9", cover: "./imagenes/cancion9.jpg", urlSong: "./canciones/cancion9.mp3" }),
    new Song({ id: "10", nombre: "cancion 10", artista: "artista 10", anio: "año 10", duracion: "duracion 10", genero: "genero 10", cover: "./imagenes/cancion10.jpg", urlSong: "./canciones/cancion10.mp3" }),
    new Song({ id: "11", nombre: "cancion 11", artista: "artista 11", anio: "año 11", duracion: "duracion 11", genero: "genero 11", cover: "./imagenes/cancion11.jpg", urlSong: "./canciones/cancion11.mp3" }),
    new Song({ id: "12", nombre: "cancion 12", artista: "artista 12", anio: "año 12", duracion: "duracion 12", genero: "genero 12", cover: "./imagenes/cancion12.jpg", urlSong: "./canciones/cancion12.mp3" }),
    new Song({ id: "13", nombre: "cancion 13", artista: "artista 13", anio: "año 13", duracion: "duracion 13", genero: "genero 13", cover: "./imagenes/cancion13.jpg", urlSong: "./canciones/cancion13.mp3" }),
    new Song({ id: "14", nombre: "cancion 14", artista: "artista 14", anio: "año 14", duracion: "duracion 14", genero: "genero 14", cover: "./imagenes/cancion14.jpg", urlSong: "./canciones/cancion14.mp3" }),
    new Song({ id: "15", nombre: "cancion 15", artista: "artista 15", anio: "año 15", duracion: "duracion 15", genero: "genero 15", cover: "./imagenes/cancion15.jpg", urlSong: "./canciones/cancion15.mp3" }),
    new Song({ id: "16", nombre: "cancion 16", artista: "artista 16", anio: "año 16", duracion: "duracion 16", genero: "genero 16", cover: "./imagenes/cancion16.jpg", urlSong: "./canciones/cancion16.mp3" }),
    new Song({ id: "17", nombre: "cancion 17", artista: "artista 17", anio: "año 17", duracion: "duracion 17", genero: "genero 17", cover: "./imagenes/cancion17.jpg", urlSong: "./canciones/cancion17.mp3" }),
    new Song({ id: "18", nombre: "cancion 18", artista: "artista 18", anio: "año 18", duracion: "duracion 18", genero: "genero 18", cover: "./imagenes/cancion18.jpg", urlSong: "./canciones/cancion18.mp3" }),
    new Song({ id: "19", nombre: "cancion 19", artista: "artista 19", anio: "año 19", duracion: "duracion 19", genero: "genero 19", cover: "./imagenes/cancion19.jpg", urlSong: "./canciones/cancion19.mp3" }),
    new Song({ id: "20", nombre: "cancion 20", artista: "artista 20", anio: "año 20", duracion: "duracion 20", genero: "genero 20", cover: "./imagenes/cancion20.jpg", urlSong: "./canciones/cancion20.mp3" }),
    new Song({ id: "21", nombre: "cancion 21", artista: "artista 21", anio: "año 21", duracion: "duracion 21", genero: "genero 21", cover: "./imagenes/cancion21.jpg", urlSong: "./canciones/cancion21.mp3" }),
    new Song({ id: "22", nombre: "cancion 22", artista: "artista 22", anio: "año 22", duracion: "duracion 22", genero: "genero 22", cover: "./imagenes/cancion22.jpg", urlSong: "./canciones/cancion22.mp3" }),
    new Song({ id: "23", nombre: "cancion 23", artista: "artista 23", anio: "año 23", duracion: "duracion 23", genero: "genero 23", cover: "./imagenes/cancion23.jpg", urlSong: "./canciones/cancion23.mp3" }),
    new Song({ id: "24", nombre: "cancion 24", artista: "artista 24", anio: "año 24", duracion: "duracion 24", genero: "genero 24", cover: "./imagenes/cancion24.jpg", urlSong: "./canciones/cancion24.mp3" }),
    new Song({ id: "25", nombre: "cancion 25", artista: "artista 25", anio: "año 25", duracion: "duracion 25", genero: "genero 25", cover: "./imagenes/cancion25.jpg", urlSong: "./canciones/cancion25.mp3" }),
    new Song({ id: "26", nombre: "cancion 26", artista: "artista 26", anio: "año 26", duracion: "duracion 26", genero: "genero 26", cover: "./imagenes/cancion26.jpg", urlSong: "./canciones/cancion26.mp3" }),
    new Song({ id: "27", nombre: "cancion 27", artista: "artista 27", anio: "año 27", duracion: "duracion 27", genero: "genero 27", cover: "./imagenes/cancion27.jpg", urlSong: "./canciones/cancion27.mp3" }),
    new Song({ id: "28", nombre: "cancion 28", artista: "artista 28", anio: "año 28", duracion: "duracion 28", genero: "genero 28", cover: "./imagenes/cancion28.jpg", urlSong: "./canciones/cancion28.mp3" }),
    new Song({ id: "29", nombre: "cancion 29", artista: "artista 29", anio: "año 29", duracion: "duracion 29", genero: "genero 29", cover: "./imagenes/cancion29.jpg", urlSong: "./canciones/cancion29.mp3" }),
    new Song({ id: "30", nombre: "cancion 30", artista: "artista 30", anio: "año 30", duracion: "duracion 30", genero: "genero 30", cover: "./imagenes/cancion30.jpg", urlSong: "./canciones/cancion30.mp3" }),
];

// Variable para mantener una referencia a la canción que se está reproduciendo actualmente
var currentAudio = new Audio();

// Crear una instancia de Playlist y agregar canciones
const playlist = new Playlist("resultados");
songs.forEach(song => playlist.addSong(song));

// Obtener una referencia al contenedor donde queremos mostrar las canciones
const resultadosContainer = document.getElementById("resultados");

// Iterar sobre las canciones en la playlist y agregarlas al contenedor
playlist.songs.forEach(song => {
    // Crear un elemento <li> para representar la canción
    const songElement = document.createElement("li");

    // Crear un elemento <span> para el nombre de la canción
    const songNameSpan = document.createElement("span");
    songNameSpan.textContent = `${song.nombre}`;

    // 1. BOTÓN DE REPRODUCCIÓN   
    // Crear botón de reproducción
    const playBtn = document.createElement("button");
    playBtn.classList.add("fa-solid", "fa-play");
    playBtn.addEventListener("click", async function() {
        reproducirCancion(song);      
        });

    // 2. BOTÓN DE FAVORITO (CORAZÓN) y su comportamiento en MIS FAVORITOS
    // Obtener referencia al contenedor "myplaylist"
    const myPlaylistContainer = document.querySelector('#myplaylist');

    // Variable para rastrear si la canción ya ha sido agregada
    let isSongAdded = false;

    // Crear botón de corazón favorito
    const favselBtn = document.createElement("button");
    favselBtn.classList.add("fa-solid", "fa-heart");

    // Escuchar el evento de clic en el botón de corazón favorito
    favselBtn.addEventListener("click", function () {
        // Verificar si la canción ya ha sido agregada
        if (!isSongAdded) {
            // Clonar la canción seleccionada
            const clonedSong = this.parentElement.cloneNode(true);

            // Eliminar botones de la copia
            clonedSong.querySelector('.fa-solid.fa-plus').remove();
            clonedSong.querySelector('.fa-solid.fa-play').remove();
            clonedSong.querySelector('.fa-solid.fa-heart').remove();

            // Reproduccion
            const playBtn = createPlayBtn(song);
            clonedSong.appendChild(playBtn);
            playBtn.addEventListener("click", async function() {
                reproducirCancion(song);                
            });

            // Eliminar de la lista y limpiar contenedor
            const trashBtn = document.createElement("button");
            trashBtn.classList.add("fa-solid", "fa-trash");
            trashBtn.addEventListener("click", function() {
                stopSong(clonedSong);
                isSongAdded = false;
            });

            // Agregar el botón de eliminar a la copia
            clonedSong.appendChild(trashBtn);

            // Agregar el elemento clonado al contenedor "myplaylist"
            myPlaylistContainer.appendChild(clonedSong);

            // Actualizar el estado de la canción agregada
            isSongAdded = true;
        }
    });

    // 3.BOTÓN DE AGREGAR (SUMA)
    // Obtener referencia al contenedor "favoritos"
    const favoritosContainer = document.querySelector('#favoritos');

    // Variable para rastrear si la canción ya ha sido agregada a favoritos
    let isSongAddedToFavorites = false;

    // Crear botón de añadir a la lista de reproducción
    const addBtn = document.createElement("button");
    addBtn.classList.add("fa-solid", "fa-plus");
    addBtn.addEventListener("click", function () {
        // Verificar si la canción ya ha sido agregada a favoritos
        if (!isSongAddedToFavorites) {
            // Clonar la canción seleccionada
            const clonedSong = this.parentElement.cloneNode(true);

            // Reproduccion
            const playBtn = createPlayBtn(song);
            clonedSong.appendChild(playBtn);
            playBtn.addEventListener("click", async function() {
                reproducirCancion(song);
            });

            // Eliminar botones de la copia
            clonedSong.querySelector('.fa-solid.fa-heart').remove();
            clonedSong.querySelector('.fa-solid.fa-plus').remove();
            clonedSong.querySelector('.fa-solid.fa-play').remove();

            // Eliminar de la lista y limpiar contenedor
            const trashBtn = document.createElement("button");
            trashBtn.classList.add("fa-solid", "fa-trash");
            trashBtn.addEventListener("click", function() {
                stopSong(clonedSong);
                isSongAddedToFavorites = false;
            });

            // Agregar el botón de eliminar a la copia
            clonedSong.appendChild(trashBtn);

            // Agregar el elemento clonado al contenedor "favoritos"
            favoritosContainer.appendChild(clonedSong);

            // Actualizar el estado de la canción agregada a favoritos
            isSongAddedToFavorites = true;
        }
    });


    // Agregar el nombre de la canción y los botones al elemento <li>
    songElement.appendChild(songNameSpan);
    songElement.appendChild(playBtn);
    songElement.appendChild(favselBtn);
    songElement.appendChild(addBtn);

    // Agregar el elemento <li> al contenedor
    resultadosContainer.appendChild(songElement);
});

// Crear una instancia de Reproduccion con la playlist
const reproductor = new Reproduccion(playlist);

/* END: CLASES*/


/* START: BUSCADOR*/
// Obtener referencia al botón de búsqueda
const boton = document.getElementById('buttom_search');

// Agregar evento click al botón de búsqueda
boton.addEventListener('click', function () {
    // Obtener el valor del input de búsqueda
    const valor = input.value.trim().toLowerCase();

    // Filtrar las canciones que coincidan con el valor de búsqueda
    const cancionesFiltradas = playlist.songs.filter(song => song.nombre.toLowerCase().includes(valor));

    // Limpiar el contenedor de resultados
    resultadosContainer.innerHTML = '';

    // Iterar sobre las canciones filtradas
    cancionesFiltradas.forEach(song => {
        // Crear un elemento <li> para representar la canción
        const songElement = document.createElement("li");

        // Crear un elemento <span> para el nombre de la canción
        const songNameSpan = document.createElement("span");
        songNameSpan.textContent = `${song.nombre}`;

        // Agregar el elemento <span> al elemento <li>
        songElement.appendChild(songNameSpan);

        // Seleccionar los botones relevantes de la canción
        const playBtn = createPlayBtn(song);
        clonedSong.appendChild(playBtn);
        playBtn.addEventListener("click", async function() {
            reproducirCancion(song);
        });

        // Obtener referencia al contenedor "myplaylist"
        const myPlaylistContainer = document.querySelector('#myplaylist');

        // Variable para rastrear si la canción ya ha sido agregada
        let isSongAdded = false;

        const favselBtn = document.createElement("button");
        favselBtn.classList.add("fa-solid", "fa-heart");
        favselBtn.addEventListener("click", function () {
            // Verificar si la canción ya ha sido agregada
            if (!isSongAdded) {
                // Clonar la canción seleccionada
                const clonedSong = this.parentElement.cloneNode(true);

                // Eliminar el botón de agregar de la copia
                clonedSong.querySelector('.fa-solid.fa-plus').remove();

                // Crear el botón de eliminar
                const trashBtn = document.createElement("button");
                trashBtn.classList.add("fa-solid", "fa-trash");

                // Escuchar el evento de clic en el botón de eliminar
                trashBtn.addEventListener("click", function () {
                    // Eliminar la canción del contenedor "myplaylist"
                    this.parentElement.remove();
                    // Actualizar el estado de la canción agregada
                    isSongAdded = false;
                });

                // Agregar el botón de eliminar a la copia
                clonedSong.appendChild(trashBtn);

                // Agregar el elemento clonado al contenedor "myplaylist"
                myPlaylistContainer.appendChild(clonedSong);

                // Actualizar el estado de la canción agregada
                isSongAdded = true;
            }
        });

        const addBtn = document.createElement("button");
        addBtn.classList.add("fa-solid", "fa-plus");
        addBtn.addEventListener("click", function () {
            PlusButton.addToFavorites(songElement);
        });

        // Agregar los botones al elemento <li>
        songElement.appendChild(playBtn);
        songElement.appendChild(favselBtn);
        songElement.appendChild(addBtn);

        // Agregar el elemento <li> al contenedor
        resultadosContainer.appendChild(songElement);
    });

    // Si no se encontraron canciones
    if (cancionesFiltradas.length === 0) {
        resultadosContainer.innerHTML = '<li>No se encontraron coincidencias.</li>';
    }
});
/* END: BUSCADOR*/

/* START: BOTONES DE REPRODUCCIÓN (en portada / contenedor2) */
songs.currentTime = 245
const input = document.getElementById('input')
const search = document.getElementById('search')
const prevBtn = document.getElementById('antes-btn')
const playBtn = document.getElementById('play-btn1')
const nextBtn = document.getElementById('adel-btn')
const stopBtn = document.getElementById('stop-btn')
const muteBtn = document.getElementById('mute-btn')
const loudBtn = document.getElementById('loud-btn')

songs.volume = 0.1; // Ajustar el volumen de las canciones
const audio = document.getElementById('audioPlayer'); // Obtener referencia al elemento de audio
const imagechange = document.getElementById('imagechange'); // Obtener referencia a la imagen de la portada

let currentSongIndex = 0; // Índice de la canción actual
// Función para reproducir la canción actual
function playCurrentSong() {
    const song = songs[currentSongIndex];
    audio.src = song.urlSong; // Establecer la URL de la canción en el elemento de audio
    imagechange.src = song.cover; // Cambiar la imagen de la portada
    audio.play(); // Reproducir la canción
    const songDetails = document.querySelector('.info');
    const detailsHTML = `
        <p>Nombre: ${song.nombre}</p>
        <p>Artista: ${song.artista}</p>
        <p>Anio: ${song.anio}</p>
        <p>Duracion: ${song.duracion}</p>
        <p>Género: ${song.genero}</p>`;
    songDetails.innerHTML = detailsHTML;
}


// Función para reproducir la siguiente canción
function playNextSong() {
    if (currentSongIndex < songs.length) {
        currentSongIndex++; // Incrementar el índice de la canción
        playCurrentSong(); // Reproducir la canción actual
    }
}

// Evento de clic en el botón de reproducción
playBtn.addEventListener('click', function () {
    playCurrentSong(); // Reproducir la canción actual
});

// Evento "ended" del elemento de audio para reproducir la siguiente canción cuando una canción termine
audio.addEventListener('ended', function () {
    playNextSong(); // Reproducir la siguiente canción
});

nextBtn.addEventListener('click', function () {
    playNextSong(); // Reproducir la siguiente canción
});

stopBtn.addEventListener('click', function () {
    audio.pause(); // Pausar la reproducción de la canción actual
    // No reiniciar currentSongIndex aquí
});


let isMuted = false; // Variable para rastrear el estado de silencio
muteBtn.addEventListener('click', function () {
    audio.volume = 0; // Establecer el volumen en 0 para silenciar la canción
});

// Evento de clic en el botón de restaurar volumen
loudBtn.addEventListener('click', function () {
    audio.volume = 1; // Restaurar el volumen al valor original (1) para reanudar la reproducción
});

function loadMusic(index) {
    const song = songs[index];
    audio.src = song.urlSong; // Establecer la URL de la canción en el elemento de audio
    imagechange.src = song.cover; // Cambiar la imagen de la portada
}
function playMusic() {
    audio.play(); // Reproduce la canción actual
}

function playingSong() {
    const currentSong = songs[currentSongIndex];
    console.log(`Reproduciendo: ${currentSong.nombre} - ${currentSong.artista}`);
}

function prevMusic() {
    // Decrementar el índice de la canción
    currentSongIndex--;

    // Si el índice es menor que 0, establecerlo al índice de la última canción
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    // Cargar y reproducir la canción anterior
    loadMusic(currentSongIndex);
    playMusic();
    playingSong();
    playCurrentSong(); 
}

prevBtn.addEventListener("click", prevMusic);
/* funcion para mostrar datos de la cancion actual/*/

const songDetails = document.querySelector('.info');

// Función para mostrar los detalles de la canción actual
function showSongDetails() {
    const currentSong = songs[currentSongIndex];
    const detailsHTML = `
        <p>Nombre: ${currentSong.nombre}</p>
        <p>Artista: ${currentSong.artista}</p>
        <p>Anio: ${currentSong.anio}</p>
        <p>Duracion: ${currentSong.duracion}</p>
        <p>Genero: ${currentSong.genero}</p>
    `;
    songDetails.innerHTML = detailsHTML;
}

// Llama a la función para mostrar los detalles de la canción al cargar la página
showSongDetails();

// Actualiza los detalles de la canción cada vez que cambie la canción
function updateSongDetails() {
    const currentSong = songs[currentSongIndex];
    songDetails.innerHTML = `
        <p>Nombre: ${currentSong.nombre}</p>
        <p>Artista: ${currentSong.artista}</p>
        <p>Anio: ${currentSong.anio}</p>
        <p>Duracion: ${currentSong.duracion}</p>
        <p>Genero: ${currentSong.genero}</p>`;
}

// Actualiza los detalles de la canción cada vez que cambie la canción
audio.addEventListener('ended', function () {
    playNextSong(); // Reproduce la siguiente canción
    updateSongDetails(); // Actualiza los detalles de la canción
});

// Evento de clic en el botón de reproducción
playBtn.addEventListener('click', function () {
    playCurrentSong(); // Reproduce la canción actual
    updateSongDetails(); // Actualiza los detalles de la canción
});
window.addEventListener('load', function() {
    loadMusic(0); // Cargar la primera canción al cargar la página
});
/* END: BOTONES DE REPRODUCCIÓN (en portada / contenedor2) */
