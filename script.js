// Contador de rodadas para definição do record
let roundCounter = 0;

// Inicialização do tabuleiro de cartas
// Chama a function criadora das div's que serão ocupadas por cartas
// Chama a function responsável por iniciar o array de cartas e chamar a criação de pares
// Ao fim da geração de pares há um array de cartas com pares lado a lado, mas que logo serão embaralhadas por outra função
gameStart();
function gameStart(){
    createCards(game.createCardsTypes());
    roundCounter = 0;
}

// Cria e caracteriza os espaços para as cartas
// Ao ser executado limpa o tabuleiro, afim de evitar duplicata do mesmo
    function createCards(cards){
        let gameBoard = document.getElementById("gameBoard");
        gameBoard.innerHTML = '';
        game.cards.forEach(card =>{
            let cardElement = document.createElement('div');
            cardElement.id = card.id;
            cardElement.classList = 'card';
            cardElement.dataset.icon = card.icon;
            cardElement.addEventListener('click', flipCard);
            createCardContent(card, cardElement);
            gameBoard.appendChild(cardElement);
        })
    }

// Função que gira as cartas ao realizar o evento de click
// A cada evento ferifica o fim do jogo, 
    // caso true inicializa a tela de gameover e insere nela o record atual
    // caso false apenas desvira as cartas selecionadas
        function flipCard(){
            if (game.setCard(this.id)){
            // Deve-se usar .add, afim de adicionar uma nova classe e não modificar a existente
                this.classList.add("flip");
                if (game.secondCard){
                    if (game.cardPairVerif()){
                        game.clearFlipCard();
                        roundCounter++
                        console.log(roundCounter);
                        if (game.gameOverCheck()){
                            scoreMaker();
                            setTimeout(() => {
                            let gameOverDisplay = document.getElementById("gameOver");
                            let scoreDisplay = document.getElementById("score");
                            gameOverDisplay.style.display = 'flex';
                            scoreDisplay.innerHTML = `Melhor pontuação: ${localStorage.getItem("bestScore")} rodadas`;
                            }, 1000);
                        }
                    } else{
                        setTimeout(() => {
                        let firstCardView = document.getElementById(game.firstCard.id);
                        let secondCardView = document.getElementById(game.secondCard.id);
                        firstCardView.classList.remove("flip");
                        secondCardView.classList.remove("flip");
                        game.unflipCards();
                        roundCounter++
                        console.log(roundCounter);
                    }, 1000);
                    }
                }
            }
        }

// Chama a função que criará as faces da carta
        function createCardContent(card, cardElement){
            createCardFace('card-front', card, cardElement);
            createCardFace('card-back', card, cardElement);
        }

// Cria as faces da carta, inserindo o texto e a imagem à depender da face e carta indicada
            function createCardFace(face, card, element){
                let cardFace = document.createElement('div');
                cardFace.classList = face;
                if (face === 'card-front'){
                    let elementIcon = document.createElement('img');
                    elementIcon.classList = 'icon';
                    elementIcon.src = "./Pictures/" + card.icon + ".png";
                    cardFace.appendChild(elementIcon);
                } else {
                    cardFace.innerHTML = "&lt/&gt";
                }
                element.appendChild(cardFace);
            }

// Confere o melhor record e o insere no storage
function scoreMaker(){
    if (localStorage.getItem("bestScore") = null){
        localStorage.setItem("bestScore", roundCounter);
    }
    if (localStorage.getItem("bestScore") > roundCounter){
        localStorage.removeItem("bestScore");
        localStorage.setItem("bestScore", roundCounter);
    }
}

// Redefine as variáveis das cartas
// Recomeça o jogo para que o tabuleiro seja limpo e haja novo embaralhamento do array
// Por fim, esconde a tela de gameover
function gameRestart(){
    game.clearFlipCard();
    gameStart();
    let gameOverDisplay = document.getElementById("gameOver");
    gameOverDisplay.style.display = 'none';
}
