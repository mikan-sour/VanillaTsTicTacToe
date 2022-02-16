import Event from './event';
import './assets/styles.scss';
import { Move } from './types';

class View {

    playEvent:Event
    restartEvent:Event
    board:HTMLDivElement
    cells:HTMLDivElement[] | undefined
    message:HTMLDivElement | undefined
    restartButton:HTMLButtonElement | undefined
    
    constructor() {
        this.board = document.createElement('div');
        this.playEvent = new Event();
        this.restartEvent = new Event();
    }

    render() {
        this.board.className = 'board';

        this.cells = Array(9).fill(0).map((_, i) => {
            const cell = document.createElement('div');
            cell.className = 'cell';

            cell.addEventListener('click', () => {
                this.playEvent.trigger(i);
            });

            this.board.appendChild(cell);

            return cell;
        });

        this.message = document.createElement('div');
        this.message.className = 'message';

        // restart button
        this.restartButton = document.createElement('button');
        this.restartButton.innerText = 'RESTART';
        this.restartButton.className = 'restartButton';
        this.restartButton.addEventListener('click',()=> this.restartEvent.trigger())

        document.body.appendChild(this.board);
        document.body.appendChild(this.message);
        this.board.appendChild(this.restartButton);

    }

    updateCell(data: Move) {
        if(!this.cells)return;
        this.cells[data.move].innerHTML = data.player;
        this.cells[data.move].classList.add(
            data.player === 'O' ? 'o-move' : 'x-move'
        );
        
    }

    victory(winner: any) {
        if(!this.message) return;
        this.message.innerHTML = `${winner} wins!`;
    }

    draw() {
        if(!this.message) return;
        this.message.innerHTML = "It's a draw!";
    }

    restart(){
        // this.board.remove();
        // go through cells and remove innerHTML and class
        this.cells?.forEach(cell => {
            cell.classList.remove('o-move');
            cell.classList.remove('x-move');
            cell.innerHTML = '';
        })
    }
}

export default View;