/*
    Objeto será uma classe pai para os elementos do jogo 
    comosa player , inimigos , chao , paredes , teto
*/
class Objeto {

    constructor(x, y, width, height, collisional) { // construtor com os atributos que a classe terá

        this.x = x // x representa a posição x no plano carteziano
        this.y = y // y representa a posição y no plano carteziano
        this.width = width // width será a largura do objeto 
        this.height = height // height será a altura do objeto
        this.collisional = collisional // variável que armazena se o objeto tem ou não colisão

    }

    update() { // função responsavel pela logica do objeto



    }

    // função responsavel pela colisão do objeto
    isCollided(obj) { // recebe como parâmetro um objeto de colisão

        const colisor = { // objeto literal que retornaremos com as informações da colisão

            collided: false, // variável que armazena se a colisão ocorreu, como valor inicial false
            x: this.x, // x desse objeto será a posição que o objeto atual precisa para sair da colisão, inicialmente seu valor é a posição x do objeto atual
            y: this.y // y desse objeto será a posição que o objeto atual precisa para sair da colisão, inicialmente seu valor é a posição y do objeto atual

        }

        if (!obj.collisional) { // vemos se o objeto de comparação não possui colisão

            return colisor // se o objeto de comparação não possuir colisão retornamos o colisor

        }

        /* Distância x e y
        
            para verificar a colisão necessitamos pegar a distância tanto do eixo X e Y

            objeto de comparação 
            x: 50
            y: 100
            width: 50
            height: 50

            objeto atual o que se refere ao this 
            x: 51
            y: 90
            width: 50
            height: 50

            EXEMPLO DO EXIO X

            distanciaX = (this.x + this.width / 2) - (obj.x + obj.width / 2)
            distanciaX = (51 + 50 / 2) - (50 + 50 / 2)
            distanciaX = (101 / 2) - (100 / 2)
            distanciaX = 50.50 - 50
            distanciaX = 0.50

            EXEMPLO DO EXIO Y

            distanciaY = (this.y + this.width / 2) - (obj.y + obj.width / 2)
            distanciaY = (90 + 50 / 2) - (100 + 50 / 2)
            distanciaY = (140 / 2) - (150 / 2)
            distanciaY = 70 - 75
            distanciaY = -5
        
        */
        const distanciaX = (this.x + this.width / 2) - (obj.x + obj.width / 2);
        const distanciaY = (this.y + this.height / 2) - (obj.y + obj.height / 2);

        /* Soma de largura e altura
        
            para verificar a colisão necessitamos pegar a soma das largura e alturas dos objetos

            objeto de comparação 
            x: 50
            y: 100
            width: 50
            height: 50

            objeto atual o que se refere ao this 
            x: 51
            y: 90
            width: 50
            height: 50

            EXEMPLO DA LARGURA

            sumWidth = (this.width + obj.width) / 2
            sumWidth = (50 + 50) / 2
            sumWidth = 100 / 2
            sumWidth = 50

            EXEMPLO DA ALTURA 

            sumHeight = (this.height + obj.height) / 2
            sumHeight = (50 + 50) / 2
            sumHeight = 100 / 2
            sumHeight = 50
        
        */
        const sumWidth = (this.width + obj.width) / 2;
        const sumHeight = (this.height + obj.height) / 2;

        /* VERIFICAÇÃO DE COLISÃO
        
            agora efetivamente vamos verficar se ocorreu a colisão

            EXEMPLO

            objeto de comparação 
            x: 50
            y: 100
            width: 50
            height: 50

            objeto atual o que se refere ao this 
            x: 51
            y: 90
            width: 50
            height: 50

            distanciaX = 0.50
            distanciaY = -5

            sumWidth = 50
            sumHeight = 50

            if(Math.abs(distanciaX) < sumWidth && Math.abs(distanciaY) < sumHeight)
            se 0.50 < 50 E  5 < 50
        
            neste caso ocorreu a colisão

        */
        if (Math.abs(distanciaX) < sumWidth && Math.abs(distanciaY) < sumHeight) { // caso seja verdadeira  a colisão ocorreu

            colisor.collided = true // como foi verificado a colisão então dizemos que collided vai ser verdadeira

            /* OVER X e Y
        
            agora iremos adquirir a posição de escape da colisão

            objeto de comparação 
            x: 50
            y: 100
            width: 50
            height: 50

            objeto atual o que se refere ao this 
            x: 51
            y: 90
            width: 50
            height: 50

            distanciaX = 0.50
            distanciaY = -5

            sumWidth = 50
            sumHeight = 50

            EXEMPLO overX

            overX = sumWidth - Math.abs(distanciaX)
            overX = 50 - 0.50
            overX = 49.50

            EXEMPLO overY

            overY = sumHeight - Math.abs(distanciaY)
            overY = 50 - 5
            overY = 45

        */
            const overX = sumWidth - Math.abs(distanciaX);
            const overY = sumHeight - Math.abs(distanciaY);

            //se overX > overY, com exemplo anterior 49.50 > 45
            if (overX > overY) {

                /* COLISOR Y 

                    objeto de comparação 
                    x: 50
                    y: 100
                    width: 50
                    height: 50

                    objeto atual o que se refere ao this 
                    x: 51
                    y: 90
                    width: 50
                    height: 50

                    overY = 45

                    distanciaY = -5
                
                    se a distanciaY > 0
                    se a -5 > 0 
                    FALSO

                    caso distanciaY > 0
                    this.y + overY

                    caso seja falso distanciaY > 0
                    this.y - overY
                    100 - 45
                    55

                    nesse exemplo colisor y = 55
                
                */
                colisor.y = distanciaY > 0 ? this.y + overY : this.y - overY;

            } else { // se a condição anterior fosse falso

                // então a posição x do colisor vai ser distanciaX > 0 for verdadeiro x = this.x + overX, senão x = this.x - overX
                colisor.x = distanciaX > 0 ? this.x + overX : this.x - overX;

            }
        }

        return colisor // retorna o colisor

    }

    render(cor) { // função responsavel 

        ctx.fillStyle = cor // definimos que a cor de renderização será a cor que recebemos como parâmetro
        ctx.fillRect(this.x, this.y, this.width, this.height) // vamos renderizar um quadrado com os parâmetros do objeto

        // this.collisional ? "possui colisão" : "não posssui colisão" se o objeto possui colisão mostra esse texto emcima do objeto
        ctx.fillText(this.collisional ? "possui colisão" : "não posssui colisão", (this.width + this.x) / 1.3, this.y - 25)

    }

}