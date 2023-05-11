// Import WebSocketServer from 'ws' module
import { WebSocketServer } from 'ws';

// Create a new WebSocketServer instance on port 8080
const wss = new WebSocketServer({ port: 8080 });

// Initialize variables
let inputString = '';
let permutations = [];
let cache = {};


// Handle WebSocket connection
wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('Received input: %s', data);
    inputString = data + '';

    // Check if input is in cache
    if (checkInCache(inputString)) {
      ws.send(cache[inputString]);
    } else {
      // Generate permutations and check for palindrome
      permutations = generatePermutations(inputString);
      if (checkPalindrome(permutations)) {
        ws.send('true');
      } else {
        ws.send('false');
      }
      // Add result to cache
      putInCache(inputString, checkPalindrome(permutations));
    }
  });
});

/**
 * This function takes a word as input and returns all non-repetitive permutations of the word.
 * 
 * @param {string} word - The word to generate permutations from.
 * @returns {Array} An array of all non-repetitive permutations of the word.
 */
function generatePermutations(word) {
  try {
    // Check if input is a string
    if (typeof word !== 'string') {
      throw new TypeError('Input must be a string');
    }

    // Check if input is not empty
    if (word.length === 0) {
      throw new Error('Input cannot be empty');
    }

    // Create an array to store the permutations
    const permutations = [];

    // Create a helper function to generate permutations
    function generateHelper(current, remaining) {
      // Base case: if there are no remaining characters, add the current permutation to the array
      if (remaining.length === 0) {
        permutations.push(current);
        return;
      }

      // Loop through the remaining characters and generate permutations
      for (let i = 0; i < remaining.length; i++) {
        // Check if the current character is the same as the previous character
        if (i > 0 && remaining[i] === remaining[i - 1]) {
          continue;
        }

        // Generate the next permutation
        const next = current + remaining[i];
        const remainingChars = remaining.slice(0, i) + remaining.slice(i + 1);
        generateHelper(next, remainingChars);
      }
    }

    // Sort the input word to ensure non-repetitive permutations
    const sortedWord = word.split('').sort().join('');

    // Generate permutations
    generateHelper('', sortedWord);

    // Return the array of permutations
    return permutations;
  } catch (e) {
    // Log the error
    console.log.error(`Error: ${e}`);
    return [];
  }
}

/**
 * This function checks if at least one element of the given array is palindrome.
 * 
 * @param {Array} arr - The array to be checked
 * @returns {boolean} - True if at least one element is palindrome, False otherwise
 */
function checkPalindrome(arr) {
  try {
    // Check if the argument is an array
    if (!Array.isArray(arr)) {
      throw new TypeError('Argument must be an array');
    }

    // Loop through the array and check if any element is palindrome
    for (let i = 0; i < arr.length; i++) {
      // Convert the element to string and remove any non-alphanumeric characters
      let str = arr[i].toString().replace(/[^0-9a-z]/gi, '');

      // Check if the string is palindrome
      if (str === str.split('').reverse().join('')) {
        return true;
      }
    }

    // No palindrome found
    return false;
  } catch (e) {
    // Log the error
    console.log.error(`Error: ${e}`);
    return false;
  }
}

/**
 * This function checks if the input string is in the cache.
 * 
 * @param {string} inputString - The input string to be checked
 * @returns {boolean} - True if input string is in cache, False otherwise
 */
function checkInCache(inputString) {
  for (let key in cache) {
    if (inputString === key) {
      console.log(key+' was in cache!')
      return true;
    }
  }
  return false;
}

/**
 * This function adds the input string and its result to the cache.
 * 
 * @param {string} inputString - The input string to be cached
 * @param {boolean} result - The result of the input string
 */
function putInCache(inputString, result) {
  cache[inputString] = result;
}