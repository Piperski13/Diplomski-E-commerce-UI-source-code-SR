class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(brand,model){
    this.#brand = brand;
    this.#model = model;
  };
  displayInfo(){
    return `${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk is open: ${this.isTrunkOpen}`;
  };
  go(){
    if(this.isTrunkOpen === true){
      return;
    }
    if(this.speed === 195){
      return;
    }
    this.speed +=5;
  };
  brake(){
    if(this.speed === 0){
      return;
    }
    this.speed -=5;
  };
  openTrunk(){
    if(this.speed > 0){
      return;
    }
    this.isTrunkOpen = true;
  };
  closeTrunk(){
    this.isTrunkOpen = false;
  };
};
class RaceCar extends Car{
  acceleration;

  constructor(brand,model,acceleration){
    super(brand,model);
    this.acceleration = acceleration;
  }
  go(){
    if(this.speed === 300){
      return;
    }
    this.speed += this.acceleration
  };
  openTrunk(){
    return;
  };
  closeTrunk(){
    return;
  };
}


const car1 = new Car('Toyota','Corola');
const car2 = new Car('Tesla','Model 3');
const raceCar1 = new RaceCar('McLaren','F1',20)

car1.go();
car1.go();
car1.go();
car2.brake();
car2.openTrunk();
car2.go();
car2.closeTrunk();
car2.go();
car1.openTrunk();
car1.brake();
car1.brake();
car1.brake();
car1.openTrunk();
raceCar1.go();
raceCar1.go();
raceCar1.go();
raceCar1.openTrunk();


const car1Info = car1.displayInfo();
const car2Info = car2.displayInfo();
const raceCar1Info = raceCar1.displayInfo();

// console.log(car1Info);
// console.log(car2Info);
// console.log('--------------------------');
// console.log(raceCar1Info);