## How to run program (and tests):

* The entire program is executable from file `autoCompelter.js`.
* To run you will need to pass in a word fragment as first argument and then subsequent arguments should be file paths.
> e.g.,`node autoCompleter.js demo ./about-act-blue.txt ./shakespeare-complete.txt`)

* To run all tests run `npm test tests`
* To run an individual file's test run `npm test [fileName.js]`


## Known bugs/issues
* I understand this is not the most performant option with the given data structure but improvements could have at least been made
* if I was able to figure out how to add to a single existing Trie instead of creating a Trie per file and then searching through each of those Tries. If I was able to achieve a single Trie with all file text inserted into it, then we could have avoided the duplicates check and just done one search on a single Trie and avoided concatenating and sorting results as well. 
* The time complexity for finding the node corresponding to a word fragment of length n is O(n) which isn't terrible. The expensive part is finding all the correlated letter nodes. This can be O(n ^ 2). 
* Although time complexity could use improvements, we at least save a ton on space compared to the naive approach because we do not need to store every individual word found, but can instead store individual letters which multiple words can share. 

## If I had more time:
*  I would have implemented a Finite State Transducers (FSTs). Albeit, I did not realize until after the fact that an FST Trie would have been
the most ideal solution. We waste a lot of time updating word frequency, but an FST inherently allows us to associate a numeric value with a word on as the search method is run. It is ideal for autocompletes such as this prompt that require a score/weight for each word.
* An FST does not simply set nodes for each letter but would organize letters into their own "weight" categories.
> e.g., root -> b -> a -> r
                       -> z

would instead be root -> 10(frequency) -> b -> a -> r 
                      -> 5(frequency) -> b -> a -> z
* Had the prompt only requested an array of word suggestions and not their frequency, a normal Trie would have been a suitable solution.