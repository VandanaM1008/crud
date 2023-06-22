const prompt = require('prompt-sync')();

class Leg {
  constructor(city1, city2, cost) {
    this.city1 = city1;
    this.city2 = city2;
    this.cost = cost;
  }
}

class Route {
  constructor() {
    this.legs = [];
  }

  addLeg(leg) {
    this.legs.push(leg);
  }

  calculateTotalCost() {
    let totalCost = 0;
    for (const leg of this.legs) {
      totalCost += leg.cost;
    }
    return totalCost;
  }
}

function main() {
  const route = new Route();

  const n = parseInt(prompt("Enter the number of legs in the route: "));

  for (let i = 1; i <= n; i++) {
    console.log(`Leg ${i}:`);
    const city1 = prompt("Enter the name of the first city: ");
    const city2 = prompt("Enter the name of the second city: ");
    const cost = parseFloat(prompt("Enter the cost of the leg: "));

    const leg = new Leg(city1, city2, cost);
    route.addLeg(leg);
  }

  const totalCost = route.calculateTotalCost();
  console.log(`The total cost of the trip is: ${totalCost}`);
}

main();
