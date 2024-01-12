'use strict'

const imgCasino = ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg'];
let flag;

class Casino {
    constructor() {
        this.win = document.querySelectorAll('.tb')
        this.play = document.querySelector('.play')
        this.intervalId = [0, 0, 0, 0];
        this.table = [0, 0, 0, 0]
        this.timeId = 0;
    }

    // прокрутка всех картинок на барабане попытка остановить
    setImgDrum(div, num) {
        // console.log(div)
        // console.log(count, 'count')
        // let stepTime = 0
        this.intervalId[num] = setInterval(() => {
            console.log(flag)
            for (let index = 0; index < 10; index++) {
                let preIndex = index === 9 ? 0 : index + 1;
                if (index === flag) {
                    let preFlag = flag === 9 ? 0 : index + 1;
                    clearInterval(this.intervalId[num])
                    clearTimeout(this.timeId)
                    div.innerHTML = `<img src='img/${flag}.jpg' alt='${flag}' class='twist' />
                         <img src='img/${preFlag}.jpg' alt='${preFlag}' class='hidden twist' />`
                         console.dir(div)
                    // this.table[num] = div.lastElementChild.alt
                    this.table[num] = flag
                    console.log('alt',this.table[num])
                    flag = this.genRandomCount()
                    break
                }
                this.timeId = setTimeout(() => {
                    // stepTime = stepTime + 1
                    // console.log(stepTime, 'stepTime')
                    // console.log(preIndex, 'preindex')
                    div.innerHTML = `<img src='img/${index}.jpg' alt='${index}' class='twist' />
                         <img src='img/${preIndex}.jpg' alt='${preIndex}' class='hidden twist' />`
                }, 80 * (num + 1) * preIndex)
            }
        }, 800)
    }

    // генератор случайных чисел
    genRandomCount() {
        return Math.floor(Math.random() * (10 + 0) + 0)
    }

    //  закрепляем за кнопкой start оброботчик события
    startStop() {
        // запускаем барабан меняем надпись кнопки
        // let play = document.querySelector('.play')
        // console.log(this.win)

        this.play.addEventListener('click', () => {

            // запускаем барабан
            if (this.play.innerHTML !== `<h2>'STOP'</h2>`) {
                // console.log('start')
                // console.log(this.intervalId,' = this.intervalId')
                this.play.innerHTML = `<h2>'STOP'</h2>`;
                this.win.forEach((item, index) => {
                    this.setImgDrum(item, index);
                })

            }
            // останавливаем барабан
            else if (this.play.innerHTML === `<h2>'STOP'</h2>`) {
                this.play.innerHTML = `<h2>'PLAY'</h2>`
                flag = this.genRandomCount()
                console.log('тыц - ', flag)
                // this.win.forEach((item, index) => {
                //     clearInterval(this.intervalId[index]);

                // this.setImgDrum(item, index, this.genRandomCount())
                // })

                // clearInterval(this.intervalId)

            }
        })
        this.genFin()
        console.log(this.table)
    }

    genFin() {
        this.win.forEach((item, index) => {
            let preIndex = this.table[index] === 9 ? 0 : this.table[index] + 1;
            console.log(item)
            this.timeId = setTimeout(() => {
                // stepTime = stepTime + 1
                // console.log(stepTime, 'stepTime')
                // console.log(preIndex, 'preindex')
                item.innerHTML = `<img src='img/${this.table[index]}.jpg' alt='${this.table[index]}' class='twist' />
            <img src='img/${preIndex}.jpg' alt='${preIndex}' class='hidden twist' />`
            }, 80 * preIndex)
        })
        console.log(this.table)
    }

    init() {
        console.dir(this)
        this.startStop()
        this.genFin()
        
        // запускаем слушателя на выполнение анимации и после анимации удаляем отработавший анимацию элемент
        // addEventListener("animationend", (event) => { event.target.remove() });
    }

}