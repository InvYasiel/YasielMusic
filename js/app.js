var mediaJson = [{
        id: 0,
        title: 'Soy Tu Heroe',
        path: 'Soy-Tu-Heroe',
        type: 'music',
        caratula: 'caratula.jpg'
    },
    {
        id: 1,
        title: 'Besos En Guerra',
        path: 'Besos-En-Guerra',
        type: 'music',
        caratula: 'Moratb.jpg'
    },
    {
        id: 2,
        title: 'Dejame',
        path: 'Dejame',
        type: 'music',
        caratula: 'dejame.jpg'
    },
    {
        id: 3,
        title: 'Gente De Zona  Bailame',
        path: 'Gente-de-Zona-Bailame',
        type: 'music',
        caratula: 'Frontal.jpg'
    },
    {
        id: 4,
        title: 'Morat Yo Contigo Tu Conmigo',
        path: 'Morat-Yo-Contigo-Tu-Conmigo',
        type: 'music',
        caratula: 'Morat.jpg'
    },
    {
        id: 5,
        title: 'Video Risas',
        path: 'video',
        type: 'video',
        caratula: 'video.mp4'
    },
    {
        id: 6,
        title: 'Video Tutorial',
        path: 'videotutorial',
        type: 'video',
        caratula: 'videotutorial.mp4'
    },//Maluma  Corazon .mp3
    {
        id: 7,
        title: 'Maluma  Corazon ',
        path: 'Maluma  Corazon ',
        type: 'music',
        caratula: 'maluma.jpg'
    },//BERET NUNCA
    {
        id: 8,
        title: 'BERET NUNCA',
        path: 'BERET NUNCA',
        type: 'music',
        caratula: 'beret.jpg'
    },//BERET NUNCA

]

var videoArray = []
loadPlayList();

function loadPlayList() {

    var contLista = document.getElementsByClassName('contenedor-canciones')[0];
    for (let i = 0; i < mediaJson.length; i++) {
        var cancion = document.createElement('div');
        cancion.setAttribute('class', 'cancion')
        cancion.setAttribute('id', mediaJson[i].id)
        // cancion.setAttribute('onclick','reproducir(this.id)')

        var tituloCancion = document.createElement('titulo');
        tituloCancion.setAttribute('class', 'titulo')
        tituloCancion.innerHTML = mediaJson[i].title;

        var iconito = document.createElement('i')
        iconito.setAttribute('class', 'icono-cancion fas fa-music isNotPlaying');
        iconito.setAttribute('id', mediaJson[i].id)

        tituloCancion.appendChild(iconito)

        cancion.addEventListener('click', () => {
            mostrarReproduccionActual(mediaJson[i].id);
            reproducirMedia(mediaJson[i].id);
            rep.play();
            rangeValume.style = 'display:block;'
            volmin.style = 'diplay:block;  margin-top:140px;'
            // Reproducir
        }, false)

        cancion.appendChild(tituloCancion);
        contLista.appendChild(cancion);
    }
}


function mostrarReproduccionActual(i) {
    // Mostrar icono de reproduccion
    var iconos = document.querySelectorAll(".icono-cancion");

    iconos.forEach(element => {
        if (element.id == i) {
            element.setAttribute("class", "icono-cancion fas fa-music isPlaying")
        } else {
            element.setAttribute("class", "icono-cancion fas fa-music isNotPlaying")
        }
    });

}
// Agregar la etiqueta video/media/audio al HTML
var rep = document.getElementById('reproducir');

function reproducirMedia(i) {

    path = '';
    caratula = '';
    type = '';
    mediaJson.forEach(element => {
        if (element.id == i) {
            path = element.path;
            caratula = element.caratula;
            type = element.type;
        }
    });

    if (type == 'video') {

            rep.setAttribute('src', 'resources/video/' + path + '.mp4');
        
        
    } else {
        rep.setAttribute('src', 'resources/music/' + path + '.mp3');
        rep.setAttribute('poster', 'resources/img/' + caratula);
    }

    rep.setAttribute('data-media', i);

}

function anterior() {

    var currentId = parseInt(rep.getAttribute("data-media"));

    if (currentId - 1 < 0) {
        mostrarReproduccionActual(mediaJson.length - 1);
        reproducirMedia(mediaJson.length - 1);
    } else {
        mostrarReproduccionActual(currentId - 1);
        reproducirMedia(currentId - 1);
    }   

    rep.play();
}

function retroceder() {

    rep.currentTime -= 10;
}

function play() {
    if(rep.getAttribute('src')==null){
        reproducirMedia(0);
        mostrarReproduccionActual(0)
    }   
    rep.play();
    rangeValume.style = 'display:block;'
    volmin.style = 'diplay:block;  margin-top:140px;'
}

function pause() {
    rep.pause();
}

function adelantar() {
    rep.currentTime += 10;
}

function siguiente() {
    var currentId = parseInt(rep.getAttribute("data-media"));

    if (currentId + 1 >= mediaJson.length) {
        mostrarReproduccionActual(0);
        reproducirMedia(0);
    } else {

        mostrarReproduccionActual(currentId + 1);
        reproducirMedia(currentId + 1);
    }

    rep.play();

}
rep.addEventListener('ended', function(){
    var currentId = parseInt(rep.getAttribute("data-media"));

    if (currentId + 1 >= mediaJson.length) {
        mostrarReproduccionActual(0);
        reproducirMedia(0);
    } else {

        mostrarReproduccionActual(currentId + 1);
        reproducirMedia(currentId + 1);
    }
    rep.load();
    rep.play();
}, false)
// function volmas() {
//     if (rep.volume < 1.0) {
//         rep.volume += 0.1
//     }
// }

// function volmenos() {
//     if (rep.volume >= 0.1) {
//         rep.volume -= 0.1
//     }

// }
rep.volume = 0.5;
volmin.style = 'display:none';
rangeValume = document.getElementById('rangeValume');
rangeValume.style = 'display:none'
rangeValume.addEventListener('change', function(){
    
rep.volume = rangeValume.value / 100;
var volmax = document.getElementById('volmax');
var volmin = document.getElementById('volmin');
var volnone = document.getElementById('volnone');
if(rep.volume > 0.7){
    volmax.style = 'display:block; margin-top:140px;';
    volmin.style = 'display:none';
volnone.style = 'display:none';
}else if(rep.volume < 0.2){
    volmin.style = 'display:block; margin-top:140px;';
    volmax.style = 'display:none'
volnone.style = 'display:none'
}else{
    volnone.style = 'display:block; margin-top:140px;';
    volmax.style = 'display:none';
volmin.style = 'display:none';
}
}, false)
