// ===== SwipeTune - Lógica do Aplicativo com API de Músicas Reais (iTunes API) =====

// Músicas iniciais reais de fallback
let musicas = [
    {
        id: 101,
        titulo: 'Blinding Lights',
        artista: 'The Weeknd',
        genero: 'Pop',
        emoji: '✨',
        capa: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bf/25/74/bf25740a-9d62-f947-f7cb-b4618e772477/20UMGIM01416.rgb.jpg/300x300bb.jpg',
        audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a4/4f/73/a44f7380-4999-7c85-2313-cfd076d7fcfb/mzaf_16480572565679462534.plus.aac.p.m4a'
    },
    {
        id: 102,
        titulo: 'Shape of You',
        artista: 'Ed Sheeran',
        genero: 'Pop',
        emoji: '🎸',
        capa: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/eb/05/cf/eb05cf2f-ea62-b7e1-80f4-521191d84fae/190295851286.jpg/300x300bb.jpg',
        audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/0d/bb/00/0dbb00ef-d913-7905-eb3f-ec0a69a9b703/mzaf_10255395899478423270.plus.aac.p.m4a'
    },
    {
        id: 103,
        titulo: 'As It Was',
        artista: 'Harry Styles',
        genero: 'Pop',
        emoji: '🎵',
        capa: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/58/b0/eb/58b0eb10-e5aa-1875-9eef-41fa904a0e98/886449942767.jpg/300x300bb.jpg',
        audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/b4/eb/65/b4eb651c-eb17-d2a8-14bb-24c6bf3d2b27/mzaf_14920256860010839845.plus.aac.p.m4a'
    },
    {
        id: 104,
        titulo: 'Evidências',
        artista: 'Chitãozinho & Xororó',
        genero: 'Sertanejo',
        emoji: '🌾',
        capa: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5c/b1/7b/5cb17b5f-561a-05fa-4c7a-8f8319f39df7/00731451000624.rgb.jpg/300x300bb.jpg',
        audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/28/7f/db/287fdb2a-ea91-e406-8d19-d830b5528e18/mzaf_7306283133604085427.plus.aac.p.m4a'
    },
    {
        id: 105,
        titulo: 'Bohemian Rhapsody',
        artista: 'Queen',
        genero: 'Rock',
        emoji: '🎸',
        capa: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/cd/72/7b/cd727b1f-7e04-d2e8-d14a-58f01b1a8d07/00602547072049.rgb.jpg/300x300bb.jpg',
        audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/80/7e/17/807e17cd-77ec-547e-897b-99d9b62646d4/mzaf_1570776517172081198.plus.aac.p.m4a'
    }
];

// ===== Estado do aplicativo =====
let estado = {
    musicaAtual: null,
    indiceAtual: 0,
    filaMusicas: [],
    historico: [],
    curtidas: 0,
    bloqueadas: 0,
    favoritas: [],
    bloqueadasLista: [],
    nomeUsuario: 'Visitante',
    pesquisando: false
};

// ===== Elementos DOM =====
const elementos = {
    musicCard: document.getElementById('musicCard'),
    cardCover: document.getElementById('cardCover'),
    vinylDisc: document.getElementById('vinylDisc'),
    vinylLabel: document.getElementById('vinylLabel'),
    coverImg: document.getElementById('coverImg'),
    coverEmoji: document.getElementById('coverEmoji'),
    cardBadge: document.getElementById('cardBadge'),
    musicTitle: document.getElementById('musicTitle'),
    musicArtist: document.getElementById('musicArtist'),
    musicGenre: document.getElementById('musicGenre'),
    progressContainer: document.getElementById('progressContainer'),
    progressBar: document.getElementById('progressBar'),
    currentTime: document.getElementById('currentTime'),
    totalTime: document.getElementById('totalTime'),
    audioPlayer: document.getElementById('audioPlayer'),
    btnLike: document.getElementById('btnLike'),
    btnDislike: document.getElementById('btnDislike'),
    btnSave: document.getElementById('btnSave'),
    btnBlock: document.getElementById('btnBlock'),
    btnBack: document.getElementById('btnBack'),
    btnPlayPause: document.getElementById('btnPlayPause'),
    playPauseIcon: document.getElementById('playPauseIcon'),
    btnSkip: document.getElementById('btnSkip'),
    countLikes: document.getElementById('countLikes'),
    countBlocks: document.getElementById('countBlocks'),
    searchInput: document.getElementById('searchInput'),
    searchClear: document.getElementById('searchClear'),
    favoritesList: document.getElementById('favoritesList'),
    blockedList: document.getElementById('blockedList'),
    tabs: document.querySelectorAll('.tab'),
    tabContents: document.querySelectorAll('.tab-content'),
    btnConfig: document.getElementById('btnConfig'),
    configModal: document.getElementById('configModal'),
    modalClose: document.getElementById('modalClose'),
    userNameInput: document.getElementById('userNameInput'),
    saveNameBtn: document.getElementById('saveNameBtn'),
    userNameDisplay: document.getElementById('userNameDisplay'),
    userProfile: document.getElementById('userProfile'),
    toast: document.getElementById('toast')
};

