// let obj = {
//     name: "Ankit", 
//     age: 22
// }

// console.log(obj)

// let animal = {
//     eats: true
// }

// let rabbit = {
//     jumps: true

// }

// rabbit.__proto__ = animal;

class Animal{
    constructor(name){
        this.name = name;
        console.log("Object is created...")
    }

    eats(){
        console.log("is eating...")
    }

    jumps(){
        console.log("is jumping..")
    }
}

class Lion extends Animal{
    constructor(name){
        super(name)
        console.log("Object is created and he is a lion...")
    }

    

}

let a = new Animal("Bunny");
console.log(a)
console.log(a.eats)
console.log(a.name)

let l = new Lion("shera");
console.log(l)