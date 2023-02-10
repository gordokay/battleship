export default class Event {
  static events = {};
  static subscribe(obj, event, handler, args) {
    const subscriber = {
      sub: obj,
      fn: handler,
      args: args ? [...args] : []
    }
    if(!Event.events[event]) {
      Event.events[event] = {
        subscribers: []
      }
    }
    Event.events[event].subscribers.push(subscriber);
  }

  static unsubscribe(obj, event) {
    if(!Event.events[event]) return;
    let i = 0;
    for(let subscriber of Event.events[event].subscribers) {
      if(subscriber.sub === obj) {
        Event.events[event].subscribers.splice(i, 1);
        return;
      }
      i++;
    }
  }

  static emit(event, data) {
    for(let subscriber of Event.events[event].subscribers) {
      if(data) subscriber.fn.call(subscriber.obj, data, ...subscriber.args);
      else subscriber.fn.call(subscriber.obj, ...subscriber.args)
    }
  }
}