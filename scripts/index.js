$(function() {
	var originBoard = ['', '', '', '', '', '', '', '', ''];
	var huPlayer = 'x';
	var roboPlayer = 'o';

	function emptyIndices(board){
		return board.filter(s => s != huPlayer && s != roboPlayer);
	}

	function winning(board, player) {
		if (
			(board[0] == player && board[1] == player && board[2] == player) || 
			(board[3] == player && board[4] == player && board[5] == player) ||
			(board[6] == player && board[7] == player && board[8] == player) ||
			(board[0] == player && board[3] == player && board[6] == player) ||
			(board[1] == player && board[4] == player && board[7] == player) ||
			(board[2] == player && board[5] == player && board[8] == player) ||
			(board[0] == player && board[4] == player && board[8] == player) ||
			(board[2] == player && board[4] == player && board[6] == player)
			) {
				return true;
			} else {
				return false;
			}
	}

	function isDraw() {
		return emptyIndices(originBoard).length == 0 ? true : false;
	}

	$('table').click(function (event) {
		var target = event.target;
		if (target.tagName != 'TD')
			return;
		
		if (target.textContent != '')
			return;

		if (winning(originBoard, huPlayer) || winning(originBoard, roboPlayer)) {
			return;
		}
	
		target.textContent = huPlayer;
		originBoard[target.getAttribute('data-cellId')] = huPlayer;
		
		if (winning(originBoard, huPlayer)) {
			//alert('Вы выиграли');
			$('h2').html('Вы выиграли');
			$('h2').css('visibility', 'visible');
			return;
		}

		if (isDraw()) {
			//alert('Ничья');
			$('h2').html('Ничья');
			$('h2').css('visibility', 'visible');
			return;
		}
		roboStep();
	});

	function roboStep() {
		//если есть линия с двумя ноликами - ход в свободное поле
		if (RoboSameSymbolsInLine(0, 1, 2) || RoboSameSymbolsInLine(3, 4, 5) || RoboSameSymbolsInLine(6, 7, 8) ||
			RoboSameSymbolsInLine(0, 3, 6) || RoboSameSymbolsInLine(1, 4, 7) || RoboSameSymbolsInLine(2, 5, 8) ||
			RoboSameSymbolsInLine(0, 4, 8) || RoboSameSymbolsInLine(2, 4, 6)) {
		}
		
		//если есть линия с двумя крестиками - ход на своболное поле в этой линии
		else if (HuSameSymbolsInLine(0, 1, 2) || HuSameSymbolsInLine(3, 4, 5) || HuSameSymbolsInLine(6, 7, 8) ||
			HuSameSymbolsInLine(0, 3, 6) || HuSameSymbolsInLine(1, 4, 7) || HuSameSymbolsInLine(2, 5, 8) ||
			HuSameSymbolsInLine(0, 4, 8) || HuSameSymbolsInLine(2, 4, 6)) {
		}		

		//если центр свободен - занять его
		else if (originBoard[4] == '') {
			originBoard[4] = roboPlayer;
			$('td:eq(' + 4 + ')').text('o');
		}

	    //если центр наш - ставим нолик в центральную вертикаль или горизонталь
	    else if (originBoard[4] == roboPlayer) {
			if (originBoard[1] == roboPlayer && originBoard[7] == '') {
				originBoard[7] = roboPlayer;
				$('td:eq(' + 7 + ')').text('o');
			}
			else if (originBoard[7] == roboPlayer && originBoard[1] == '') {
				originBoard[1] = roboPlayer;
				$('td:eq(' + 1 + ')').text('o');
			}
			else if (originBoard[3] == roboPlayer && originBoard[5] == '') {
				originBoard[5] = roboPlayer;
				$('td:eq(' + 5 + ')').text('o');
			}
			else if (originBoard[5] == roboPlayer && originBoard[3] == '') {
				originBoard[3] = roboPlayer;
				$('td:eq(' + 3 + ')').text('o');
			}
			else if (originBoard[1] == '') {
				originBoard[1] = roboPlayer;
				$('td:eq(' + 1 + ')').text('o');
			}
			else if (originBoard[3] == '') {
				originBoard[3] = roboPlayer;
				$('td:eq(' + 3 + ')').text('o');
			}
			else if (originBoard[5] == '') {
				originBoard[5] = roboPlayer;
				$('td:eq(' + 5 + ')').text('o');
			}
			else if (originBoard[7] == '') {
				originBoard[7] = roboPlayer;
				$('td:eq(' + 7 + ')').text('o');
			}
			//иначе если горизонталь или вертикаль занята - ставим нолик в свободный угол
			else {
				while (true) {
					let cellNumber = Math.floor(Math.random() * 9);
					if (originBoard[cellNumber] == '' && cellNumber == 0 || cellNumber == 2 || cellNumber == 6 || cellNumber == 8) {
						originBoard[cellNumber] = roboPlayer;
						$('td:eq(' + cellNumber + ')').text('o');
						break;
					}
				}
			}
		}
		
		//если крестики первым ходом сходили в центр
		else if (originBoard[4] == huPlayer) {
			while (true) {
				let cellNumber = Math.floor(Math.random() * 9);
				if (originBoard[0] == '' || originBoard[2] == '' || originBoard[6] == '' || originBoard[8] == '') {
					if (originBoard[cellNumber] == '' && (cellNumber == 0 || cellNumber == 2 || cellNumber == 6 || cellNumber == 8)) {
						originBoard[cellNumber] = roboPlayer;
						$('td:eq(' + cellNumber + ')').text('o');
					break;
					}
				}
				else if (originBoard[cellNumber] == '') {
					originBoard[cellNumber] = roboPlayer;
					$('td:eq(' + cellNumber + ')').text('o');
					break;
				}
			}
		}

		if (winning(originBoard, roboPlayer)) {
			$('h2').html('Вы проиграли');
			$('h2').css('visibility', 'visible');
			return;
		}

		if (isDraw()) {
			$('h2').html('Ничья');
			$('h2').css('visibility', 'visible');
			return;
		}
	}

	//есть ли два одинаковых символа в линии
	function HuSameSymbolsInLine(a, b, c) {
		if (originBoard[a] == huPlayer && originBoard[b] == huPlayer && originBoard[c] == '') {
			originBoard[c] = roboPlayer;
			$('td:eq(' + c + ')').text('o');
			return true;
		}
		
		if (originBoard[a] == huPlayer && originBoard[c] == huPlayer && originBoard[b] == '') {
			originBoard[b] = roboPlayer;
			$('td:eq(' + b + ')').text('o');
			return true;
		}
		
		if (originBoard[b] == huPlayer && originBoard[c] == huPlayer && originBoard[a] == '') {
			originBoard[a] = roboPlayer;
			$('td:eq(' + a + ')').text('o');
			return true;
		}
		return false;
	}

	function RoboSameSymbolsInLine(a, b, c) {
		if (originBoard[a] == roboPlayer && originBoard[b] == roboPlayer && originBoard[c] == '') {
			originBoard[c] = roboPlayer;
			$('td:eq(' + c + ')').text('o');
			return true;
		}
		
		if (originBoard[a] == roboPlayer && originBoard[c] == roboPlayer && originBoard[b] == '') {
			originBoard[b] = roboPlayer;
			$('td:eq(' + b + ')').text('o');
			return true;
		}
		
		if (originBoard[b] == roboPlayer && originBoard[c] == roboPlayer && originBoard[a] == '') {
			originBoard[a] = roboPlayer;
			$('td:eq(' + a + ')').text('o');
			return true;
		}
		return false;
	}

	//занять свободное место в линии
	function TakeUpSpace(a, b, c, player) {
		if (a == '') {

		}
	}

	 $('button').click(() => {
		$('td').text('');
		for (let i = 0; i < originBoard.length; i++) {
			originBoard[i] = '';
		}
		$('h2').css('visibility', 'hidden');
	 });
});

function OnCellClick(event){
	if ($(this).text() != '')
		return;

	$(this).text(huPlayer);
	alert($(this).closest("td").index());

	if (winning(originBoard, huPlayer)) {
		alert('Победа');
	}
}