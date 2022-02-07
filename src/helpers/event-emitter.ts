import EventEmitter from "events";

export const emitter = new EventEmitter();

export const addEventListener = () => {
  emitter.on("newUser", (msg) => {
    console.log(`new user registered, ${msg}`);
  });
}

