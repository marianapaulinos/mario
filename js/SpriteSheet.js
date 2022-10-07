/*

    Herança é um princípio de orientação a objetos, que permite que classes compartilhem 
    atributos e métodos, através de heranças. Ela é usada na intenção de reaproveitar 
    código ou comportamento generalizado ou especializar operações ou atributos.

    nesse caso Player herda do SpriteSheet

*/
class SpriteSheet extends Objeto{

    /*

        Quando trabalhamos com herança a superclasse é a classe que herdamos e sub classe é a
        classe que herda da superclasse.
        A subclasse pode sobrescrever métodos da superclasse e, claro, implementar
        seus próprios métodos. 
        Cada classe possui duas referências: o this, que referencia a instância dela mesma e
        o super que referencia a superclasse.

    */
    constructor(x, y, width, height, collisional , nome) {

        super(x , y , width , height , collisional)
        this.nome = nome
        this.animacao = "default" // como animação incial será default
        this.movimentando = false // e o sprite não movimenta inicialmente
        this.sprites = { // sprites seja objeto literal que será os cortes da imagem de sprite

            "firered": { // nome da imagem que será usado no corte

                "baixo": [ // array de animações nos cortes da imagem
                    { x: 0, y: 0, width: 15, height: 19 },
                    { x: 15, y: 0, width: 14, height: 19 },
                    { x: 29, y: 0, width: 15, height: 19 }
                ],

                "cima": [ // array de animações nos cortes da imagem
                    { x: 0, y: 19, width: 15, height: 20 },
                    { x: 15, y: 19, width: 14, height: 20 },
                    { x: 29, y: 19, width: 15, height: 20 }
                ],

                "esquerda": [ // array de animações nos cortes da imagem
                    { x: 0, y: 39, width: 14, height: 19 },
                    { x: 14, y: 39, width: 14, height: 19 },
                    { x: 28, y: 39, width: 16, height: 19 }
                ],
                "direita": [ // array de animações nos cortes da imagem
                    { x: 0, y: 58, width: 15, height: 19 },
                    { x: 16, y: 58, width: 14, height: 19 },
                    { x: 30, y: 58, width: 14, height: 19 }
                ],
                "default": [{ x: 0, y: 39, width: 14, height: 19 }] // array de animações nos cortes da imagem

            },
            index: 0 // em que posição do array a animação está

        }

    }

    render() {

        const frameRate =  parseInt(1000 / limiteFPS) / 100 // para calcular a alteração dos sprites vamos pegar o coeficiente dos FPS

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