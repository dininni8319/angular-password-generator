// it returns a random character
function getRandomSymbols(sourceString: string) {
  return sourceString[
    Math.floor(
      Math.random() * sourceString.length
    )
  ]
}

// this function shuffles the password
export function shufflePassword(password: string) {
  let passwordArray = password.split('');
  let shuffledPasswordArray = passwordArray.sort(() => Math.random() - 0.5);
  let shuffledPassword = shuffledPasswordArray.join('');
  return shuffledPassword;
}

export function generatePassword(
  length: number = 12,
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

  // create an array of 4 conditions
  let passwordArray: string[] = [
    capitals && getRandomSymbols(capitals),
    small && getRandomSymbols(small),
    digits && getRandomSymbols(digits),
    symbols && getRandomSymbols(symbols)
  ].filter(el =>  el !== ''); // removes empty string from the array

  let len = length - passwordArray.length
  
  for (let i = 0; i < len; i++) {
    passwordArray =  [...passwordArray,getRandomSymbols(all)];
  }

  let password = shufflePassword(passwordArray.join(''));
  return password
}

// create a function that checks if the passord strength 
// bases on the selected 4 condition
export function checkStrength(
  upper_case: boolean,
  lower_case: boolean,
  numbers: boolean,
  sym: boolean
) {
  let strength = 0;
  let str = '';

  if (upper_case) strength++;
  if (lower_case) strength++;
  if (numbers) strength++;
  if (sym) strength++;

  switch (strength) {
    case 1:
      str = 'low';
      break;
    case 2:
    case 3:
      str = 'medium';
      break
    case 4:
      str = 'high';
      break
    default:
      str = '';
      break;
  }

  return {str, strength};
}
