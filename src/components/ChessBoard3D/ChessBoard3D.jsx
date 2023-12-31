import React, { useMemo, useState } from "react";
import Engine from "../../Engine";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import ChessBoardButton from "../ChessBoardButton/ChessBoardButton";
import { Box } from "@mui/material";

const ChessBoard3D = () => {
  const engine = useMemo(() => new Engine(), []);
  const game = useMemo(() => new Chess(), []);

  const [gamePosition, setGamePosition] = useState(game.fen());

  function findBestMove() {
    engine.evaluatePosition(game.fen());

    engine.onMessage(({ bestMove }) => {
      if (bestMove) {
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

  const [activeSquare, setActiveSquare] = useState("");

  const threeDPieces = useMemo(() => {
    const pieces = [
      { piece: "wP", pieceHeight: 1 },
      { piece: "wN", pieceHeight: 1.2 },
      { piece: "wB", pieceHeight: 1.2 },
      { piece: "wR", pieceHeight: 1.2 },
      { piece: "wQ", pieceHeight: 1.5 },
      { piece: "wK", pieceHeight: 1.6 },
      { piece: "bP", pieceHeight: 1 },
      { piece: "bN", pieceHeight: 1.2 },
      { piece: "bB", pieceHeight: 1.2 },
      { piece: "bR", pieceHeight: 1.2 },
      { piece: "bQ", pieceHeight: 1.5 },
      { piece: "bK", pieceHeight: 1.6 },
    ];

    const pieceComponents = {};
    pieces.forEach(({ piece, pieceHeight }) => {
      pieceComponents[piece] = ({ squareWidth, square }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            position: "relative",
            pointerEvents: "none",
          }}
        >
          <img
            src={`/3d-pieces/${piece}.webp`}
            alt={piece}
            width={squareWidth}
            height={pieceHeight * squareWidth}
            style={{
              position: "absolute",
              bottom: `${0.2 * squareWidth}px`,
              objectFit: piece[1] === "K" ? "contain" : "cover",
            }}
          />
        </div>
      );
    });
    return pieceComponents;
  }, []);

  return (
    <>
      <Box style={{ width: "-webkit-fill-available" }}>
        <ChessBoardButton
          onClick={() => {
            game.reset();
            setGamePosition(game.fen());
          }}
        >
          Reset
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
        <Chessboard
          id="Styled3DBoard"
          position={gamePosition}
          onPieceDrop={onDrop}
          customBoardStyle={{
            transform: "rotateX(27.5deg)",
            transformOrigin: "center",
            border: "16px solid #b8836f",
            borderStyle: "outset",
            borderRightColor: " #b27c67",
            borderRadius: "4px",
            boxShadow: "rgba(0, 0, 0, 0.5) 2px 24px 24px 8px",
            borderRightWidth: "2px",
            borderLeftWidth: "2px",
            borderTopWidth: "0px",
            borderBottomWidth: "18px",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            padding: "8px 8px 12px",
            background: "#e0c094",
            backgroundImage: 'url("wood-pattern.png")',
            backgroundSize: "cover",
          }}
          customPieces={threeDPieces}
          customLightSquareStyle={{
            backgroundColor: "#e0c094",
            backgroundImage: 'url("wood-pattern.png")',
            backgroundSize: "cover",
          }}
          customDarkSquareStyle={{
            backgroundColor: "#865745",
            backgroundImage: 'url("wood-pattern.png")',
            backgroundSize: "cover",
          }}
          animationDuration={500}
          customSquareStyles={{
            [activeSquare]: {
              boxShadow: "inset 0 0 1px 6px rgba(255,255,255,0.75)",
            },
          }}
          onMouseOverSquare={(sq) => setActiveSquare(sq)}
          onMouseOutSquare={(sq) => setActiveSquare("")}
        />
      </Box>
    </>
  );
};

export default ChessBoard3D;
