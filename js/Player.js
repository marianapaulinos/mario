/*

    Herança é um princípio de orientação a objetos, que permite que classes compartilhem 
    atributos e métodos, através de heranças. Ela é usada na intenção de reaproveitar 
    código ou comportamento generalizado ou especializar operações ou atributos.

    nesse caso Player herda do SpriteSheet

*/
class Player extends SpriteSheet {

    /*

        Quando trabalhamos com herança a superclasse é a classe que herdamos e sub classe é a
        classe que herda da superclasse.
        A subclasse pode sobrescrever métodos da superclasse e, claro, implementar
        seus próprios métodos. 
        Cada classe possui duas referências: o this, que referencia a instância dela mesma e
        o super que referencia a superclasse.

    */
    constructor(x, y, width, height, speed, nome) { // speed é um parâmetro que usaremos para definir a velocidade do player

        super(x, y, width, height, true, nome) // player sempre tem colisão e passamos o nome agora para construtor
        this.speed = speed

    }

    update(objs) { // função responsavel pela logica do objeto

        if (keys.a) { // se A tecla a foi pressionada

            this.x -= this.speed // diminuimos a posição x do player conforme o valor de speed
            this.animacao = "esquerda" // os sprites de animação agora será para esquerda
            this.movimentando = true // como queremos que o sprite mude dizemos que o movimento está acontecendo

        }
        if (keys.d) { // se D tecla a foi pressionada

            this.x += this.speed // aumentamos a posição x do player conforme o valor de speed
            this.animacao = "direita" // os sprites de animação agora será para direita
            this.movimentando = true // como queremos que o sprite mude dizemos que o movimento está acontecendo

        }
        if (keys.w) { // se W tecla a foi pressionada

            this.y -= this.speed // diminuimos a posição y do player conforme o valor de speed
            this.animacao = "cima" // os sprites de animação agora será oara cima
            this.movimentando = true // como queremos que o sprite mude dizemos que o movimento está acontecendo

        }
        if (keys.s) { // se S tecla a foi pressionada

            this.y += this.speed // aumentamos a posição y do player conforme o valor de speed
            this.animacao = "baixo" // os sprites de animação agora será para baixo
            this.movimentando = true // como queremos que o sprite mude dizemos que o movimento está acontecendo

        }

        for (let index = 0; index < objs.length; index++) { // iremos realizar um ciclo de repetição que pecorra todo os objetos

            const colisor = this.isCollided(objs[index]) // iremos receber um colisor levando em comparação do objeto

            colisao = colisor.collided 

            if (colisor.collided) { // se a colisão ocorreu

                this.x = colisor.x // então a posição x do player será a mesma do colisor
                this.y = colisor.y // então a posição y do player será a mesma do colisor
                break; // então paramos o ciclo de repetição caso ocorra a colisão

            }

        }

    }

    render() { // função responsavel 

        // dizemos que o proximos elementos terão seu prenchimento pintado de preto
        ctx.fillStyle = "black"

        // dizemos que o proximos elementos terão sua fonte sendo 25px do formato ARIAL
        ctx.font = "25px ARIAL"

        // renderizamos um texto que nesse caso será da variável x do player
        ctx.fillText("x: " + this.x.toFixed(2), this.x, this.y - this.height) // toFixed(2) só pra deixar ele mostar 2 casas depois da vírgula
        // renderizamos um texto que nesse caso será da variável y do player
        ctx.fillText("y: " + this.y.toFixed(2), this.x, this.y - (this.height / 2)) // toFixed(2) só pra deixar ele mostar 2 casas depois da vírgula

        // vamor mudar a cor de renderização para caso ocorra uma colisão no player se ocorrer a cor será vermelha, se não cinza
        ctx.fillStyle = colisao ? "red" : "gray"

        // vamor renderizar um quadrado de colisão para ver a colisão ocorrendo no sprite
        ctx.fillRect(this.x , this.y , this.width , this.height)

        const frameRate =  parseInt(1000 / limiteFPS) / 100  // para calcular a alteração dos sprites vamos pegar o coeficiente dos FPS

        // se animação for a padrão ou valor d eindex seja maior do que limite de linhas que no caso é 2 ou movimentando não esteja acontecendo
        if (this.animacao == "default" || this.sprites.index >= 2 || !this.movimentando) {

            this.sprites.index = 0  // então o index será 0

        } else { // se não

            this.sprites.index += frameRate // somamos o index atual mais o frameRate 

        }

        // se o sprite index for um número inteiro então vamo pegar o valor index, se não pegamos o valor depois da virgula 
        const index = Number.isInteger(this.sprites.index) ? this.sprites.index : parseInt(this.sprites.index.toString())

        // pegamos o sprite apartir da da animação e index absoluto
        const sprite = this.sprites[this.nome][this.animacao][index]

        /* 
        
            o drawImage é uma função que renderiza imagens e ela possui 3 variações,
            mas nesse caso será a variação de corte que funciona assim:

            drawImage(

                imagem que vai ser manipulada,
                posição X inicial de corte,
                posição Y inicial de corte,
                largura do corte,
                altura do corte,
                posição X da imagem renderizada no canvas,
                posição Y da imagem renderizada no canvas,
                largura da imagem renderizada no canvas,
                altura da imagem renderizada no canvas

            )

            EXEMPLO 

            index = 0
            animacao = "default"
            movimentando = true
            nome = "firered"

            Player
            x = 0
            y = 0
            width = 50
            height = 50

            sprites["firered"]["default"][0] = {

                x: 0,
                y: 39,
                width: 14,
                height: 19

            }

            drawImage(

                firered.png,
                0,
                39,
                14,
                19,
                0,
                0,
                50,
                50

            )
        
        */
        ctx.drawImage(imagens[this.nome], sprite.x, sprite.y, sprite.width, sprite.height, this.x, this.y, this.width, this.height)

    }

}
