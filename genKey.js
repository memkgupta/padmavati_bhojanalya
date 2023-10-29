// this code will generate our private key using crypto library

const crypto = require('crypto');

// Specify the asymmetric key pair algorithm (e.g., rsa, dsa, etc.)
const algorithm = 'rsa';

// Generate a new asymmetric private key
const privateKey = crypto.generateKeyPairSync(algorithm, {
  modulusLength: 4096,  // Adjust the key size as needed
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  }
});

// Print the private key to the console
console.log('Private Key:');
console.log(privateKey.privateKey);