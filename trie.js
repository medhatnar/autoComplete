class WordsFound {
// bit of a hack but because I did not have time to implement a
// Finite State Transducer (FST) data structure, I decided to just update
// word frequency at the same time I was also adding letter Nodes.
// once a word's end if found it is added to this list and its count is updated.
// An FST would have instead done this count at runtime at a faster rate.
  constructor() {
    this.wordsFound = {};
  }

  fetchWordInfo(word) {
    return this.wordsFound[word];
  }

  update(newWord) {
    var wordList = this.wordsFound;
    if (wordList.hasOwnProperty(newWord)) {
      wordList[newWord]['count'] = wordList[newWord]['count'] + 1;
    } else {
      wordList[newWord] = { suggestion: newWord, count: 1 };
    }
    this.wordsFound = wordList;
  }
}
// each letter from every word in each file is broken down into it's own node
// this saves space because we do not need to store duplicate letters for words that share
// said letters. 
// This is also why a Trie is ideal for autocomplete.
class Node {
  constructor(key) {
    this.key = key;
    this.parentNode = null;
    this.children = {};
    this.end = false;
  }

  getWord() {
    var word = [];
    var node = this;

    while (node !== null) {
      word.unshift(node.key);
      node = node.parentNode;
    }

    return word.join('');
  }
}

// My Trie data structure is built to only add words from files and 
// search for said words.
class Trie {
  constructor() {
    this.root = new Node(null);
    this.wordsFound = new WordsFound();
    this.duplicates = new Set();
  }

  insert(word) {
    var node = this.root;
    var wordsFound = this.wordsFound;

    for (var i = 0; i < word.length; i++) {
        var letter = word[i].toLowerCase()
      if (!node.children[letter]) {
        node.children[letter] = new Node(letter);

        node.children[letter].parentNode = node;
      }

      node = node.children[letter];

      if (i === word.length - 1) {
        wordsFound.update(word.toLowerCase());
        node.end = true;
      }
    }
  }

  search(fragment) {
    var node = this.root;
    var wordsFound = this.wordsFound;
    var duplicates = this.duplicates;
    var words = [];

    for (var letter = 0; letter < fragment.length; letter++) {
      const fragmentLetter = fragment[letter].toLowerCase();
      if (node.children[fragmentLetter]) {
        node = node.children[fragmentLetter];
      } else {
        return words;
      }
    }

    function findMatchingWords(node, words) {
      if (node.end) {
        const wordToAdd = node.getWord();
        if (!duplicates.has(wordToAdd)) {
          words.push(wordsFound.fetchWordInfo(wordToAdd));
          duplicates.add(wordToAdd);
        }
      }

      for (var child in node.children) {
        findMatchingWords(node.children[child], words);
      }
    }
    
    findMatchingWords(node, words);

    this.duplicates = duplicates;

    return words;
  }
}

module.exports = {
  Trie: Trie,
};
