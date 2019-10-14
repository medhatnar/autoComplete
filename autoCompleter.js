const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

const instream = fs.createReadStream(`${process.argv[3]}`);
const outstream = new stream();
const rl = readline.createInterface(instream, outstream);
const wordFragment = `${process.argv[2]}`;

let topWords = new Map();
let mostFrequentWords = [];

rl.on('line', function(line) {
  const filteredLine = line.replace(/\W/g, ' ');
  filteredLine.split(' ').forEach(word => wordMap(word));
  // get word fragment
  // find fragments in doc
  // process subsets of document with stream? (DS)
  // return top 25 that match fragment
});

rl.on('close', function() {
  console.log(mostFrequent(topWords));
  return topWords;
});

function wordMap(word) {
  if (topWords[word] && word.match(wordFragment)) {
    topWords[word] = topWords[word] + 1;
  } else if (word.match(wordFragment)) {
    topWords[word] = 1;
  }
}

function mostFrequent(wordsMap) {
  mostFrequentWords = Object.keys(wordsMap).map(function(key) {
    return {
      name: key,
      total: wordsMap[key],
    };
  });

  const sorted = mostFrequentWords.sort(function(a, b) {
    return b.total - a.total;
  });
  if (sorted.length < 25) {
    return sorted;
  } else {
    return sorted.slice(0, -(sorted.length - 25));
  }
}
