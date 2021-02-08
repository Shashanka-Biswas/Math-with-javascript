const rowNumberInputdiv = document.querySelector('#rowNumber');
const colNumberInputdiv = document.querySelector('#colNumber');
const createMatrixButton = document.querySelector('#creatMatrix');

createMatrixButton.addEventListener('click', inputMatrixMaker);
document.addEventListener('keydown', (e)=>{
    if ( e.code === 'Enter'){
        inputMatrixMaker();

    }
    console.log(e.code);
})

function inputMatrixMaker() {
    const inputMatrixHolderDiv = document.querySelector('#inputMatrixHolder');
    inputMatrixHolderDiv.innerHTML = null;

    const rownumber = rowNumberInputdiv.value;
    const colNumber = colNumberInputdiv.value;
    const cellNumber = rownumber * colNumber;

    // creating html elements
    const matrix = document.createElement('div');
    matrix.classList.add('matrix');
    matrix.style.gridTemplateColumns = `repeat(${colNumber}, auto)`;

    for (let i = 1; i <= rownumber; i++) {
        for (let j = 1; j <= colNumber; j++) {
            const input = document.createElement('input');
            input.id = `c${i}${j}`;
            matrix.appendChild(input);
        }
    }

    const generatingButton = document.createElement('button');
    generatingButton.id = 'calculate';
    generatingButton.innerText = 'Generate Gaussian elemination';
    inputMatrixHolderDiv.appendChild(matrix);
    inputMatrixHolderDiv.appendChild(generatingButton);

}

// matrix generetor
function matrixGeneretor()