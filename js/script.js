'use strict';

const board = document.querySelector('.board');
let items = document.getElementsByClassName('square'); //добавим
let symbol = "X";
let field = [];

const COUNT = 4;
board.style.gridTemplateColumns = `repeat(${COUNT}, 60px)`
board.style.gridTemplateRows = `repeat(${COUNT}, 60px)`

let steps = COUNT ** 2;
let win = false;

for (let i = 0; i < COUNT; i++) {
	field[i] = [];
};


/*
 * [
 *	[00,	01,	02],
 *	[10,	11,	12],
 *	[20,	21,	22],
 *	]
 *
 *	0, 1, 2
 */

function startGame() {
	board.innerHTML = '';
	steps = COUNT ** 2;
	for (let i = 0; i < COUNT ** 2; i++) {
		const square = document.createElement('div');
		square.className = "square";
		square.setAttribute('data-pos', i);
		square.textContent = "";
		fillField(i, '');
		square.addEventListener('click', setStep);
		board.append(square);
	};
}

// console.log(items);


function changeChar(char) {
	// let s;
	// if (char === "X") {
	// 	s = 'O';
	// }else {
	// 	s = 'X';
	// };
	// return s; //альтернативный код

	return char === 'X' ? 'O' : "X";
};

function fillField(n, char) {
	let row = Math.floor(n / COUNT);
	let col = n % COUNT;
	field[row][col] = char;
}

function setStep(e) {

	const el = e.target;
	const pos = el.getAttribute('data-pos');

	if (!el.textContent) {
		steps--;
		el.textContent = symbol;
		fillField(pos, symbol);
		checkWin(symbol);
		symbol = changeChar(symbol);
	};

	if (steps === 0 && !win) {
		setTimeout(function () {
			alert('Ничья!');
			startGame();
		}, 100);
	};

}



function checkWin(s) {
	for (let i = 0; i < COUNT; i++) {
		let flag = true;
		let indexes = [];

		for (let j = 0; j < COUNT; j++) {

			if (field[i][j] === s && flag) { // 10 01 02
				indexes.push(i * COUNT + j);
				if (j === COUNT - 1 && flag) {
					showWin(indexes);
					win = true;
					setTimeout(function () {
						alert(`${s} win!`);
						startGame();
					}, 100);
					break;
				}
			} else {
				flag = false;
				break;
			}
		}

		if (field[0][i] === s && field[1][i] === s && field[2][i] === s) {
			showWin([0 * COUNT + i, 1 * COUNT + i, 2 * COUNT + i])
			win = true;
			setTimeout(function () {
				alert(`${s} win!`);
				startGame();
			}, 100);
		}
	}

	if (field[0][0] === s && field[1][1] === s && field[2][2] === s) {
		showWin([0, 4, 8])
		win = true;
		setTimeout(function () {
			alert(`${s} win!`);
			startGame();
		}, 100);
	}

	if (field[0][2] === s && field[1][1] === s && field[2][0] === s) {
		showWin([2, 4, 6]);
		win = true;
		setTimeout(function () {
			alert(`${s} win!`);
			startGame();
		}, 100);
	}

};

function showWin(posArr) {
	posArr.forEach(pos => {
		items[pos].classList.add('win');
	});

}

startGame();