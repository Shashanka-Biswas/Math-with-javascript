const orderNumberInputdiv = document.querySelector('#orderNumber');
const createMatrixButton = document.querySelector('#creatMatrix');
let rownumber = 0; //will be used globally

// Running click and Enter Button click event
createMatrixButton.addEventListener('click', inputMatrixMaker);
document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        inputMatrixMaker();
    }
    // console.log(e.code);
})

// This Function Create A input Matrix for taking client matrix value in the dom or browser
function inputMatrixMaker() {
    const inputMatrixHolderDiv = document.querySelector('#inputMatrixHolder');
    inputMatrixHolderDiv.innerHTML = null; //Clearing this div in every creation for keeping new matrix
    rownumber = parseInt(orderNumberInputdiv.value); //Equatoni order is same as the row or coloumn number & also converting the string value in Integer value
    // const cellNumber = rownumber * rownumber; //Total cell in the matrix

    // creating html elements

    // Creating Equation holder
    const equationHolderDiv = document.createElement('div'); //This div hold the heading equationHolderDiv
    equationHolderDiv.classList.add('equation');
    for (let i = 0; i < rownumber + 2; i++) {
        if (i < rownumber) {
            const equationDiv = document.createElement('div');
            equationDiv.innerHTML = `${(i + 10).toString(36)}x<sup>${rownumber - i}</sup>`; // 36 is the basis, 10=a 11=b and so one
            equationHolderDiv.appendChild(equationDiv)
        } else if (i == rownumber) {
            const equalDiv = document.createElement('div');
            equalDiv.innerHTML = '=';
            equationHolderDiv.appendChild(equalDiv);
        } else if (i == rownumber + 1) {
            const constantDiv = document.createElement('div');
            constantDiv.innerHTML = `${(i + 9).toString(36)}`;
            equationHolderDiv.appendChild(constantDiv);
        }
    }

    // Crating input matrix
    const matrix = document.createElement('div');
    matrix.classList.add('inputMatrix');
    for (j = 0; j < rownumber + 2; j++) {
        if (j == rownumber) {
            const equalDiv = document.createElement('div');
            equalDiv.innerHTML = '=';
            matrix.appendChild(equalDiv);
        } else {
            const inputHolderDiv = document.createElement('div');
            for (k = 0; k < rownumber; k++) {
                const input = document.createElement('input');
                input.type = 'text';
                input.id = `c${j + 1}${k + 1}`;
                inputHolderDiv.appendChild(input);
            }
            matrix.appendChild(inputHolderDiv);
        }
    }

    // Creating Calculate button
    const generatingButton = document.createElement('button');
    generatingButton.id = 'calculate';
    generatingButton.innerText = 'Generate Gaussian elemination';

    // Appending all the div in the input matrix holder
    inputMatrixHolderDiv.appendChild(equationHolderDiv);
    inputMatrixHolderDiv.appendChild(matrix);
    inputMatrixHolderDiv.appendChild(generatingButton);

    // Click event in the Calculation button
    const generateButton = document.querySelector('#calculate');
    generateButton.addEventListener('click', () => {
        console.log(matrixGeneretor());
        console.log(eleminator(matrixGeneretor()));
        console.log(GDelemination(matrixGeneretor()));
    });
}

//It will create a matrix and return it by taking
//the data inputed inside the input matrix array in the browser.
function matrixGeneretor() {
    const inputMatrixIObj = document.querySelectorAll('.inputMatrix input');
    let cellCounter = 0;
    const matrixArr = [];//main matrix, value wiill be put here
    for (let i = 0; i < rownumber; i++) { //Creating the rows, like [[],[],[]]
        matrixArr.push([]);
    }

    for (let i = 0; i < rownumber + 1; i++) {
        matrixArr.forEach((col) => {
            col.push(inputMatrixIObj[cellCounter].value);
            cellCounter++;
        })
    }

    return matrixArr;
}




// // Gaussian Jordan eleminaton Algorithm
// 1.take the diagonal element 
// 2.dividethe row elements by the diagonal element
// 3.for eatch next rows 
//         for eatch elements 
//             i)check if the diagola element are possitive
//             ii) multiply previous row's diagolan element with the present rows element and substtuct that from the present element



