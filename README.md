Instructions:

Create a program that can autocomplete word fragments using one or more text files as the data source. We recommend spending two-to-three hours meeting the basic requirements and no more than two-to-three hours completing the extra credit if you so choose. You can complete this challenge in any programming language, but our stack is written in Ruby and JavaScript.

## Basic requirements

* The program should be executable from the command line and accept arguments as a list consisting of a fragment and one or more file paths (e.g. `./solution.rb betwix shakespeare-complete.txt other-source.txt ...`)
* The program should be case-insensitive; feel free to ignore non-word entities like numbers.
* When returning the list of autocompleted words for a word fragment, the program should order the words by their frequency (most frequent first)
* It should also return the frequency of each word as part of the results
* It should return no more than 25 results for any word fragment
* The project should include a README that specifies:
  * Instructions on how to run the program (and tests)
  * Known bugs/issues
  * What you would do next if you had more time

## Extra credit

* Unicode data and queries should be fully supported (e.g. `ünch` might return `München`, and `ÁRE` might return `JUÁREZ`)
* The program should be able to handle large files and remain performant in both time and space complexity. What would you need to do to make this program able to search against thousands of files the size of Shakespeare's complete works?
* [Write up] Imagine now that your program was going to be used in a web context. Would your program need to change? If so, how? What would you do to ensure the program can handle a high frequency of autocomplete searches and remain performant. Would you need to change your implementation as frequency increased from 1 search/second to 1000 searches/second? 100000 searches/second?

## What to prioritize

* Meet and test basic requirements
* The program should run as fast as possible
* Code should be well structured. Consider extensibility. Consider readability.

## Submission

* Please create a private Github repository and share it with your hiring manager, who will provide their Github handle. Please make sure not to include any personally identifying information in the code itself, as your submission will be scored anonymously.
* Your repository should include a README, program executable, tests, and fixtures.
  * Use the provided complete works of Shakespeare and include your results for the fragments `th`, `pi`, `ove`, `wu`, `ence`, `'d`, `ne`, `eds` in a file called RESULTS.md