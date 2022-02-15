export type Move = {
    player: string,
    move:number
}

export type ListenerParams = string|number|Move|undefined|never;

type MoveListener = (move:number)=>void
type DataListener = (data:Move)=>void
type WinnerListener = (winner:string)=>void
export type Listener = MoveListener|DataListener|WinnerListener
