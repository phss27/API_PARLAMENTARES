const express = require('express');
const app = express();
const port = 5501;

// Dados simulados de partidos
const partidos = [
  { id: 1, nome: 'Partido da Liberdade', sigla: 'PL', pais: 'Brasil' },
  { id: 2, nome: 'Partido Progressista', sigla: 'PP', pais: 'Brasil' },
  { id: 3, nome: 'Partido Socialista', sigla: 'PS', pais: 'Brasil' }
];

// Dados simulados de parlamentares
const parlamentares = [
  { id: 1, nome: 'Carlos Silva', cargo: 'Deputado Federal', email: 'carlos@camara.gov.br', partidoId: 1 },
  { id: 2, nome: 'Maria Souza', cargo: 'Deputada Federal', email: 'maria@camara.gov.br', partidoId: 2 },
  { id: 3, nome: 'João Oliveira', cargo: 'Senador', email: 'joao@senado.gov.br', partidoId: 1 },
  { id: 4, nome: 'Ana Costa', cargo: 'Deputada Estadual', email: 'ana@al.gov.br', partidoId: 3 }
];

// Rota para listar todos os partidos
app.get('/partidos', (req, res) => {
  res.json({ partidos });
});

// Rota para listar os parlamentares de um partido específico
app.get('/partidos/:id/parlamentares', (req, res) => {
  const partidoId = parseInt(req.params.id);
  const parlamentaresDoPartido = parlamentares.filter(p => p.partidoId === partidoId);

  if (parlamentaresDoPartido.length > 0) {
    res.json({ parlamentares: parlamentaresDoPartido });
  } else {
    res.status(404).json({ message: 'Nenhum parlamentar encontrado para este partido.' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API rodando em http://127.0.0.1/:${port}`);
});
