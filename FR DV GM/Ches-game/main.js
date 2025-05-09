// ... oldingi kod shu yerda qoladi ...

function switchTurn() {
  currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
  currentPlayerDisplay.textContent = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s Turn`;

  if (currentPlayer === 'black') {
    setTimeout(botMove, 500); // Botga biroz "fikrlash" vaqti
  }
}

function botMove() {
  const squares = Array.from(document.querySelectorAll('#board div'));
  const blackPieces = squares.filter(sq => {
    const piece = sq.textContent;
    return piece && !isWhitePiece(piece);
  });

  const validMoves = [];

  blackPieces.forEach(pieceSquare => {
    const start = getSquarePosition(pieceSquare);
    squares.forEach(targetSquare => {
      const end = getSquarePosition(targetSquare);
      const piece = pieceSquare.textContent;
      const targetPiece = targetSquare.textContent;
      if (validateMove(start, end, piece, targetPiece)) {
        validMoves.push({ from: pieceSquare, to: targetSquare });
      }
    });
  });

  if (validMoves.length > 0) {
    const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
    makeMove(randomMove.to, randomMove.from);
    switchTurn();
  } else {
    alert("Black (bot) has no valid moves!");
  }
}

// O‘yinchi yurganidan keyin navbatni o‘zgartirish:
function handleSquareClick(event) {
  const square = event.target;
  const piece = square.textContent;
  
  if (selectedPiece) {
    if (square !== selectedPiece) {
      const startPos = getSquarePosition(selectedPiece);
      const endPos = getSquarePosition(square);
      const movingPiece = selectedPiece.textContent;
      const isValidMove = validateMove(startPos, endPos, movingPiece, square.textContent);
      
      if (isValidMove) {
        makeMove(square, selectedPiece);
        switchTurn(); // <-- bu yerga o‘zgartirish kiritildi
      }
    }
    selectedPiece.classList.remove('bg-blue-300');
    selectedPiece = null;
  } else if (piece) {
    const pieceIsWhite = isWhitePiece(piece);
    if ((currentPlayer === 'white' && pieceIsWhite)) {
      selectedPiece = square;
      square.classList.add('bg-blue-300');
    }
  }
}

createBoard();
