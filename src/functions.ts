function getRandomSymbols(sourceString: string) {
  return sourceString[Math.floor(Math.random() * sourceString.length)]
}

// create a function that shuffle a password
export function shufflePassword(password: string) {
  let passwordArray = password.split('');
  let shuffledPasswordArray = passwordArray.sort(() => Math.random() - 0.5);
  let shuffledPassword = shuffledPasswordArray.join('');
  return shuffledPassword;
}
export function generatePassword(lenght: number = 12) {
  let capitals = "QWERTYUIOPASDFGHJKLZXCVBNM";
  let small = "qwertyuiopasdfghjklzxcvbnm";
  let digits = "1234567890";
  let symbols = "-_=+[]{}!@#$%^&*();:'|\,<.>/?`";
  let all = capitals + small + digits + symbols;

  let passwordArray: string[] = [];
  
  passwordArray.push(getRandomSymbols(capitals))
  passwordArray.push(getRandomSymbols(small))
  passwordArray.push(getRandomSymbols(digits))
  passwordArray.push(getRandomSymbols(symbols))
  
  for (let i = 0; i < lenght - 4 ; i++) {
    passwordArray =  [...passwordArray,getRandomSymbols(all)];
  }

  let password = shufflePassword(passwordArray.join(''));
  return password
}