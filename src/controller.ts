import View from './view';
import TicTacToe from './model';
import { Move } from './types';

class Controller {
    model: TicTacToe;
    view: View;
    constructor() {
        this.model = new TicTacToe();
        this.view = new View();

        this.view.playEvent.addListener((move: number) => { 
            this.model.play(move); 
        });

        this.model.updateCellEvent.addListener((data: Move) => { 
            this.view.updateCell(data); 
        });

        this.model.victoryEvent.addListener((winner: string) => { 
            this.view.victory(winner); 
        });
        
        this.model.drawEvent.addListener(() => { this.view.draw(); });

        this.view.restartEvent.addListener(()=>{
            this.restart();
        })

    }

    run() {
        this.view.render();
    }

    restart() {
        this.view.restart();
        this.model.restart();
    }
}

export default Controller;