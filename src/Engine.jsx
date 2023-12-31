class Engine {
  constructor() {
    this.stockfish = new Worker("./stockfish.js");
    this.onMessage = (callback) => {
      this.stockfish.addEventListener("message", (e) => {
        const bestMove = e.data?.match(/bestmove\s+(\S+)/)?.[1];
        const positionEvaluation = e.data?.match(/cp\s+(\S+)/)?.[1];
        const possibleMate = e.data?.match(/mate\s+(\S+)/)?.[1];
        const pv = e.data?.match(/ pv\s+(.*)/)?.[1];
        const depth = Number(e.data?.match(/ depth\s+(\S+)/)?.[1]) ?? 0;

        callback({ bestMove, positionEvaluation, possibleMate, pv, depth });
      });
    };
    // Init engine
    this.stockfish.postMessage("uci");
    this.stockfish.postMessage("isready");
  }

  evaluatePosition(fen, depth) {
    this.stockfish.postMessage(`position fen ${fen}`);
    this.stockfish.postMessage(`go depth ${depth}`);
  }
  stop() {
    this.stockfish.postMessage("stop"); // Run when changing positions
  }
  quit() {
    this.stockfish.postMessage("quit"); // Good to run this before unmounting.
  }
}

export default Engine;