// Mapeamento de emojis por gênero
function getEmojiPorGenero(genero) {
    if (!genero) return '🎵';
    const g = genero.toLowerCase();
    if (g.includes('rock')) return '🎸';
    if (g.includes('pop')) return '✨';
    if (g.includes('sertanejo') || g.includes('country')) return '🌾';
    if (g.includes('dance') || g.includes('electronic')) return '🎧';
    if (g.includes('hip-hop') || g.includes('rap')) return '🎤';
    if (g.includes('latin') || g.includes('samba') || g.includes('mpb')) return '🎷';
    return '🎵';
}

// ===== API DE MÚSICAS REAIS (iTunes Search API) =====
async function buscarMusicasReaisAPI(termo, limit = 25) {
    try {
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(termo)}&entity=song&limit=${limit}&country=BR`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            return data.results
                .filter(item => item.previewUrl)
                .map((item, idx) => ({
                    id: item.trackId || (Date.now() + idx),
                    titulo: item.trackName,
                    artista: item.artistName,
                    genero: item.primaryGenreName || 'Música Real',
                    emoji: getEmojiPorGenero(item.primaryGenreName),
                    capa: item.artworkUrl100 ? item.artworkUrl100.replace('100x100bb', '300x300bb') : '',
                    audio: item.previewUrl
                }));
        }
    } catch (e) {
        console.log('Erro ao buscar músicas reais da API iTunes:', e);
    }
    return [];
}

// Carregar catálogo de músicas reais ao iniciar
async function carregarMusicasIniciais() {
    mostrarToast('🚀 Carregando músicas reais...');
    const termos = ['top brasil', 'pop hits 2024', 'sertanejo', 'rock classics'];
    const termoSorteado = termos[Math.floor(Math.random() * termos.length)];
    
    const reais = await buscarMusicasReaisAPI(termoSorteado, 30);
    if (reais.length > 0) {
        musicas = reais;
        criarFilaMusicas();
        mostrarMusica();
        mostrarToast('🎵 Músicas reais carregadas!');
    }
}

// ===== Inicialização =====
function iniciar() {
    carregarEstadoSalvo();
    criarFilaMusicas();
    mostrarMusica();
    configurarEventos();
    atualizarContadores();
    atualizarNomeUsuario();
    atualizarListas();

    carregarMusicasIniciais();
}

// ===== Carregar estado salvo =====
function carregarEstadoSalvo() {
    try {
        const salvo = localStorage.getItem('swipetune_estado');
        if (salvo) {
            const dados = JSON.parse(salvo);
            estado.curtidas = dados.curtidas || 0;
            estado.bloqueadas = dados.bloqueadas || 0;
            estado.favoritas = dados.favoritas || [];
            estado.bloqueadasLista = dados.bloqueadasLista || [];
            estado.nomeUsuario = dados.nomeUsuario || 'Visitante';
        }
    } catch (e) {
        console.log('Erro ao carregar estado:', e);
    }
}

// ===== Salvar estado =====
function salvarEstado() {
    try {
        localStorage.setItem('swipetune_estado', JSON.stringify({
            curtidas: estado.curtidas,
            bloqueadas: estado.bloqueadas,
            favoritas: estado.favoritas,
            bloqueadasLista: estado.bloqueadasLista,
            nomeUsuario: estado.nomeUsuario
        }));
    } catch (e) {
        console.log('Erro ao salvar estado:', e);
    }
}

// ===== Criar fila de músicas =====
function criarFilaMusicas() {
    const disponiveis = musicas.filter(m => !estado.bloqueadasLista.includes(m.id));
    if (disponiveis.length === 0) {
        estado.filaMusicas = [...musicas];
    } else {
        estado.filaMusicas = [...disponiveis].sort(() => Math.random() - 0.5);
    }
    estado.indiceAtual = 0;
}

// ===== Mostrar música atual =====
function mostrarMusica() {
    if (estado.filaMusicas.length === 0) {
        criarFilaMusicas();
    }

    if (estado.indiceAtual >= estado.filaMusicas.length) {
        estado.indiceAtual = 0;
    }

    const musica = estado.filaMusicas[estado.indiceAtual];
    estado.musicaAtual = musica;

    elementos.musicTitle.textContent = musica.titulo;
    elementos.musicArtist.textContent = musica.artista;
    elementos.musicGenre.textContent = musica.emoji + ' ' + musica.genero;
    
    if (musica.capa) {
        elementos.coverImg.src = musica.capa;
        elementos.coverImg.style.display = 'block';
        elementos.coverEmoji.style.display = 'none';
    } else {
        elementos.coverImg.style.display = 'none';
        elementos.coverEmoji.style.display = 'block';
        elementos.coverEmoji.textContent = musica.emoji || '🎵';
    }

    atualizarBotoesEstado();

    elementos.musicCard.classList.remove('swiping');
    elementos.musicCard.style.transform = '';
    elementos.musicCard.style.opacity = '1';
    elementos.cardBadge.className = 'card-badge';

    if (estado.historico.length === 0 || estado.historico[estado.historico.length - 1].id !== musica.id) {
        estado.historico.push(musica);
        if (estado.historico.length > 20) {
            estado.historico.shift();
        }
    }

    tocarMusica(musica);
}

// ===== Alternar Reprodução / Pausa =====
function togglePlayPause() {
    const audio = elementos.audioPlayer;
    if (!audio.src) return;

    if (audio.paused) {
        audio.play().then(() => {
            elementos.vinylDisc.classList.remove('paused');
            if (elementos.playPauseIcon) elementos.playPauseIcon.textContent = '⏸️';
            mostrarToast('▶️ Reproduzindo');
        }).catch(e => console.log('Interação do usuário necessária:', e));
    } else {
        audio.pause();
        elementos.vinylDisc.classList.add('paused');
        if (elementos.playPauseIcon) elementos.playPauseIcon.textContent = '▶️';
        mostrarToast('⏸️ Pausado');
    }
}

// ===== Atualizar estados ativos dos botões =====
function atualizarBotoesEstado() {
    if (!estado.musicaAtual) return;
    const isFav = estado.favoritas.some(f => f.id === estado.musicaAtual.id);
    const isBlocked = estado.bloqueadasLista.includes(estado.musicaAtual.id);

    if (elementos.btnSave) {
        elementos.btnSave.classList.toggle('active', isFav);
    }
    if (elementos.btnBlock) {
        elementos.btnBlock.classList.toggle('active', isBlocked);
    }
}

// ===== Tocar música =====
function tocarMusica(musica) {
    elementos.audioPlayer.src = musica.audio;
    elementos.audioPlayer.play().then(() => {
        elementos.vinylDisc.classList.remove('paused');
        if (elementos.playPauseIcon) elementos.playPauseIcon.textContent = '⏸️';
    }).catch(() => {
        console.log('Toque para reproduzir');
        elementos.vinylDisc.classList.add('paused');
        if (elementos.playPauseIcon) elementos.playPauseIcon.textContent = '▶️';
    });
}

// ===== Pausar disco =====
function pausarDisco() {
    elementos.vinylDisc.classList.add('paused');
    if (elementos.playPauseIcon) elementos.playPauseIcon.textContent = '▶️';
}

// ===== Próxima música =====
function proximaMusica() {
    estado.indiceAtual++;
    if (estado.indiceAtual >= estado.filaMusicas.length) {
        estado.indiceAtual = 0;
    }
    mostrarMusica();
}

// ===== Animar transição swipe =====
function animarSwipeUp() {
    elementos.musicCard.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
    elementos.musicCard.style.transform = 'translateY(-120px) rotate(-6deg)';
    elementos.musicCard.style.opacity = '0';
    setTimeout(() => {
        elementos.musicCard.style.transition = 'none';
        proximaMusica();
    }, 380);
}

// ===== Mostrar badge visual =====
function mostrarBadge(tipo, texto) {
    elementos.cardBadge.textContent = texto;
    elementos.cardBadge.className = 'card-badge show ' + tipo;
    setTimeout(() => {
        elementos.cardBadge.classList.remove('show');
    }, 1200);
}

// ===== AÇÕES DOS BOTÕES =====

// Like (Curtir)
function darLike() {
    if (!estado.musicaAtual) return;
    estado.curtidas++;
    elementos.btnLike.classList.add('active');
    setTimeout(() => elementos.btnLike.classList.remove('active'), 1000);
    
    mostrarBadge('like', '❤️ Curtiu!');
    mostrarToast('❤️ Você curtiu "' + estado.musicaAtual.titulo + '"!');
    atualizarContadores();
    salvarEstado();
    
    setTimeout(() => {
        animarSwipeUp();
    }, 500);
}

// Deslike (Não gostei)
function darDeslike() {
    if (!estado.musicaAtual) return;
    elementos.btnDislike.classList.add('active');
    setTimeout(() => elementos.btnDislike.classList.remove('active'), 1000);

    mostrarBadge('dislike', '👎 Não gostou');
    mostrarToast('👎 Você passou "' + estado.musicaAtual.titulo + '"');
    salvarEstado();

    setTimeout(() => {
        animarSwipeUp();
    }, 500);
}

// Salvar / Favoritar (Alternar)
function salvarMusica() {
    if (!estado.musicaAtual) return;
    const musica = estado.musicaAtual;
    const index = estado.favoritas.findIndex(f => f.id === musica.id);

    if (index >= 0) {
        estado.favoritas.splice(index, 1);
        mostrarBadge('save', '❌ Removida');
        mostrarToast('🗑️ "' + musica.titulo + '" removida das favoritas.');
    } else {
        estado.favoritas.push(musica);
        mostrarBadge('save', '⭐ Salva!');
        mostrarToast('⭐ "' + musica.titulo + '" salva nas favoritas!');
    }

    atualizarBotoesEstado();
    atualizarListas();
    salvarEstado();
}

// Bloquear música
function bloquearMusica() {
    if (!estado.musicaAtual) return;
    const musica = estado.musicaAtual;

    if (!estado.bloqueadasLista.includes(musica.id)) {
        estado.bloqueadasLista.push(musica.id);
        estado.bloqueadas++;
        mostrarBadge('block', '🚫 Bloqueada!');
        mostrarToast('🚫 "' + musica.titulo + '" não tocará mais!');
        atualizarContadores();
        atualizarListas();
        salvarEstado();
    }

    estado.filaMusicas = estado.filaMusicas.filter(m => m.id !== musica.id);
    if (estado.filaMusicas.length === 0) {
        criarFilaMusicas();
    }
    
    setTimeout(() => {
        animarSwipeUp();
    }, 500);
}

// Voltar faixa
function voltarMusica() {
    if (estado.historico.length < 2) {
        mostrarToast('⚠️ Nenhuma música anterior!');
        return;
    }

    estado.historico.pop();
    const musicaAnterior = estado.historico[estado.historico.length - 1];

    estado.filaMusicas = [musicaAnterior, ...estado.filaMusicas.filter(m => m.id !== musicaAnterior.id)];
    estado.indiceAtual = 0;
    mostrarMusica();
    mostrarToast('⏮️ Voltando para "' + musicaAnterior.titulo + '"');
}

// Pular música
function pularMusica() {
    if (!estado.musicaAtual) return;
    mostrarToast('⏭️ Próxima música...');
    animarSwipeUp();
}

// ===== Atualizar contadores =====
function atualizarContadores() {
    elementos.countLikes.textContent = estado.curtidas;
    elementos.countBlocks.textContent = estado.bloqueadas;
}

// ===== Atualizar listas =====
function atualizarListas() {
    atualizarFavoritas();
    atualizarBloqueadas();
}

// Atualizar lista de favoritas
function atualizarFavoritas() {
    if (estado.favoritas.length === 0) {
        elementos.favoritesList.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">⭐</span>
                <p class="empty-message">Nenhuma música salva ainda.<br>Toque em <b>⭐ Salvar</b> para guardar suas músicas favoritas!</p>
            </div>`;
        return;
    }

    elementos.favoritesList.innerHTML = '';
    estado.favoritas.forEach(musica => {
        const item = document.createElement('div');
        item.className = 'saved-item';
        const coverHtml = musica.capa 
            ? `<img src="${musica.capa}" alt="${musica.titulo}">`
            : `${musica.emoji || '🎵'}`;

        item.innerHTML = `
            <div class="saved-item-cover">${coverHtml}</div>
            <div class="saved-item-info">
                <div class="saved-item-title">${musica.titulo}</div>
                <div class="saved-item-artist">${musica.artista} • <small style="color:var(--text-muted)">${musica.genero}</small></div>
            </div>
            <div class="saved-item-actions">
                <button class="saved-item-btn" data-action="play" data-id="${musica.id}" title="Tocar">▶️</button>
                <button class="saved-item-btn" data-action="remove" data-id="${musica.id}" title="Remover">🗑️</button>
            </div>
        `;
        elementos.favoritesList.appendChild(item);
    });

    elementos.favoritesList.querySelectorAll('.saved-item-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const acao = btn.dataset.action;
            const id = parseInt(btn.dataset.id);
            if (acao === 'play') {
                tocarMusicaFavorita(id);
            } else if (acao === 'remove') {
                removerFavorita(id);
            }
        });
    });
}