//This function make the bottom right 0 triengle o the matrix
function eleminator(matrix) {
    for (let diagonalCellNumber = 0; diagonalCellNumber < matrix.length; diagonalCellNumber++) { // the number of diagola cell are same as the number of row or column of the square matrix
        const diagonalElement = matrix[diagonalCellNumber][diagonalCellNumber];
        for (let cn = 0; cn < matrix[diagonalCellNumber].length; cn++) {
            matrix[diagonalCellNumber][cn] = matrix[diagonalCellNumber][cn] / diagonalElement;
        }
        for (let nextRowCellNumber = diagonalCellNumber + 1; nextRowCellNumber < matrix.length; nextRowCellNumber++) {
            console.log(nextRowCellNumber);
            for (let cn = 0; cn < matrix[diagonalCellNumber].length; cn++) {

                //making the diagnal element positve
                for (i = 0; i < matrix.length; i++) {
                    if (matrix[i][i] < 0) {
                        for (j = 0; j < matrix[i].length; j++) {
                            matrix[i][j] = matrix[i][j] * (-1);
                        }
                    }
                }

                // The math......
                matrix[nextRowCellNumber][cn] = matrix[nextRowCellNumber][cn] - matrix[diagonalCellNumber][cn] * matrix[nextRowCellNumber][diagonalCellNumber];
            }

        }
    }
    // Cheking if any value in diagonal cell is -1. If -1 then multiplying the row with -1.
    for (i = 0; i < matrix.length; i++) {
        if (matrix[i][i] == -1) {
            for (j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = matrix[i][j] * (-1);
            }
        }
    }
    return matrix;
}

//Gauss-Jordan Elemination, only diagonal elemets remain. they are 1
function GDelemination(matrix) {
    for (let diagonalCellNumber = 0; diagonalCellNumber < matrix.length; diagonalCellNumber++) { // the number of diagola cell are same as the number of row or column of the square matrix
        const diagonalElement = matrix[diagonalCellNumber][diagonalCellNumber];
        for (let cn = 0; cn < matrix[diagonalCellNumber].length; cn++) {
            matrix[diagonalCellNumber][cn] = matrix[diagonalCellNumber][cn] / diagonalElement;
        }
        for (let nextRowCellNumber = diagonalCellNumber + 1; nextRowCellNumber < matrix.length; nextRowCellNumber++) {
            for (let cn = 0; cn < matrix[nextRowCellNumber].length; cn++) {

                //making the diagnal element positve
                for (i = 0; i < matrix.length; i++) {
                    if (matrix[i][i] == -1) {
                        for (j = 0; j < matrix[i].length; j++) {
                            matrix[i][j] = matrix[i][j] * (-1);
                        }
                    }
                }

                matrix[nextRowCellNumber][cn] = matrix[nextRowCellNumber][cn] - matrix[diagonalCellNumber][cn] * matrix[nextRowCellNumber][diagonalCellNumber];
            }
        }
    }

    // Cheking if any value in diagonal cell is -1. If -1 then multiplying the row with -1.
    for (i = 0; i < matrix.length; i++) {
        if (matrix[i][i] == -1) {
            for (j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = matrix[i][j] * (-1);
            }
        }
    }
    for (let diagonalCellNumber = matrix.length - 1; diagonalCellNumber >= 0; diagonalCellNumber--) { // the number of diagola cell are same as the number of row or column of the square matrix
        // const diagonalElement = matrix[diagonalCellNumber][diagonalCellNumber];
        // for (let cn = 0; cn < matrix[diagonalCellNumber].length; cn++) {
        //     matrix[diagonalCellNumber][cn] = matrix[diagonalCellNumber][cn] / diagonalElement;
        // }
        for (let beforeLastRowCellNumber = diagonalCellNumber - 1; beforeLastRowCellNumber >= 0; beforeLastRowCellNumber--) {
            for (let cn = matrix[beforeLastRowCellNumber].length - 1; cn >= 0; cn--) {

                //making the diagnal element positve
                for (i = 0; i < matrix.length; i++) {
                    if (matrix[i][i] == -1) {
                        for (j = 0; j < matrix[i].length; j++) {
                            matrix[i][j] = matrix[i][j] * (-1);
                        }
                    }
                }

                matrix[beforeLastRowCellNumber][cn] = matrix[diagonalCellNumber][cn] * matrix[beforeLastRowCellNumber][diagonalCellNumber] - matrix[beforeLastRowCellNumber][cn];
            }
        }
    }

    // Cheking if any value in diagonal cell is -1. If -1 then multiplying the row with -1.
    for (i = 0; i < matrix.length; i++) {
        if (matrix[i][i] == -1) {
            for (j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = matrix[i][j] * (-1);
            }
        }
    }

    return matrix;
}
