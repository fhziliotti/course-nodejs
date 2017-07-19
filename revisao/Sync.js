let fs = require("fs");

console.log("1");
fs.readFile("./Texto.txt", "utf8", (data, error)=>{
console.log("2");
    console.log(data ? data : error);
});
console.log("3");


for(let i =0; i < 10; i++){
    console.log(i);
}