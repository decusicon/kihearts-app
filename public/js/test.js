let obj3 = {
  k: "Hello"
};

let { k } = obj3;
console.log("name: ", k);


// Question 2
let vowels = ["a", "e", "i", "o", "u"];
let result = "";

// Find If a vowel exists in a word.
let findVowels = (word = "", vowels) => {
  word = word.toLowerCase();
  for (let i = 0; i <= word.length; i++) {
    const w = word[i];
    vowels.forEach(vow => {
      if (vow === w) {
        console.log("Vowel found:", w);
      }
    });
  }
};

findVowels("Nigga, you better shut the fuck up!", vowels);