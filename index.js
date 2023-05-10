import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
let ar = [];
let p = '';
let cache = {};
wss.on('connection', function connection(ws) {
  // da='';
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    p = data + "";
    //main();
    if (checkInCache(p)) {
      ws.send(cache[p]);
    } else {
      ar = main(p);
      ar = [...ar];
      if (checkPalindrome(ar)) {
        ws.send('true');
      } else {
        ws.send('false');
      }
      putInCache(p,checkPalindrome(ar));
    }
    // for (let i = 0; i < ar.length; i++) {
    //   //const element = array[i];
    //   p = p + ' ' + ar[i];

    // }
    //p
    //ws.send(p);
    //da=data;
  });

  //ws.send('something ');
});




/**
 * This function takes a word as input and returns all non-repetitive permutations of the word.
 * 
 * @param {string} word - The word to generate permutations from.
 * @returns {Array} An array of all non-repetitive permutations of the word.
 */
function generatePermutations(word) {
  // Check if the input is a string
  if (typeof word !== 'string') {
    console.error('Input must be a string');
    return [];
  }

  // Check if the input is not empty
  if (word.length === 0) {
    console.error('Input cannot be empty');
    return [];
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
}



/**
 * permutation function
 *
 * @param {string} str - string to calculate permutation for
 * @param {number} l - starting index
 * @param {number} r - end index
 * @param {Array} arrayList - array to store permutations
 */
function permute(str, l, r, arrayList) {
  if (l === r) {
    console.log(str);
    arrayList.push(str);
  } else {
    for (let i = l; i <= r; i++) {
      str = swap(str, l, i);
      permute(str, l + 1, r, arrayList);
      str = swap(str, l, i);
    }
  }
}

/**
* Swap Characters at position
*
* @param {string} a - string value
* @param {number} i - position 1
* @param {number} j - position 2
* @returns {string} - swapped string
*/
function swap(a, i, j) {
  const temp = a[i];
  const charArray = a.split('');
  charArray[i] = charArray[j];
  charArray[j] = temp;
  return charArray.join('');
}

/**
* Main function
*/
function main() {
  //const input = require('readline-sync');
  //const str = input.question('Enter a string: ');
  const n = p.length;

  const bigArrayList = [];
  const arrayList = [];

  permute(p, 0, n - 1, arrayList);
  //console.log(arrayList);
  //bigArrayList.push(...arrayList);

  const hashSet = new Set();
  //let num = n;
  //let x = 1;
  for (let i = 0; i < arrayList.length; i++) {
    hashSet.add(arrayList[i]);
  }
  return hashSet;
  //while (num > 3) {
  // for (let i = 0; i < arrayList.length; i++) {
  //   hashSet.add(arrayList[i].substring(x));
  // }
  // console.log(hashSet);
  // bigArrayList.push(...hashSet);
  // hashSet.clear();
  // //x++;
  // // num--;
  // // }
  // console.log();
  // console.log(bigArrayList);
  // return bigArrayList;
}

// Call the main function
//main();




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
      throw new TypeError("Argument must be an array");
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
    console.log(`Error: ${e}`);
    return false;
  }
}


function checkInCache(p){
  for (var key in cache) {
    console.log("key " + key + " has value " + cache[key]);
    if (p===key) {
      return true;
    }
  }
  return false;
}

function putInCache(p,b){
  cache[p]=b;
}