import Event from '../event';
import '../assets/styles.scss';
import { Move } from '../types';

class View {

    playEvent:Event
    cells:HTMLDivElement[] | undefined
    message:HTMLDivElement | undefined
    
    constructor() {
        this.playEvent = new Event();
    }

    render() {
        const board = document.createElement('div');
        board.className = 'board';

        this.cells = Array(9).fill(0).map((_, i) => {
            const cell = document.createElement('div');
            cell.className = 'cell';

            cell.addEventListener('click', () => {
                this.playEvent.trigger(i);
            });

            board.appendChild(cell);

            return cell;
        });

        this.message = document.createElement('div');
        this.message.className = 'message';

        document.body.appendChild(board);
        document.body.appendChild(this.message);
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
}

export default View;