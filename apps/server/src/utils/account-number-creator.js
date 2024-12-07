export function accountNumberCreator() {
   const timestamp = Date.now(); // current timestamp
   const random = Math.floor(Math.random() * 1000000); // random number to make it more unique
   const accountNumber = `AC${timestamp}${random}`;
   return accountNumber;
}
