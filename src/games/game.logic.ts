export class BullPgia {
  static generateSecretCode(): number[] {
    const digits = new Set<number>();
    while (digits.size < 4) {
      const digit = Math.floor(Math.random() * 9) + 1;
      digits.add(digit);
    }
    return Array.from(digits);
  }
  

  static evaluateGuess(secret: number[], guess: number[]) {
    let bulls = 0;
    let pgias = 0;
    const secretCopy = [...secret];

    guess.forEach((digit, idx) => {
      if (digit === secretCopy[idx]) {
        bulls++;
      } else if (secretCopy.includes(digit)) {
        pgias++;
      }
    });

    return { bulls, pgias };
  }
}
