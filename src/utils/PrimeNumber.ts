export class PrimeNumber {
  constructor(private num: number) {}

  private isPrime(num: number) {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
      if (num % i === 0) return false
    }
    return num > 1
  }

  *[Symbol.iterator]() {
    let curr = 2
    while (curr <= this.num) {
      if (this.isPrime(curr)) {
        yield curr
      }
      curr++
    }
  }
}
