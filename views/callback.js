



thisIsTheSecond(myFunction)

function myFunction(parm1){
  console.log(parm1);
}

function thisIsTheSecond(callback){
  callback("it doesn't matter")

}

// store an array of whatever numbers to a variable
// define a function thattakes a number,
// multiplies it by itself and console logs console.
//use the forEach method of the array to call
//the naew funcion on every member of the array

var array = [2,4,563,36664,5858];

Function mathamatical(number){
  console.log(number * number);
}
  // array.forEach(function(item){
  //   mathamatical(item);
  //instead of the function above a better answer is below

  arry.forEach(mathamatical);





  function foreach(arr,fn) {
      for (var i=0; i< arr.length; i++){
        fn(arr[i])
      }
  }
//create the callback function
function mathemagical(num){
    console.log(Math.sqrt(num))
}
 //call the function

 foreach(array, mathemgaical)




 // to make a new array of even numbers

 var array = [1,2,3,4,,5,6,7,8,9];

 function filter(arr, fn){
    var newArray = []
    for(var i = 0; i < arr.length); i++){
      if(fn(arr[i])){
        newArr.push(arr[i])
      }
    }
    return newArr
 }

 function checkEven(num){
   return num % 2 === 0
 }

 function checkOdd(num){
   return num % 2 === 0
 }

 let evens = filter(array, checkEven)
let odds = filter(array, checkOdd)

console.log(evens)
console.log(odds)



//groupBy project


function groupBy(arr, fn) {

  
}
