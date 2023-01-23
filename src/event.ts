import { Listener } from "./types";

class Event {
    listeners:Listener[]
    constructor() {
      this.listeners = [];
    }
  
    addListener(listener:Listener) {
      this.listeners.push(listener);
    }

    trigger<T>(params?:T) {
      this.listeners.forEach((listener) => listener(params as never));
    }
  }
  
  export default Event;