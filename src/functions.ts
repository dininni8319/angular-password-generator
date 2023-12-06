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
export function generatePassword(
  lenght: number = 12,
  upper_case: boolean,
  lower_case: boolean,
  numbers: boolean,
  sym: boolean
) {

  let capitals = "QWERTYUIOPASDFGHJKLZXCVBNM";
  let small = "qwertyuiopasdfghjklzxcvbnm";
  let digits = "1234567890";
  let symbols = "-_=+[]{}!@#$%^&*();:'|\,<.>/?`";
  // add conditionally capitals, small, digitis, symbols
  if (!upper_case) capitals = '';

  if (!lower_case) small = '';
  
  if (!numbers) digits = '';
  
  if (!sym) symbols = '';
  
  let all = capitals + small + digits + symbols;

  let passwordArray: string[] = [];

  if (upper_case) passwordArray.push(getRandomSymbols(capitals))
  
  if (lower_case) passwordArray.push(getRandomSymbols(small))

  if (numbers) passwordArray.push(getRandomSymbols(digits))
  
  if (sym) passwordArray.push(getRandomSymbols(symbols))
  
  for (let i = 0; i < lenght - 4 ; i++) {
    passwordArray =  [...passwordArray,getRandomSymbols(all)];
  }

  let password = shufflePassword(passwordArray.join(''));
  return password
}

// create a function that checks if the passord strength bases on the selected 4 condition
export function checkStrength(
  upper_case: boolean,
  lower_case: boolean,
  numbers: boolean,
  sym: boolean
): string {
  let strength = 0;
  if (upper_case) strength++;
  if (lower_case) strength++;
  if (numbers) strength++;
  if (sym) strength++;
  
  if (strength === 1) {
    return 'LOW'
  }
  if (strength >= 2 && strength <= 3) {
    return 'MEDIUM'
  }
  if (strength === 4) {
    return 'HIGH'
  }
  return 'NONE'
}
