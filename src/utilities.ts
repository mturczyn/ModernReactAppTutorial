export function incrementInBounds(number: number, max: number) {
  return number >= max ? max : number + 1
}

export function decrementInBounds(number: number, min: number) {
  return number <= min ? min : number - 1
}
