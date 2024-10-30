// URLs da API
const PARTIDOS_API = 'http://localhost:3000/partidos';
const PARLAMENTARES_API = (idPartido) => `http://localhost:3000/partidos/${idPartido}/parlamentares`;

// Elementos do DOM
const partidoSelect = document.getElementById('partido-select');
const parlamentaresContainer = document.getElementById('parlamentares-container');

// Função para obter os partidos da API
async function fetchPartidos() {
    try {
        const response = await fetch(PARTIDOS_API);
        const data = await response.json();

        // Preenche a caixa de seleção com os partidos
        data.partidos.forEach(partido => {
            const option = document.createElement('option');
            option.value = partido.id;
            option.textContent = `${partido.sigla} - ${partido.nome}`;
            partidoSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar partidos:', error);
    }
}

// Função para obter parlamentares de um partido
async function fetchParlamentares(idPartido) {
    try {
        const response = await fetch(PARLAMENTARES_API(idPartido));
        const data = await response.json();

        // Limpa a área de parlamentares
        parlamentaresContainer.innerHTML = '';

        // Verifica se há parlamentares para o partido selecionado
        if (data.parlamentares.length > 0) {
            const ul = document.createElement('ul');
            data.parlamentares.forEach(parlamentar => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <h3>${parlamentar.nome}</h3>
                    <p>Cargo: ${parlamentar.cargo}</p>
                    <p>Email: ${parlamentar.email}</p>
                `;
                ul.appendChild(li);
            });
            parlamentaresContainer.appendChild(ul);
        } else {
            parlamentaresContainer.textContent = 'Nenhum parlamentar encontrado para este partido.';
        }
    } catch (error) {
        console.error('Erro ao carregar parlamentares:', error);
    }
}

// Evento de mudança na seleção de partidos
partidoSelect.addEventListener('change', function () {
    const partidoId = this.value;

    if (partidoId) {
        fetchParlamentares(partidoId); // Carrega os parlamentares quando um partido é selecionado
    } else {
        parlamentaresContainer.innerHTML = ''; // Limpa a área de parlamentares se nenhum partido for selecionado
    }
});

// Carregar a lista de partidos ao carregar a página
fetchPartidos();
