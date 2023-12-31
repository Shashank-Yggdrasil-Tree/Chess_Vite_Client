import { Chess } from "chess.js";
import { useMemo, useState } from "react";
import ResponsiveChessBoard from "../ResponsiveChessBoard/ResponsiveChessBoard";
import Engine from "../../Engine";
import { Box } from "@mui/material";
import ChessBoardButton from "../ChessBoardButton/ChessBoardButton";

const PlayWithComputer = () => {
  const levels = {
    "Easy 🤓": 2,
    "Medium 🧐": 8,
    "Hard 😵": 18,
  };
  const engine = useMemo(() => new Engine(), []);
  const game = useMemo(() => new Chess(), []);

  const [gamePosition, setGamePosition] = useState(game.fen());
  const [stockfishLevel, setStockfishLevel] = useState(2);

  function findBestMove() {
    engine.evaluatePosition(game.fen(), stockfishLevel);

    engine.onMessage(({ bestMove }) => {
      if (bestMove) {
        // In latest chess.js versions you can just write ```game.move(bestMove)```
        game.move({
          from: bestMove.substring(0, 2),
          to: bestMove.substring(2, 4),
          promotion: bestMove.substring(4, 5),
        });

        setGamePosition(game.fen());
      }
    });
  }

  function onDrop(sourceSquare, targetSquare, piece) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    });
    setGamePosition(game.fen());

    // illegal move
    if (move === null) return false;

    // exit if the game is over
    if (game.isGameOver() || game.isDraw()) return false;

    findBestMove();

    return true;
  }

  return (
    <>
      <Box style={{ width: "-webkit-fill-available" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          {Object.entries(levels).map(([level, depth]) => (
            <button
              className="chessButton"
              style={{
                backgroundColor:
                  depth === stockfishLevel ? "#B58863" : "#f0d9b5",
              }}
              onClick={() => setStockfishLevel(depth)}
            >
              {level}
            </button>
          ))}
        </div>

        <ResponsiveChessBoard
          id="PlayVsStockfish"
          position={gamePosition}
          onPieceDrop={onDrop}
        />

        <ChessBoardButton
          onClick={() => {
            game.reset();
            setGamePosition(game.fen());
          }}
        >
          New game
        </ChessBoardButton>
        <ChessBoardButton
          onClick={() => {
            game.undo();
            game.undo();
            setGamePosition(game.fen());
          }}
        >
          Undo
        </ChessBoardButton>
      </Box>
    </>
  );
};

export default PlayWithComputer;
