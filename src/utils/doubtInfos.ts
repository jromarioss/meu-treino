import { doubtInfosProps } from '../interfaces/doubtInfosProps';

export const doubtInfos: doubtInfosProps[] = [
  {
    id: 1,
    name: 'Create training',
    infos: {
      title: 'Como criar um treino',
      texts: ['Clique no botão criar para criar um treino.', 'Só pode ser criado um treino por vez.', 'Você precisa dar um nome para o seu treino.','Depois clique em cima do nome do treino que você acabou de criar, para adicionar as divisões no seu treino.','Você também pode excluir o treino clicando na lixeira.']
    }
  },
  {
    id: 2,
    name: 'Create training name',
    infos: {
      title: 'Como criar um nome para o treino',
      texts: ['','','','','']
    }
  },
  {
    id: 3,
    name: 'Create division',
    infos: {
      title: 'Como criar uma divisão',
      texts: ['Oque é uma divisão! Divisões são como campos, e nesses campos você pode adicionar exercícios.', 'Um exemplo de divisão com o nome de (Treino de peito), nesta divisão você pode adicionar exercício relacionado á treino de peito.', 'Primeiro você irá dar um nome para sua divisão, digitando no campo e depois clicando em criar.', 'Você pode criar no máximo 5 divisões.', 'Depois de criar uma divisão você pode deletar ela clicando no botão com ícone de lixeira', 'Para adicionar exercícios na sua divisão basta clicar encima do nome da divisão que deseja adicionar exercícios.']
    }
  },
  {
    id: 4,
    name: 'Create exercises',
    infos: {
      title: 'Como adicionar exercícios na divisão',
      texts: ['Primeiro selecione o tipo do exercício que deseja adicionar, selecionando os botões com nome dos membros do corpo.', 'Depois seleciona o tipo do exercício que deseja adicionar.', 'Selecionando o tipo irá abrir um modal para você adicionar o número de série e repetição, depois clica em adicionar', 'Você pode ver os exercício adicionado na sua divisão clicando no botão encima dos botões pequeno.','Você também pode excluír um exercício da sua lista, clicando no botão da lixeira.', 'E para salvar seus exercício na divisão clica no botão finalizar.']
    }
  },
];