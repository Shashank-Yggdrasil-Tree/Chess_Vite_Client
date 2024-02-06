import { useEffect, useMemo, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import Engine from '../Engine';

const StockfishVsStockfish = () => {
	const engine = useMemo(() => new Engine(), []);
	const game = useMemo(() => new Chess(), []);
	const [chessBoardPosition, setChessBoardPosition] = useState(game.fen());

	function findBestMove() {
		engine.evaluatePosition(game.fen(), 10);
		engine.onMessage(({ bestMove }) => {
			if (bestMove) {
				game.move({
					from: bestMove.substring(0, 2),
					to: bestMove.substring(2, 4),
					promotion: bestMove.substring(4, 5),
				});

				setChessBoardPosition(game.fen());
			}
		});
	}

	useEffect(() => {
		if (!game.isGameOver() || game.isDraw()) {
			setTimeout(findBestMove, 300);
		}
	}, [chessBoardPosition]);

	return <Chessboard position={chessBoardPosition} />;
};

export default StockfishVsStockfish;
