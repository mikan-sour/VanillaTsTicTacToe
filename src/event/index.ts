import { Listener, ListenerParams } from "../types";

class Event {
    listeners:Listener[]
    constructor() {
      this.listeners = [];
    }
  
    addListener(listener:Listener) {
      this.listeners.push(listener);
    }
  
    trigger(params?:ListenerParams) {
      this.listeners.forEach((listener) => listener(params as never));
    }
  }
  
  export default Event;