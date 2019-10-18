const fs = require('fs');
const stream = require('stream');
const readline = require('readline');
const { once } = require('events');

const { Trie } = require('./trie.js');
const wordFragment = `${process.argv[2]}`;

function autoCompleteProgram(wordFragment) {
  // using a Trie data structure.
  let dataSource = new Trie();
  let autoSuggestions = [];
  let fileToRead;
  // iterate through all files passed in as arguments
  // we start at index three since the second argument is the word fragment.
  // A read stream is created for each file.
  for (let i = 3; i < process.argv.length; i++) {
    fileToRead = `${process.argv[i]}`;
    let instream = fs.createReadStream(`${fileToRead}`);
    let rl = readline.createInterface({
      input: instream,
      output: stream,
      crlfDelay: Infinity,
    });

    autoSuggestions.push(parseFilesIntoTrie(rl));
  }

  async function parseFilesIntoTrie(rl) {
    // Each line has its non letter characters removed and is stored
    // in the Trie data structure we initiated above.
    try {
      rl.on('line', line => {
        let alphaCharLine = line.replace(/[^A-Za-z]/g, ' ').split(' ');
        for (let i = 0; i < alphaCharLine.length; i++) {
          dataSource.insert(alphaCharLine[i]);
        }
      });
      await once(rl, 'close');
      // once the file is fully processed into the Trie
      // we search for the words that would be suggested
      // for the fragment passed in.
      // Ideally I would have liked to process the files beforehand
      // so all we would need to do is search at runtime.
      return dataSource.search(wordFragment);
    } catch (err) {
      console.error(err);
    }
  }
  // after all suggestions are found and accounted for
  // we combine all results, sort them, and return the top 25 below.
  Promise.all(autoSuggestions).then(suggestions => {
    var sortedSuggestions = [].concat
      .apply([], suggestions)
      .sort((a, b) => b.count - a.count);
    if (sortedSuggestions.length < 25) {
      console.log(sortedSuggestions);
    } else {
      console.log(sortedSuggestions.slice(0, -(sortedSuggestions.length - 25)));
    }
  });
}

autoCompleteProgram(wordFragment);

module.exports = {
  autoCompleteProgram: autoCompleteProgram,
};
