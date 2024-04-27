import { doubtInfosProps } from '../interfaces/doubtInfosProps';

export const doubtInfos: doubtInfosProps[] = [
  {
    id: 1,
    name: 'Create training',
    infos: {
      title: 'Como criar um treino',
      texts: ['Clique no botão criar para criar um treino.', 'Só pode ser criado um treino por vez.', 'Você precisa dar um nome para o seu treino.','Depois clique em cima do nome do treino que você acabou de criar, para adicionar as divisões no seu treino.','Você também pode excluir um treino clicando no ícone de lixeira.']
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
];