export class ServerError extends Error {
    constructor(){
        super();
        this.message = "Car has been stopped suddenly. It's engine was broken down.";
    }
}
export class RequestError extends Error {
    constructor(){
        super();
        this.message = "Drive already in progress. You can't run drive for the same car twice while it's not stopped.";
    }
}