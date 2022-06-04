let game = {

// Inicialização de variáveis
     cards: null,
     lockMode: false,
     firstCard: null,
     secondCard: null,
     types: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],

// Cria um array para as cartas e chama uma criação de pares para cada tipo
// Desmembra os arrays em duplas, originando um único array para as 20 cartas
// Chama a função que irá embaralhar o array de cartas
    createCardsTypes: function(){
        this.cards = [];
        for (type of this.types){
            this.cards.push(this.createTypePair(type));
        }
        this.cards = this.cards.flatMap(card => card);
        this.shuffleCards();
        return this.cards
    },

// Cria os pares de cartas de acordo com o tipo passado no argumento
        createTypePair: function(type){
            return [{
                id: this.createIdForCard(type),
                icon: type,
                flip: false
            },
            {
                id: this.createIdForCard(type),
                icon: type,
                flip: false
            }];
        },

// Cria um id aleatório para cada carta (concatena o tipo da carta + um número aleatório)
            createIdForCard: function(type){
                return type + parseInt(Math.random() * 1000);
            },

// Função responsável por embaralhar o array de cartas
        shuffleCards: function(){
            let currentIndex = this.cards.length;
            let randomIndex = 0;

            while (currentIndex !== 0){
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]];
            }
        },
    
// Verifica se a carta clicada é a primeira ou segunda, além de impedir a seleção da mesma carta
    setCard: function (id){
        let card = this.cards.filter(card => card.id === id)[0];
        if (card.flip || this.lockMode){
            return false
        }
        if (!this.firstCard){
            this.firstCard = card;
            this.firstCard.flip = true;
            return true
        } else {
            this.secondCard = card;
            this.secondCard.flip = true;
            this.lockMode = true;
            return true
        }
    },

// Verifica se as cartas selecionadas são ou não um par de mesmo tipo
    cardPairVerif: function (){
        if (!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

// Reinicia as cartas selecionadas
    clearFlipCard: function (){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = null;
    },

// Desvira as cartas caso não sejam pares de mesmo tipo
    unflipCards: function (){
        this.firstCard.flip = false;
        this.secondCard.flip = false;
        this.clearFlipCard();
    },

// Checa se o jogo chegou ao fim
    gameOverCheck: function (){
        return this.cards.filter(card => !card.flip).length == 0;
    }
}