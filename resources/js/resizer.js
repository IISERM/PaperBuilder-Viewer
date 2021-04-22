// Query the element
const resizer = document.getElementById('dragMe');
const leftSide = resizer.previousElementSibling;
const rightSide = resizer.nextElementSibling;

let x = 0;
let y = 0;

let leftWidth = 0;

const mouseDownHandler = function (e) {
    console.log("mousedown called");
    x = e.clientX;
    y = e.clientY;
    leftWidth = leftSide.getBoundingClientRect().width;
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function (e) {
    console.log("mouse move");
    const dx = e.clientX - x;
    const dy = e.clientY - y;
    const newLeft = (leftWidth + dx) / resizer.parentNode.getBoundingClientRect().width;
    console.log(newLeft);
    leftSide.style.userSelect = 'none';
    leftSide.style.pointerEvents = 'none';
    rightSide.style.userSelect = 'none';
    rightSide.style.pointerEvents = 'none';
    leftSide.style.flexGrow = `${newLeft / (1 - newLeft)}`;
};

const mouseUpHandler = function () {
    console.log("mouseup called");
    resizer.style.removeProperty('cursor');
    document.body.style.removeProperty('cursor');
    leftSide.style.removeProperty('user-select');
    leftSide.style.removeProperty('pointer-events');
    rightSide.style.removeProperty('user-select');
    rightSide.style.removeProperty('pointer-events');

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

resizer.addEventListener('mousedown', mouseDownHandler);
