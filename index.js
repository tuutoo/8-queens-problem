// 用于存储所有解决方案的数组
let solutions = [];

// 初始化棋盘的函数，参数n为棋盘的尺寸
function initBoard(n) {
  let board = [];
  for (let i = 0; i < n; i++) {
    board[i] = [];
    for (let j = 0; j < n; j++) {
      board[i][j] = 0;  // 初始化所有位置为0，表示没有放置皇后
    }
  }
  return board;
}

// 检查当前位置(row, col)是否可以安全地放置皇后
function isSafe(board, row, col, n) {
  let i, j;
  // 检查该行左边是否有皇后
  for (i = 0; i < col; i++) {
    if (board[row][i] === 1) {
      return false;
    }
  }
  // 检查左上到右下对角线是否有皇后
  for (i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 1) {
      return false;
    }
  }
  // 检查右上到左下对角线是否有皇后
  for (i = row, j = col; i < n && j >= 0; i++, j--) {
    if (board[i][j] === 1) {
      return false;
    }
  }
  return true;  // 如果以上检查都通过，返回true
}

// 主要的递归解决函数
function solveNQUtil(board, col, n) {
  // 如果所有列都成功放置了皇后，则找到一个解决方案
  if (col >= n) {
    let singleSolution = [];
    // 把这个解决方案添加到解决方案列表中
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        singleSolution.push(board[i][j]);
      }
    }
    solutions.push(singleSolution);
    return;
  }
  // 对于每一行，尝试在当前列放置皇后，并递归到下一列
  for (let i = 0; i < n; i++) {
    if (isSafe(board, i, col, n)) {  // 检查是否可以在此处放置皇后
      board[i][col] = 1;  // 放置皇后
      solveNQUtil(board, col + 1, n);  // 递归到下一列
      board[i][col] = 0;  // 回溯：移除刚才放置的皇后
    }
  }
}

// 输出所有解决方案
function printSolutions(solutions, n) {
  let outputDiv = document.getElementById('solutions');
  solutions.forEach((solution, index) => {
    let label = document.createElement('p')
    label.textContent = 'Solution ' + (index + 1);
    let table = document.createElement('table');
    table.border = "1";
    for (let i = 0; i < n; i++) {
      let row = document.createElement('tr');
      for (let j = 0; j < n; j++) {
        let cell = document.createElement('td');
        cell.innerText = solution[i * n + j] === 1 ? 'Q' : '-';  // 如果有皇后则显示'Q'，否则显示'-'
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    outputDiv.appendChild(label);
    outputDiv.appendChild(table);
    outputDiv.appendChild(document.createElement('br'));
  });
}

// 主函数，执行解决方案
function solveNQ() {
  let n = 8;  // 8x8的棋盘
  let board = initBoard(n);  // 初始化棋盘
  solveNQUtil(board, 0, n);  // 开始解决
  printSolutions(solutions, n);  // 输出所有解决方案
}

// 执行主函数
solveNQ();
