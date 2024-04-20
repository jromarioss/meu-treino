import { exerciseDetailsProps } from '../interfaces/exerciseDetailsProps';

import AbdominalIMG0 from '../assets/gif/abdominal/abdominal.gif';
import AbdominalIMG1 from '../assets/gif/abdominal/abdominal-obliquo-rotacao-sentado-no-banco-com-barra-1.gif';
import AbdominalIMG2 from '../assets/gif/abdominal/abdominal-elevacao-de-pernas-no-banco.gif';
import AbdominalIMG3 from '../assets/gif/abdominal/abdominal-obliquo-rotacao-russa-de-quadri.gif';
import AbdominalIMG4 from '../assets/gif/abdominal/abdominal-obliquo-rotacao-russa-com-anilha-e-pernas-parra-cima.gif';
import AbdominalIMG5 from '../assets/gif/abdominal/abdominal-com-rolo-no-chao.gif';
import AbdominalIMG6 from '../assets/gif/abdominal/abdominal-supra.gif';
import AbdominalIMG7 from '../assets/gif/abdominal/abdominal-padrao-na-bola-de-estabilizacao.gif';
import AbdominalIMG8 from '../assets/gif/abdominal/abdominal-no-chao-com-elevacao-de-pernas-semi-dobradas.gif';
import AbdominalIMG9 from '../assets/gif/abdominal/abdominal-em-V-na-maquina.gif';

import BicepsIMG0 from '../assets/gif/biceps/rosca-biceps-com-halteres-no-banco-inclinado.gif';
import BicepsIMG1 from '../assets/gif/biceps/biceps-rosca-biceps-no-banco-scott-com-barra-W.gif';
import BicepsIMG2 from '../assets/gif/biceps/rosca-biceps-no-cabo.gif';
import BicepsIMG3 from '../assets/gif/biceps/Rosca-Scott-com-halteres-unilateral.gif';
import BicepsIMG4 from '../assets/gif/biceps/rosca-concentrada-unilateral-com-halter.gif';
import BicepsIMG5 from '../assets/gif/biceps/rosca-biceps-martelo-com-halteres.gif';
import BicepsIMG6 from '../assets/gif/biceps/rosca-biceps-direta-com-halteres.gif';
import BicepsIMG7 from '../assets/gif/biceps/rosca-biceps-aberta-na-barra.gif';
import BicepsIMG8 from '../assets/gif/biceps/rosca-biceps-direta-com-barra-e-pegada-fechada-mulher.gif';

