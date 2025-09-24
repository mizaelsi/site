// A sua lista de fotos. Mude os caminhos para as suas imagens.
const fotos = [
    './fotos/img1.jpeg',
    './fotos/img2.jpeg',
    './fotos/img3.jpeg',
    // Adicione mais caminhos de fotos aqui!
];

// A sua lista de músicas. Mude os caminhos para os seus arquivos de áudio e os títulos.
const musicas = [
    { src: './musica/Mica.m4a', title: 'MICA FALANDO' },
    { src: './musica/Aliança.mp3', title: 'Música Especial' },
    { src: './musica/Partilhar.mp3', title: 'Trilha Sonora' },
    { src: './musica/Sequência da Botação.mp3', title: 'Trilha Sonora' },
    // Adicione mais músicas aqui!
];

let indiceFotoAtual = 0;
let musicaAtual = 0;
let isPlaying = false;

// Referências para os elementos HTML das fotos
const leftPhoto = document.getElementById('left-photo');
const centerPhoto = document.getElementById('center-photo');
const rightPhoto = document.getElementById('right-photo');

// Referências para os elementos HTML da música
const audioPlayer = document.getElementById('player');
const playPauseBtn = document.getElementById('play-pause');
const prevSongBtn = document.getElementById('prev-song');
const nextSongBtn = document.getElementById('next-song');
const songTitle = document.getElementById('song-title');

// Função para atualizar as fotos no palco
function updatePhotos() {
    const totalFotos = fotos.length;
    const indiceEsquerda = (indiceFotoAtual - 1 + totalFotos) % totalFotos;
    const indiceDireita = (indiceFotoAtual + 1) % totalFotos;

    leftPhoto.style.backgroundImage = `url('${fotos[indiceEsquerda]}')`;
    centerPhoto.style.backgroundImage = `url('${fotos[indiceFotoAtual]}')`;
    rightPhoto.style.backgroundImage = `url('${fotos[indiceDireita]}')`;
}

// Funções para o player de música
function loadMusic(index) {
    audioPlayer.src = musicas[index].src;
    songTitle.textContent = musicas[index].title;
    audioPlayer.load(); // Recarrega o player com a nova música
    if (isPlaying) {
        audioPlayer.play();
    }
}

function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        isPlaying = true;
    } else {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
    }
}

// Escutadores de eventos para as fotos
leftPhoto.addEventListener('click', () => {
    indiceFotoAtual = (indiceFotoAtual - 1 + fotos.length) % fotos.length;
    updatePhotos();
});

rightPhoto.addEventListener('click', () => {
    indiceFotoAtual = (indiceFotoAtual + 1) % fotos.length;
    updatePhotos();
});

// Escutadores de eventos para os botões do player
playPauseBtn.addEventListener('click', togglePlayPause);

prevSongBtn.addEventListener('click', () => {
    musicaAtual = (musicaAtual - 1 + musicas.length) % musicas.length;
    loadMusic(musicaAtual);
});

nextSongBtn.addEventListener('click', () => {
    musicaAtual = (musicaAtual + 1) % musicas.length;
    loadMusic(musicaAtual);
});

audioPlayer.addEventListener('ended', () => {
    nextSongBtn.click(); // Passa para a próxima música automaticamente
});

// Inicia o site ao carregar
window.onload = () => {
    updatePhotos();
    loadMusic(musicaAtual);
};