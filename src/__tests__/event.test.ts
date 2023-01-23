/* eslint @typescript-eslint/no-unused-vars: 0  */
import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import Event from "../event";
import { DataListener, Move, MoveListener, WinnerListener } from "../types";

let event: Event;
let move: MoveListener;
let data: DataListener;
let winningMove: WinnerListener;

describe("move event", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    move = () => null;
    event = new Event();
    event.addListener(move);
  });

  it("executes a move", () => {
    const ml = (_move: number) => {
        return (move: number) => {
          console.log(move);
          return;
        };
      };
    const spy = vi.spyOn(event, "trigger");
    event.trigger<MoveListener>(ml(2));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("data event", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    data = () => null;
    event = new Event();
    event.addListener(data);
  });

  it("executes a data move", () => {
    const et = (_data: Move) => {
        return (data: Move) => {
          console.log(data);
          return;
        };
      };
    const spy = vi.spyOn(event, "trigger");
    event.trigger<DataListener>(et({ player: "X", move: 2 }));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("winner event", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    winningMove = () => null;
    event = new Event();
    event.addListener(winningMove);
  });

  it("executes a winning move", () => {
    const wl = (_str: string) => {
      return (str: string) => {
        console.log(str);
        return;
      };
    };
    const spy = vi.spyOn(event, "trigger");
    event.trigger<WinnerListener>(wl("X"));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
