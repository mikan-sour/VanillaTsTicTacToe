import { describe, expect, beforeEach, afterEach, vi, it } from "vitest";
import TicTacToe from "../model";

let game: TicTacToe;

describe("instantiating a game (testing the constructor)", () => {
  beforeEach(() => {
    game = new TicTacToe();
  });
  it("should create a new game with an empth board and X is the first player", () => {
    expect(game.currentPlayer).toEqual("X");
    let i = 0;
    while (i < 9) {
      expect(game.board[i] == "0").toBeTruthy();
      i++;
    }
    expect(game.finished).not.toBeTruthy();
  });
});

describe("switch player", () => {
  beforeEach(() => {
    game = new TicTacToe();
  });

  it("should switch player", () => {
    expect(game.currentPlayer).toBe("X");
    game.switchPlayer();
    expect(game.currentPlayer).toBe("O");
    game.switchPlayer();
    expect(game.currentPlayer).toBe("X");
  });
});

describe("victory", () => {
  const tt = [
    ["X", "X", "X", "", "", "", "", "", ""],
    ["", "", "", "X", "X", "X", "", "", ""],
    ["", "", "", "", "", "", "X", "X", "X"],
    ["X", "", "", "X", "", "", "X", "", ""],
    ["", "X", "", "", "X", "", "", "X", ""],
    ["", "", "X", "", "", "X", "", "", "X"],
    ["X", "", "", "", "X", "", "", "", "X", ""],
    ["", "", "X", "", "X", "", "X", "", "", ""],
  ];

  tt.forEach((test) => {
    beforeEach(() => {
      game.board = test;
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("check for victory", () => {
      const spy = vi.spyOn(game.victoryEvent, "trigger");
      expect(game.victory()).toBe(true);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith("X");
    });
  });
});

describe("when victory event fires", () => {
  beforeEach(() => {
    game = new TicTacToe();
    game.board = ["X", "X", "X", "O", "X", "O", "X", "O", "X"];
    game.finished = true;
  });
  it("will make 'finished' == false && board is empty", () => {
    game.restart();
    let i = 0;
    while (i < 9) {
      expect(game.board[i] == "0").toBeTruthy();
      i++;
    }
    expect(game.finished).not.toBeTruthy();
  });
});

describe("when all rows in the board are a character", () => {
  beforeEach(() => {
    game = new TicTacToe();
  });
  it("will result in a draw", () => {
    const spy = vi.spyOn(game.drawEvent, "trigger");
    game.draw();
    expect(spy).toHaveBeenCalledTimes(0);
    expect(game.finished).toBe(false);
    game.board = "theboard!".split("");
    game.draw();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("play", () => {
  beforeEach(() => {
    game = new TicTacToe();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("will return false because the game is finished", () => {
    game.finished = true;
    const res = game.play(1);
    expect(res).toBe(false);
  });

  it("will return false because the move argument is less than 0", () => {
    const res = game.play(-1);
    expect(res).toBe(false);
  });

  it("will return false because the move argument is greater than 8", () => {
    const res = game.play(9);
    expect(res).toBe(false);
  });

  it("will return false because the move has already been made", () => {
    let res = game.play(1);
    expect(res).toBe(true);
    res = game.play(1);
    expect(res).toBe(false);
  });

  it("will update the cell", () => {
    const spy = vi.spyOn(game.updateCellEvent, "trigger");
    const res = game.play(1);
    expect(game.board[1]).toEqual("X");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ move: 1, player: "X" });
    expect(game.finished).toBe(false);
    expect(res).toBe(true);
    expect(game.currentPlayer).toEqual("O");
  });
});
