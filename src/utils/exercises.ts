import { ExerciseProps } from '../interfaces/exerciseProps.js';

export const exercise: ExerciseProps[] = [
  {
    id: 1,
    title: 'Abdominal',
    types: [
      { id: 1, type: 'Abdominal', exercise: 'Abdominal' },
      { id: 2, type: 'Abdominal', exercise: 'Abdominal oblíquo rotação sentado no banco com barra' },
      { id: 3, type: 'Abdominal', exercise: 'Abdominal sentado no banco com elevação de pernas' },
      { id: 4, type: 'Abdominal', exercise: 'Abdominal oblíquo rotação russa de quadril' },
      { id: 5, type: 'Abdominal', exercise: 'Abdominal oblíquo rotação russa com anilha e pernas para cima' },
      { id: 6, type: 'Abdominal', exercise: 'Abdominal com rolo no chão' },
      { id: 7, type: 'Abdominal', exercise: 'Abdominal supra' },
      { id: 8, type: 'Abdominal', exercise: 'Abdominal tradicional com bola' },
      { id: 9, type: 'Abdominal', exercise: 'Abdominal no solo com elevação de pernas semidobradas' },
      { id: 10, type: 'Abdominal', exercise: 'Abdominal em V na máquina' },
    ]
  },
  {
    id: 2,
    title: 'Bíceps',
    types: [
      { id: 1, type: 'Bíceps', exercise: 'Rosca com halteres no banco inclinado' },
      { id: 2, type: 'Bíceps', exercise: 'Rosca no banco Scott com barra W' },
      { id: 3, type: 'Bíceps', exercise: 'Rosca no cabo usando a corda' },
      { id: 4, type: 'Bíceps', exercise: 'Rosca Scott com halter unilateral' },
      { id: 5, type: 'Bíceps', exercise: 'Rosca concentrada unilateral com halter' },
      { id: 6, type: 'Bíceps', exercise: 'Rosca martelo com halteres' },
      { id: 7, type: 'Bíceps', exercise: 'Rosca direta com halteres' },
      { id: 8, type: 'Bíceps', exercise: 'Rosca aberta na barra com pegada aberta' },
      { id: 9, type: 'Bíceps', exercise: 'Rosca direta com barra e pegada fechada' },
    ]
  },
  {
    id: 3,
    title: 'Costa',
    types: [
      { id: 1, type: 'Costa', exercise: 'Pulley costa' },
      { id: 2, type: 'Costa', exercise: 'Pulley frontal' },
      { id: 3, type: 'Costa', exercise: 'Remada baixa' },
      { id: 4, type: 'Costa', exercise: 'Serrote' },
    ]
  },
  {
    id: 4,
    title: 'Peito',
    types: [
      { id: 1, type: 'Peito', exercise: 'Crucifixo reto' },
      { id: 2, type: 'Peito', exercise: 'Supino inclinado com barra'},
      { id: 3, type: 'Peito', exercise: 'Supino reto com barra' },
    ]
  },
  {
    id: 5,
    title: 'Perna',
    types: [
      { id: 1, type: 'Perna', exercise: 'Cadeira abdutora' },
      { id: 2, type: 'Perna', exercise: 'Extensor de pernas' },
      { id: 3, type: 'Perna', exercise: 'Leg press 45° graus' },
      { id: 4, type: 'Perna', exercise: 'Levantamento terra' },
      { id: 5, type: 'Perna', exercise: 'Stiff' },
    ]
  },
  {
    id: 6,
    title: 'Ombro',
    types: [
      { id: 1, type: 'Ombro', exercise: 'Desenvolvimento na máquina' },
      { id: 2, type: 'Ombro', exercise: 'Elevação lateral com halteres sentado' },
      { id: 3, type: 'Ombro', exercise: 'Encolhimento com a barra' },
      { id: 4, type: 'Ombro', exercise: 'Encolhimento com halteres' },
      { id: 5, type: 'Ombro', exercise: 'Neck press' },
    ]
  },
  {
    id: 7,
    title: 'Tríceps',
    types: [
      { id: 1, type: 'Tríceps', exercise: 'Tríceps testa' },
      { id: 2, type: 'Tríceps', exercise: 'Barra cross' },
      { id: 3, type: 'Tríceps', exercise: 'Corda cross' },
      { id: 4, type: 'Tríceps', exercise: 'Frances deitado com halteres' },
    ]
  },
];