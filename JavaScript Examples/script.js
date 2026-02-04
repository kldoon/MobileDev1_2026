const marks = [90, 80, 96, 89, 79];

const calcGPA = () => {
    let sum = 0;
    marks.forEach(mark => sum += mark);
    avg = sum / marks.length;
    console.log(avg);
}

console.log("Hello from Script JS")

// function fun(mark) {
//     sum+=mark
// }