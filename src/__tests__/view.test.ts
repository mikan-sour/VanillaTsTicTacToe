import { describe, expect, beforeEach, it } from 'vitest';
import View from '../view';

/**
 * @vitest-environment jsdom
*/

document.body.innerHTML = "<body></body>"

describe("instantiate the view and render", () => {
    let view:View
    beforeEach(() => {
        view = new View()
        view.render()
    })
    afterEach(() => {
        view = new View()
    })
    it("appends to the body", () => {
        const spy = vi.spyOn(view.playEvent, 'trigger')
        expect(document.body.querySelector("div")?.className).toBe('board')
        const cells = document.querySelectorAll(".board > .cell") as NodeListOf<HTMLElement>
        expect(cells.length).toBe(9);
        expect(document.getElementsByClassName('message')[0].className).not.toBeNull()
        expect(document.getElementsByClassName('restartButton')[0]).not.toBeNull()

        cells[0].click()
        expect(spy).toHaveBeenCalledOnce()

    })
})

describe("how the view will handle a draw", () => {
    let view:View
    beforeEach(() => {
        view = new View()
    })
    afterEach(() => {
        view = new View()
    })
    it("will do nothing if message isn't defined", () => {
        view.draw()
        expect(view.message?.innerHTML).toBe(undefined)
    })
    it("will fill in a message if the view is defined", () => {
        view.render()
        view.draw()
        expect(view.message?.innerHTML).toBe("It's a draw!")
    })
})

describe("how the view will handle a victory", () => {
    let view:View
    beforeEach(() => {
        view = new View()
    })
    afterEach(() => {
        view = new View()
    })
    it("will do nothing if message isn't defined", () => {
        view.victory(1)
        expect(view.message?.innerHTML).toBe(undefined)
    })
    it("will fill in a message if the view is defined", () => {
        view.render()
        view.victory(1)
        expect(view.message?.innerHTML).toBe("1 wins!")
    })
})

describe("how the view will handle a cell update", () => {
    let view:View
    beforeEach(() => {
        view = new View()
    })
    afterEach(() => {
        view = new View()
    })
    it("will do nothing if message isn't defined", () => {
        view.updateCell({player:'X',move:1})
        expect(view.cells).toBe(undefined)
    })
    it("will do a move if the view is defined", () => {
        view.render()
        view.updateCell({player:'X',move:1})
        view.updateCell({player:'O',move:2})
        expect(document.getElementsByClassName('x-move').length).toBe(1)
        expect(document.getElementsByClassName('o-move').length).toBe(1)
    })
})

describe("how the view will handle a restart", () => {
    let view:View
    beforeEach(() => {
        view = new View()
        
    })

    it("does nothing because the view isn't rendered", () => {
        view.restart()
        expect(view.cells).toBe(undefined)
    })

    it("will do a move if the view is defined", () => {
        view.render()
        view.updateCell({player:'X',move:1})
        view.updateCell({player:'O',move:2})

        view.restart()
        view.cells?.forEach(c => {
            expect(c.classList.contains("x-move")).toBe(false);
            expect(c.classList.contains("o-move")).toBe(false);
            expect(c.innerHTML).toEqual('')
        })
       expect(view.message?.innerHTML).toEqual('')
    })
})


