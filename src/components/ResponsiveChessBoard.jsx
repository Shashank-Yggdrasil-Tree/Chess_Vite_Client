import { Box } from '@mui/material';
import { Chessboard } from 'react-chessboard';
import React from 'react';

const chessBoardStyle = {
	borderRadius: '5px',
	boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
};

const Piece = ({ pieceType }) => (
	<div className="max-w-20">
		<img src={`chess_com_pieces/${pieceType}.svg`} alt="piece" />
	</div>
);

const generateCustomPieces = () => {
	const pieceTypes = ['bK', 'bQ', 'bR', 'bB', 'bN', 'bP', 'wK', 'wQ', 'wR', 'wB', 'wN', 'wP'];

	const customPieces = {};
	pieceTypes.forEach((type) => {
		customPieces[type] = () => <Piece pieceType={type} />;
	});

	return customPieces;
};

const ResponsiveChessBoard = ({
	id,
	position,
	onPieceDrop,
	boardOrientation = 'white',
	styled = false,
	customClassName = 'max-w-lg max-h-lg grow',
}) => {
	return (
		<Box className={customClassName}>
			<Chessboard
				customBoardStyle={chessBoardStyle}
				id={id}
				position={position}
				onPieceDrop={onPieceDrop}
				boardOrientation={boardOrientation}
				customPieces={generateCustomPieces()}
				// If styled then show a styled chessboard with a theme of green and white like chess.com or default theme
				{...(styled
					? {
							customBoardStyle: {
								borderRadius: '4px',
								boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
							},
							customDarkSquareStyle: { backgroundColor: '#779952' },
							customLightSquareStyle: { backgroundColor: '#edeed1' },
					  }
					: {})}
			/>
		</Box>
	);
};

export default ResponsiveChessBoard;
