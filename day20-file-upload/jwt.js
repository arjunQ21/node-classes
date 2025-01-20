import  jwt from "jsonwebtoken";

// const token = jwt.sign({ name: "Car", price: 45000 }, 'secretKey');
let isVerified = false;
let payload = null;
try {
    payload = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2FycyIsInByaWNlIjo0NTAwLCJpYXQiOjE3MzY0MTIyNTR9.YwcJw2Z_hpYhKgCCGXfYHTnco2leQqMSp0GMjqoz50s", 'secretKey');
    console.log("Found: ", payload);
    isVerified = true;
} catch (e) { }

console.log({ isVerified, payload })


// "Cat"