import { describe, expect, beforeEach, vi, it } from "vitest";
import Controller from "../controller";

/**
 * @vitest-environment jsdom
 */
document.body.innerHTML = "<body></body>";

let ctr: Controller;

describe("the controller", () => {
  beforeEach(() => {
    ctr = new Controller();
    ctr.run();
    expect(ctr.view.board.classList.contains("board")).toBe(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("dispatches events from model to view/view to model when play event happens", () => {
    const playSpy = vi.spyOn(ctr.model, "play");
    const updateCellSpy = vi.spyOn(ctr.view, "updateCell");

    const cell = document.querySelectorAll(".board > .cell")[0] as HTMLElement;
    cell.click();
    expect(playSpy).toHaveBeenCalledTimes(1);
    expect(updateCellSpy).toHaveBeenCalledTimes(1);

    const restartSpy = vi.spyOn(ctr, "restart");
    const restartButton = document.getElementsByClassName(
      "restartButton"
    )[0] as HTMLButtonElement;
    restartButton.click();
    expect(restartSpy).toHaveBeenCalledOnce();
  });

  it("dispatches a victory event", () => {
    const victorySpy = vi.spyOn(ctr.view, "victory");
    ctr.model.board = ["X", "X", "X", "", "", "", "", "", ""];
    ctr.model.play(4);
    expect(victorySpy).toHaveBeenCalledOnce();
  });

  it("restarts the app", () => {
    expect(ctr.view.board.classList.contains("board")).toBe(true);
    ctr.view.victory("X");
    expect(ctr.view.message?.innerHTML).toEqual("X wins!");

    ctr.restart();
    expect(ctr.view.message?.innerHTML).toEqual("");
  });
});