// Atualizar lista de bloqueadas
function atualizarBloqueadas() {
    if (estado.bloqueadasLista.length === 0) {
        elementos.blockedList.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">🚫</span>
                <p class="empty-message">Nenhuma música bloqueada.<br>Toque em <b>🚫 Bloquear</b> para não ouvir mais uma música.</p>
            </div>`;
        return;
    }

    elementos.blockedList.innerHTML = '';
    estado.bloqueadasLista.forEach(id => {
        const musica = musicas.find(m => m.id === id) || { titulo: 'Música #' + id, artista: 'Bloqueada', emoji: '🚫' };
        const item = document.createElement('div');
        item.className = 'saved-item';
        const coverHtml = musica.capa 
            ? `<img src="${musica.capa}" alt="${musica.titulo}">`
            : `${musica.emoji || '🚫'}`;

        item.innerHTML = `
            <div class="saved-item-cover">${coverHtml}</div>
            <div class="saved-item-info">
                <div class="saved-item-title">${musica.titulo}</div>
                <div class="saved-item-artist">${musica.artista}</div>
            </div>
            <div class="saved-item-actions">
                <button class="saved-item-btn" data-action="unblock" data-id="${id}" title="Desbloquear">🔓</button>
            </div>
        `;
        elementos.blockedList.appendChild(item);
    });

    elementos.blockedList.querySelectorAll('.saved-item-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            desbloquearMusica(id);
        });
    });
}

// Tocar música favorita
function tocarMusicaFavorita(id) {
    const musica = estado.favoritas.find(m => m.id === id) || musicas.find(m => m.id === id);
    if (!musica) return;

    mudarAba('inicio');
    estado.filaMusicas = [musica, ...estado.filaMusicas.filter(m => m.id !== id)];
    estado.indiceAtual = 0;
    mostrarMusica();
    mostrarToast('▶️ Tocando "' + musica.titulo + '"');
}

// Remover favorita
function removerFavorita(id) {
    estado.favoritas = estado.favoritas.filter(f => f.id !== id);
    atualizarBotoesEstado();
    atualizarListas();
    salvarEstado();
    mostrarToast('🗑️ Música removida das favoritas');
}

// Desbloquear música
function desbloquearMusica(id) {
    estado.bloqueadasLista = estado.bloqueadasLista.filter(b => b !== id);
    if (estado.bloqueadas > 0) estado.bloqueadas--;
    atualizarContadores();
    atualizarBotoesEstado();
    atualizarListas();
    salvarEstado();
    mostrarToast('🔓 Música desbloqueada!');
}

// ===== Pesquisa com iTunes API em Tempo Real =====
let debounceSearch;
function pesquisarMusicas(termo) {
    clearTimeout(debounceSearch);
    const busca = termo.toLowerCase().trim();

    if (busca === '') {
        estado.pesquisando = false;
        criarFilaMusicas();
        mostrarMusica();
        return;
    }

    debounceSearch = setTimeout(async () => {
        mostrarToast('🔍 Pesquisando músicas no iTunes...');
        const resultados = await buscarMusicasReaisAPI(busca, 30);

        if (resultados.length > 0) {
            musicas = resultados;
            estado.filaMusicas = resultados.filter(m => !estado.bloqueadasLista.includes(m.id));
            estado.indiceAtual = 0;
            mostrarMusica();
            mostrarToast('🎵 Encontradas ' + resultados.length + ' músicas reais!');
        } else {
            mostrarToast('🔍 Nenhuma música encontrada no iTunes para "' + termo + '"');
        }
    }, 500);
}

// ===== Nome do Usuário & Modal =====
function atualizarNomeUsuario() {
    elementos.userNameDisplay.textContent = estado.nomeUsuario;
    elementos.userNameInput.value = estado.nomeUsuario;
}

function salvarNomeUsuario() {
    const nome = elementos.userNameInput.value.trim();
    if (nome) {
        estado.nomeUsuario = nome;
        atualizarNomeUsuario();
        salvarEstado();
        mostrarToast('👤 Nome salvo: ' + nome + '!');
        fecharModal();
    } else {
        mostrarToast('⚠️ Digite um nome válido!');
    }
}

function abrirModal() {
    elementos.configModal.classList.add('active');
    elementos.userNameInput.focus();
}

function fecharModal() {
    elementos.configModal.classList.remove('active');
}

// ===== Mudança de Abas =====
function mudarAba(nomeAba) {
    elementos.tabs.forEach(tab => {
        const isActive = tab.dataset.tab === nomeAba;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    elementos.tabContents.forEach(content => {
        content.classList.toggle('active', content.id === 'tab-' + nomeAba);
    });
}

// ===== Toast =====
let toastTimeout;
function mostrarToast(mensagem) {
    elementos.toast.textContent = mensagem;
    elementos.toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        elementos.toast.classList.remove('show');
    }, 2400);
}

// ===== Gesto de Arrastar (Swipe Mobile) =====
function configurarSwipe() {
    const card = elementos.musicCard;
    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    let isClickCandidate = false;

    // Mouse events
    card.addEventListener('mousedown', (e) => {
        startY = e.clientY;
        currentY = e.clientY;
        isDragging = true;
        isClickCandidate = true;
        card.classList.add('swiping');
    });

    card.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentY = e.clientY;
        const deltaY = currentY - startY;
        if (Math.abs(deltaY) > 6) {
            isClickCandidate = false;
        }
        if (deltaY < 0) {
            card.style.transform = `translateY(${deltaY}px) rotate(${deltaY * 0.04}deg)`;
            card.style.opacity = Math.max(0.4, 1 + deltaY / 400);
        }
    });

    const finalizarSwipe = (deltaY) => {
        card.classList.remove('swiping');
        if (deltaY < -60) {
            pularMusica();
        } else {
            card.style.transform = '';
            card.style.opacity = '1';
        }
    };

    card.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        finalizarSwipe(currentY - startY);
    });

    card.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            card.classList.remove('swiping');
            card.style.transform = '';
            card.style.opacity = '1';
        }
    });

    // Touch events (Mobile)
    card.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        currentY = e.touches[0].clientY;
        isDragging = true;
        card.classList.add('swiping');
    }, { passive: true });

    card.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;
        if (deltaY < 0) {
            card.style.transform = `translateY(${deltaY}px) rotate(${deltaY * 0.04}deg)`;
            card.style.opacity = Math.max(0.4, 1 + deltaY / 400);
        }
    }, { passive: true });

    card.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        finalizarSwipe(currentY - startY);
    });
}

// ===== Configurar Eventos =====
function configurarEventos() {
    if (elementos.btnLike) elementos.btnLike.addEventListener('click', darLike);
    if (elementos.btnDislike) elementos.btnDislike.addEventListener('click', darDeslike);
    if (elementos.btnSave) elementos.btnSave.addEventListener('click', salvarMusica);
    if (elementos.btnBlock) elementos.btnBlock.addEventListener('click', bloquearMusica);
    if (elementos.btnBack) elementos.btnBack.addEventListener('click', voltarMusica);
    if (elementos.btnSkip) elementos.btnSkip.addEventListener('click', pularMusica);
    if (elementos.btnPlayPause) elementos.btnPlayPause.addEventListener('click', togglePlayPause);
    
    // Toque direto no Disco Vinil alterna Play/Pausa
    if (elementos.vinylDisc) {
        elementos.vinylDisc.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlayPause();
        });
    }

    if (elementos.progressContainer) {
        elementos.progressContainer.addEventListener('click', (e) => {
            const rect = elementos.progressContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            if (elementos.audioPlayer.duration) {
                elementos.audioPlayer.currentTime = pos * elementos.audioPlayer.duration;
            }
        });
    }

    elementos.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            mudarAba(tab.dataset.tab);
        });
    });

    elementos.searchInput.addEventListener('input', () => {
        const termo = elementos.searchInput.value;
        elementos.searchClear.classList.toggle('visible', termo.length > 0);
        pesquisarMusicas(termo);
    });

    elementos.searchClear.addEventListener('click', () => {
        elementos.searchInput.value = '';
        elementos.searchClear.classList.remove('visible');
        pesquisarMusicas('');
        elementos.searchInput.focus();
    });

    elementos.btnConfig.addEventListener('click', abrirModal);
    elementos.modalClose.addEventListener('click', fecharModal);
    elementos.configModal.addEventListener('click', (e) => {
        if (e.target === elementos.configModal) {
            fecharModal();
        }
    });
    elementos.saveNameBtn.addEventListener('click', salvarNomeUsuario);
    elementos.userNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            salvarNomeUsuario();
        }
    });
    elementos.userProfile.addEventListener('click', abrirModal);

    elementos.audioPlayer.addEventListener('timeupdate', atualizarProgresso);
    elementos.audioPlayer.addEventListener('loadedmetadata', () => {
        elementos.totalTime.textContent = formatarTempo(elementos.audioPlayer.duration);
    });
    elementos.audioPlayer.addEventListener('play', () => {
        elementos.vinylDisc.classList.remove('paused');
        if (elementos.playPauseIcon) elementos.playPauseIcon.textContent = '⏸️';
    });
    elementos.audioPlayer.addEventListener('pause', () => {
        pausarDisco();
        if (elementos.playPauseIcon) elementos.playPauseIcon.textContent = '▶️';
    });
    elementos.audioPlayer.addEventListener('ended', () => {
        pularMusica();
    });

    configurarSwipe();
}

// ===== Atualizar progresso =====
function atualizarProgresso() {
    const audio = elementos.audioPlayer;
    if (audio.duration) {
        const progresso = (audio.currentTime / audio.duration) * 100;
        elementos.progressBar.style.width = progresso + '%';
        elementos.currentTime.textContent = formatarTempo(audio.currentTime);
    }
}

// ===== Formatar tempo (mm:ss) =====
function formatarTempo(segundos) {
    if (isNaN(segundos)) return '0:00';
    const min = Math.floor(segundos / 60);
    const sec = Math.floor(segundos % 60);
    return min + ':' + (sec < 10 ? '0' : '') + sec;
}

// ===== Registrar Service Worker (PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then((registration) => {
                console.log('Service Worker registrado:', registration.scope);
            })
            .catch((error) => {
                console.log('Erro ao registrar Service Worker:', error);
            });
    });
}

// ===== Iniciar aplicativo =====
document.addEventListener('DOMContentLoaded', iniciar);
