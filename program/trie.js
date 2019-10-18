// bit of a hack but because I did not have time to implement a
// Finite State Transducer (FST) data structure, I decided to just update
// word frequency at the same time I was also adding letter Nodes to my Trie.
// An FST would have instead done this count at runtime at a faster rate.
class WordsFound {
  constructor() {
    // Map DS best here since we are correlating a word 
    // to a frequency count.
    this.wordsFound = new Map();
  }

  fetchWordInfo(word) {
    return this.wordsFound.get(word);
  }

  update(word) {
    var wordList = this.wordsFound;
    if (wordList.has(word)) {
      wordList.set(word, this.fetchWordInfo(word) + 1);
    } else {
      wordList.set(word, 1);
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
// search for said words. Also has Set data structure to ensure there are 
// no duplicates being added.
class Trie {
  constructor() {
    this.root = new Node(null);
    this.duplicates = new Set();
    this.wordsFound = new WordsFound();
  }

  insert(word) {
    var node = this.root;
    var wordsFound = this.wordsFound;

    for (var i = 0; i < word.length; i++) {
      var letter = word[i].toLowerCase();
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
    var duplciates = this.duplicates;
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
        if (!duplciates.has(wordToAdd)) {
          duplciates.add(wordToAdd);
          words.push({
            suggestion: wordToAdd,
            count: wordsFound.fetchWordInfo(wordToAdd),
          });
        }
      }

      for (var child in node.children) {
        findMatchingWords(node.children[child], words);
      }
    }

    findMatchingWords(node, words);

    return words;
  }
}

module.exports = {
  Node: Node,
  Trie: Trie,
  WordsFound: WordsFound,
};