export const exerciseDetails: exerciseDetailsProps[] = [
  {
    id: 1,
    type: 'Abdominal',
    exercises: [
      {
        title: 'Abdominal',
        image: AbdominalIMG0,
        description: [
          'Deite-se no chão ou em um tapete de exercícios com a barriga virada para cima. Em seguida, flexione seus joelhos. Deixe os pés firmes no chão e ligeiramente separados na largura dos quadris. Afaste também os joelhos para que fiquem alinhados com seus pés. Então, coloque as mãos atrás da cabeça e se prepare para iniciar o exercício.',
          'Contraia o abdômen e eleve o seu tronco o máximo possível. Incline-se para a frente como se seu objetivo fosse encostar o peitoral nos joelhos.',
          'Use apenas a força do abdômen para levantar do chão, sem curvar o pescoço para completar o movimento. Volte lentamente para a posição inicial encostando as omoplatas (ossos dos ombros) no chão e repita quantas vezes forem necessárias para terminar a série.',
        ]
      },
      {
        title: 'Abdominal oblíquo rotação sentado no banco com barra',
        image: AbdominalIMG1,
        description: [
          'Sente-se em um banco reto e deixe as pernas afastadas entre si em uma distância igual ou maior do que a largura dos ombros. Mantenha os pés apontados para fora.',
          'Agora, segure uma barra reta com as duas mãos utilizando a pegada pronada (palmas das mãos voltadas para a frente) e apoie a barra atrás da cabeça logo acima do trapézio. Deixe o tronco reto e estável. Coloque também os ombros para trás e para baixo, ajustando assim a sua postura.',
          'Finalmente, contraia o abdômen e se prepare para iniciar a rotação do tronco com a barra.',
          'Então, rotacione o tronco para a direita o máximo possível, faça uma breve pausa e volte lentamente para a posição inicial. Repita o giro para o mesmo lado quantas vezes for preciso para terminar a série. Depois disso, descanse por cerca de 45 segundos a 1 minuto e faça a mesma rotação para o lado esquerdo.'
        ]
      },
      {
        title: 'Abdominal sentado no banco com elevação de pernas',
        image: AbdominalIMG2,
        description: [
          'Antes de mais nada, sente-se na ponta de um banco reto. Em seguida, segure nas laterais do banco com as duas mãos. Agora, estique as pernas à sua frente mantendo os pés unidos e eleve-as do chão.',
          'Depois disso, incline suavemente o tronco para trás em um ângulo de aproximadamente 45 graus. Não esqueça de ajustar a postura mantendo a coluna reta, o peito aberto e os ombros para trás.',
          'Então, inicie o abdominal levando o tronco para a frente ao mesmo tempo em que flexiona as pernas para aproximar os joelhos ao peitoral. Faça isso trazendo as pernas para cima em direção ao corpo com os joelhos levemente dobrados. Volte para a posição inicial inclinando o tronco para trás e esticando as pernas novamente, mas sem encostar os pés no chão.',
        ]
      },
      {
        title: 'Abdominal oblíquo rotação russa de quadril',
        image: AbdominalIMG3,
        description: [
          'Deite-se no chão com a barriga para cima. Em seguida, dobre os joelhos mantendo os pés firmes no chão e eleve o tronco o máximo possível deixando as costas e cabeça retas. O ideal é que seu tronco e suas coxas adotem um formato de “V”. Então, coloque as mãos cruzadas sobre o peito, contraia o abdômen e se prepare para iniciar a rotação.',
          'Rotacione o tronco para a direita, mantendo os quadris e os pés firmes no solo. Em seguida, gire o tronco para a esquerda. Repita a sequência até finalizar a sua série.',
        ]
      },
      {
        title: 'Abdominal oblíquo rotação russa com anilha e pernas para cima',
        image: AbdominalIMG4,
        description: [
          'Deite-se com a barriga para cima e as costas bem apoiadas no chão. Então, segure a anilha à frente do corpo com as duas mãos logo acima do peito. Em seguida, eleve o tronco e as pernas com os joelhos levemente dobrados, deixando o corpo em uma posição de “V”. Os pés devem ficar cruzados para manter as pernas unidas e estáveis. Considere esta a posição inicial do abdominal oblíquo rotação russa.',
          'Agora, com o abdômen contraído, gire o tronco para um dos lados do corpo. Faça isso inclinando as pernas para o lado oposto à anilha para ajudar a manter o equilíbrio. Volte lentamente à posição inicial segurando a anilha junto ao peito.',
          'Não se esqueça de soltar o ar durante a rotação e de puxar o ar ao voltar para a posição inicial.',
          'Para facilitar a execução, você pode deixar os pés apoiados no chão, transformando o exercício em uma versão alternativa chamada de rotação russa de quadril.'
        ]
      },
      {
        title: 'Abdominal com rolo no chão',
        image: AbdominalIMG5,
        description: [
          'Apesar de ser um exercício avançado, o abdominal com a roda pode ser feito por iniciantes, desde que a amplitude do movimento seja reduzida para garantir a boa execução.',
          'Para começar, fique na posição de quatro apoios com os joelhos no chão e deixe o rolo na sua frente. Em seguida, coloque as duas mãos no rolo abdominal, mantendo os braços estendidos e perpendiculares ao solo. Cruze os pés para ajudar no equilíbrio. ',
          'Então, inicie o movimento rolando o acessório para a frente enquanto contrai o abdômen. Desça o máximo que conseguir ou até seu peito quase tocar o chão. Mantenha os braços esticados durante todo o exercício e não retire os joelhos do chão. Por fim, retorne trazendo o rolo para trás ao mesmo tempo em que eleva o tronco para a posição inicial.',
        ]
      },
      {
        title: 'Abdominal supra',
        image: AbdominalIMG6,
        description: [
          'Deite-se de costas em um colchonete e contraia levemente o abdômen para que toda a lombar esteja alinhada com o chão.',
          'Em seguida, dobre os joelhos e se certifique de que os pés estejam em uma distância de dois palmos dos glúteos. Os pés não podem ficar muito distantes e nem totalmente encostados nos glúteos.',
          'Posicione cada mão no ombro oposto, com os braços formando um “X” na frente do peito, ou toque com as mãos atrás das orelhas. Não é necessário fazer nenhum tipo de força com os braços e você também não deve posicionar as mãos atrás da cabeça com o objetivo de puxá-la para fazer o exercício, pois isso pode resultar em dores no pescoço, devido a uma execução errada e à sobrecarga da cervical.',
          'Contraia ao máximo os músculos do abdômen até que a parte superior do tórax esteja fora do chão. Se você for iniciante, basta atingir a contração máxima do abdômen. Com a sua evolução, a força irá progredir e você poderá melhorar a subida do tórax.'
        ]
      },
      {
        title: 'Abdominal tradicional com bola',
        image: AbdominalIMG7,
        description: [
          'Comece se posicionando corretamente sobre a bola. Para isso, sente-se bem na ponta da bola para que você consiga deitar e apoiar a parte inferior das costas sobre ela.',
          'Deixe os joelhos flexionados em um ângulo de 90 graus e os pés firmes no chão. É importante manter os pés afastados entre si na mesma distância entre os ombros. Então, coloque as mãos atrás da cabeça e se prepare puxando o ar para começar o movimento.',
          'Agora, solte o ar enquanto eleva o tronco e mantém os quadris na bola. Ao mesmo tempo, contraia os músculos abdominais. Levante o máximo que conseguir, faça uma pausa de alguns segundos e retorne lentamente à posição inicial apoiando as costas na bola novamente.'
        ]
      },
      {
        title: 'Abdominal no solo com elevação de pernas semidobradas',
        image: AbdominalIMG8,
        description: [
          'Primeiramente, deite-se no chão com a barriga para cima. Use um tapete ou colchonete de exercícios para ficar mais confortável. Em seguida, deixe os braços esticados ao lado do corpo com as palmas das mãos viradas para baixo. Dobre os joelhos e mantenha o pé apoiado no chão. É importante manter a parte superior do corpo estática. Sendo assim, não mexa cabeça, ombros ou braços durante a execução.',
          'Então, mantendo as pernas juntas e semidobradas, eleve as pernas e os quadris do chão levando os joelhos em direção ao peito. Não há necessidade de encostar os joelhos no peito, mas tente elevar as pernas o máximo que conseguir enquanto mantém o abdômen contraído.',
          'Lentamente, volte para a posição inicial abaixando as pernas semidobradas e tocando o chão com os pés. Inspire ao elevar as pernas e expire no momento de retornar à posição inicial.'
        ]
      },
      {
        title: 'Abdominal em V na máquina',
        image: AbdominalIMG9,
        description: [
          'Ao sentar no banco, você deve deixar a lombar bem apoiada. O rolo de espuma deve ficar acima dos pés, próximo dos seus tornozelos. As alças superiores da máquina precisam estar na altura dos seus ombros.',
          'Depois de fazer todos os ajustes, segure as alças com as mãos, deixando os cotovelos flexionados. Então, comece o abdominal puxando as alças para a frente, usando a força do seu abdômen para inclinar o tronco. Ao mesmo tempo, eleve o rolo de espuma com as pernas, formando um V com o corpo.',
          'Expire ao inclinar o tronco e ao subir as pernas. Faça uma breve pausa e, em seguida, retorne à posição inicial enquanto inspira.'
        ]
      },
    ]
  },
  {
    id: 2,
    type: 'Bíceps',
    exercises: [
      {
        title: 'Rosca com halteres no banco inclinado',
        image: BicepsIMG0,
        description: [
          'Primeiramente, escolha um par de halteres para fazer o exercício. Então, sente-se com as costas apoiadas no banco e as pernas afastadas em volta do banco. Os pés devem ficar firmes no chão e os braços esticados ao lado do corpo enquanto você segura os halteres com uma pegada neutra. ',
          'Mantenha o pescoço em uma posição neutra e alinhado com as costas. Agora, gire os ombros para trás e para baixo, contraia o abdômen e comece o exercício.',
          'Comece contraindo o bíceps e dobrando os cotovelos. Ao flexionar os cotovelos, gire os punhos para mudar de uma pegada neutra para uma pegada supinada com as palmas das mãos voltadas para cima.',
          'Pare no topo do movimento assim que os halteres chegarem perto dos ombros. Então, desça lentamente até voltar para a posição inicial.'
        ]
      },
      {
        title: 'Rosca no banco Scott com barra W',
        image: BicepsIMG1,
        description: [
          'Pegue uma barra W e coloque-a sobre um suporte na frente do banco Scott. Coloque então as anilhas com o peso desejado e sente-se no banco.',
          'Mantenha as pernas afastadas entre si em uma distância maior do que a largura dos ombros. Os pés devem ficar levemente apontados para fora. O tronco pode ficar um pouco inclinado para a frente, mas as costas e a cabeça devem estar retas e alinhadas.',
          'Então, apoie a parte posterior dos braços no apoio almofadado, desde as axilas até os cotovelos.',
          'Agora, segure a barra W com a pegada supinada (palmas das mãos voltadas para cima) e deixe os braços esticados para baixo em um ângulo de cerca de 45 graus em relação ao tronco. Esta é a posição inicial da rosca Scott com a barra W.',
          'Dobre os braços levantando a barra em direção aos ombros enquanto contrai o bíceps e solta o ar. Faça uma pausa no topo e volte para a posição inicial enquanto inspira o ar.',
        ]
      },
      {
        title: 'Rosca no cabo usando a corda',
        image: BicepsIMG2,
        description: [
          'Antes de mais nada, prenda a corda na polia baixa de uma máquina de cabos. Em seguida, fique em pé de frente para o acessório com os pés levemente afastados entre si na mesma largura dos ombros e com o tronco reto.',
          'Mantenha a cabeça reta, o olhar para a frente, os braços esticados para baixo e os cotovelos levemente dobrados enquanto segura em cada uma das extremidades da corda com as mãos. A pegada deve ser neutra, isto é, as palmas das mãos de frente uma para a outra. Considere esta a posição inicial para começar o exercício.',
          'Agora, puxe a corda em direção ao peito ao mesmo tempo em que flexiona os cotovelos e os desloca suavemente para trás para acompanhar o movimento de flexão.',
        ]
      },
      {
        title: 'Rosca Scott com halter unilateral',
        image: BicepsIMG3,
        description: [
          'Para realizar este exercício de isolamento para o bíceps, você precisa de um halter e um banco Scott.',
          'Após regular o banco de acordo com sua altura, ajuste a sua postura. Para isso, sente-se no banco Scott com as pernas afastadas e concentre-se em manter as costas retas e os pés firmes no chão com os joelhos dobrados confortavelmente.',
          'Em seguida, apoie a metade superior posterior do braço no apoio, desde a axila até o cotovelo. Mantenha a cabeça erguida e se prepare para iniciar o movimento de extensão e flexão de cotovelo.',
          'Enquanto um braço descansa sobre a perna, o outro fica esticado para baixo segurando o halter com uma pegada supinada (palma da mão voltada para cima). Então, faça o movimento de flexão de cotovelo, levando o halter em direção ao ombro. Faça uma breve pausa e volte para a posição inicial estendendo totalmente o cotovelo.'
        ]
      },
      {
        title: 'Rosca concentrada unilateral com halter',
        image: BicepsIMG4,
        description: [
          'Sente-se na extremidade de um banco reto com os pés no chão e as pernas afastadas entre si em uma distância maior do que a largura dos ombros.',
          'Ative o abdômen e incline o tronco para a frente mantendo a coluna em sua curvatura natural. Mantenha o pescoço e as costas relaxados, o peito erguido e olhe para a frente.',
          'Agora, segure um halter com a pegada supinada (palmas das mãos voltadas para cima) e apoie o cotovelo na parte interna da coxa. Então, estique o braço para baixo e considere esta a posição inicial.',
          'Flexione o braço com o cuidado de não hiperestender o cotovelo enquanto levanta o halter em direção ao peitoral. Não esqueça de contrair o bíceps durante a elevação. Retorne lentamente à posição inicial e repita quantas vezes forem necessárias para completar sua série. Inspire ao baixar o halter e expire ao levantar o peso.'
        ]
      },
      {
        title: 'Rosca martelo com halteres',
        image: BicepsIMG5,
        description: [
          'Fique em pé com os pés afastados entre si na largura dos ombros e os joelhos levemente dobrados. Segure um halter em cada mão com os pesos ao lado da parte externa da coxa, deixando as palmas das mãos viradas para as laterais das coxas. Arrume sua postura deixando o corpo reto e os cotovelos relaxados.',
          'Agora, eleve os halteres em direção ao ombro enquanto flexiona os cotovelos. As palmas das mãos continuam viradas uma para a outra preservando a pegada neutra.',
          'Deixe o core firme e estável e contraia também os músculos abdominais para proteger as suas costas e evitar movimentos involuntários na hora de levantar e abaixar os halteres. Mantenha também o bíceps contraído para uma melhor ativação muscular.',
          'Os pulsos ficam alinhados com os antebraços e os únicos movimentos feitos são a flexão e extensão de cotovelos. Por fim, volte para a posição inicial devagar e repita até terminar sua série.'
        ]
      },
      {
        title: 'Rosca direta com halteres',
        image: BicepsIMG6,
        description: [
          'Comece o exercício em pé com os pés afastados na largura dos quadris e os joelhos levemente dobrados.',
          'O corpo deve estar reto e a cabeça deve se manter erguida e alinhada com as costas. Em seguida, segure um halter em cada mão com a pegada supinada em que as palmas das mãos ficam viradas para fora. Mantenha os braços estendidos ao lado do corpo e considere esta a sua posição inicial.',
          'Então, flexione os cotovelos enquanto levanta os halteres simultaneamente até próximo ao peitoral. Faça uma breve pausa e retorne lentamente para a posição inicial. Repita quantas vezes forem necessárias para completar a série.',
          'Não se esqueça de envolver o núcleo do corpo (core), de contrair o bíceps, de manter os cotovelos fixos ao lado do tronco e de relaxar os ombros durante o exercício.',
          'Solte o ar enquanto levanta os halteres e inspire ao voltar para a posição de início com os braços esticados.'
        ]
      },
      {
        title: 'Rosca aberta na barra com pegada aberta',
        image: BicepsIMG7,
        description: [
          'Antes de mais nada, coloque as anilhas na barra e posicione ela no chão ou em um suporte à sua frente. Depois disso, fique em pé com os pés afastados entre si na mesma largura dos quadris e com os joelhos suavemente flexionados.',
          'Deixe o tronco reto, a cabeça erguida e os músculos centrais que compõem o core (como os do abdômen, das costas e dos quadris) bem firmes. Mantenha também o peito aberto e as omoplatas para trás e para baixo.',
          'Então, segure a barra com as duas mãos usando a pegada supinada em que as palmas das mãos ficam viradas para cima. Mantenha as mãos afastadas entre si em uma largura maior do que a distância dos ombros para configurar a pegada aberta.',
          'Agora, estique os braços para baixo segurando a barra na altura dos quadris. Considere esta a sua posição inicial.',
          'Comece o movimento levantando a barra enquanto flexiona os cotovelos mantendo-os próximos do corpo. Suba até a flexão total dos cotovelos. Suas mãos devem ficar na altura dos ombros.',
          'Desça a barra lentamente fazendo uma extensão de cotovelos. Repita até finalizar a sua série.',
        ]
      },
      {
        title: 'Rosca direta com barra e pegada fechada',
        image: BicepsIMG8,
        description: [
          'Primeiramente, selecione a carga que será usada e prepare a barra em um suporte ou no chão à sua frente antes de começar o exercício.',
          'Em seguida, fique em pé com os pés afastados entre si na mesma largura dos quadris. Mantenha o tronco reto, a cabeça erguida e o abdômen, as costas e os quadris firmes.',
          'Depois disso, segure a barra com as duas mãos usando a pegada supinada em que as palmas das mãos ficam viradas para cima. Mantenha as mãos afastadas entre si em uma largura um pouco menor do que a distância dos ombros para configurar a pegada fechada.',
          'Então, estenda os braços para baixo segurando a barra na altura dos quadris para finalmente adotar a posição inicial.',
          'Inicie o exercício elevando a barra ao mesmo tempo que flexiona os cotovelos, mantendo-os sempre próximos do corpo. Suba até a flexão total dos cotovelos. Suas mãos devem alcançar a altura dos ombros.',
          'Após essa etapa, desça a barra em um movimento controlado fazendo uma extensão de cotovelos. Repita a sequência até finalizar a sua série.',
        ]
      },
    ]
  },
]