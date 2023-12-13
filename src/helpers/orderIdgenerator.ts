function generateOrderId() {
  const prefix = "ORD";
  const length = 5; // You can adjust the length as needed
  const maxRandomNumber = Math.pow(10, length);

  const randomNumber = Math.floor(Math.random() * maxRandomNumber);
  const paddedNumber = randomNumber.toString().padStart(length, "0");

  return prefix + paddedNumber;
}
export default generateOrderId