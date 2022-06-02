let textArea = document.getElementById("text");
let results = document.getElementById("results");

function textRecognition(event) {
    let text = textArea.value;
    let wordsArray = getWordsArray(text)
    let result = {
        vowels: {
          "a": 0,
          "e": 0,
          "i": 0,
          "o": 0,
          "u": 0
        },
        punctuation: {
          "Periods": 0,
          "Commas": 0,
          "Question Marks": 0,
          "Exclamation Points": 0
        },
        numCharacters: 0,
        numWords: 0,
        longestWord: "",
        shortestWord: "",
        lastThreeWords: [],
        waldoIndexes: [],
    }
    result.text = text;
    result.numCharacters = text.length;
    result.vowels = getVowelResults(text);
    result.punctuation = getPunctuationResults(text);
    result.numWords = wordsArray.length;
    result.longestWord = getLongestWord(wordsArray);
    result.shortestWord = getShortestWord(wordsArray);
    result.lastThreeWords = wordsArray.slice(-3);
    result.waldoIndexes = getWaldoIndices(text);
    renderData(result)
    console.log(result);
};

function getVowelResults(stringData) {
    stringData = stringData.toLowerCase();
    let vowelResults = {
        "a": 0,
        "e": 0,
        "i": 0,
        "o": 0,
        "u": 0
    };
    for (let index = 0; index < stringData.length; index += 1) {
        let currentLetter = stringData[index];
        switch (currentLetter) {
            case "a":
            case "e":
            case "i":
            case "o":
            case "u":
                if(vowelResults[currentLetter]) {
                    vowelResults[currentLetter] += 1;
                } else {
                    vowelResults[currentLetter] = 1;
                }
                break;
        }
    }
    return vowelResults;
}


function getPunctuationResults(stringData) {
    stringData = stringData.toLowerCase();
    let punctuationResults = {
          "Periods": 0,
          "Commas": 0,
          "Question Marks": 0,
          "Exclamation Points": 0
    };
    for (let index = 0; index < stringData.length; index += 1) {
        let currentLetter = stringData[index];
        switch (currentLetter) {
            case ".":
                punctuationResults["Periods"] += 1;
                break;
            case ",":
                punctuationResults["Commas"] += 1;
                break;
            case "!":
                punctuationResults["Exclamation Points"] += 1;
                break;
            case "?":
                punctuationResults["Question Marks"] += 1;
                break;
        }
    }
    return punctuationResults;
}

function getWordsArray(stringData) {
    let arrayWords = stringData.split(" ");
    let acceptableLetters = "abcdefghijklmnopqrstuvwxyz'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"
    let arrayFiltered = [];
    for (let character of arrayWords) {
        if (character !== "") {
            let characterArray = character.split("");
            let wordFiltered = [];
            for (let index = 0; index < characterArray.length; index += 1) {
                let currentLetter = characterArray[index];
                if (acceptableLetters.includes(currentLetter) === true) {
                    wordFiltered.push(currentLetter);
                }
            }
            arrayFiltered.push(wordFiltered.join(""));
        }
    }
    return arrayFiltered;
}

function getLongestWord (words) {
    let sortedWords = [...words].sort((wordA, wordB) => wordB.length - wordA.length)
    return sortedWords[0];
}

function getShortestWord (words) {
    let sortedWords = [...words].sort((wordA, wordB) => wordA.length - wordB.length)
    return sortedWords[0];
}

function getWaldoIndices(stringData) {
    let indices = [];
    let searchString = "waldo";
    let lowerCaseString = stringData.toLowerCase();
    let searchIndex = 0;
    let index;
    while((index = lowerCaseString.indexOf(searchString, searchIndex)) > -1) {
        indices.push(index);
        searchIndex = index + searchString.length;
    }
    return indices;
}

function renderData(dataObject) {
    results.replaceChildren()
    let container = document.createElement("div");
    container.classList.add("container");

    let title = document.createElement("h2");
    title.append("Text Analysis");
    container.append(title);
    
    let columnContainer = document.createElement("div");
    columnContainer.classList.add("columnContainer");
    container.append(columnContainer);

    let leftColumn = document.createElement("div");
    leftColumn.classList.add("leftColumn");
    columnContainer.append(leftColumn);

    let rightColumn = document.createElement("div");
    rightColumn.classList.add("rightColumn");
    columnContainer.append(rightColumn);

    let vowels = document.createElement("div");
    vowels.classList.add("leftColumn");
    leftColumn.append(vowels);

    let vowelTitle = document.createElement("h3");
    vowelTitle.append("Vowel Counts");
    vowels.append(vowelTitle);

    vowels.append(displayObject(dataObject.vowels));

    let punctuation = document.createElement("div");
    punctuation.classList.add("leftColumn");
    leftColumn.append(punctuation);

    let punctuationTitle = document.createElement("h3");
    punctuationTitle.append("Punctuation Counts");
    punctuation.append(punctuationTitle);

    punctuation.append(displayObject(dataObject.punctuation));

    let numOfCharacters = document.createElement("h3");
    numOfCharacters.append(`Number of Characters: ${dataObject.numCharacters}`);
    rightColumn.append(numOfCharacters);

    let numOfWords = document.createElement("h3");
    numOfWords.append(`Number of Words: ${dataObject.numWords}`);
    rightColumn.append(numOfWords);

    let displayLongestWord = document.createElement("h3");
    displayLongestWord.append(`Longest Word: ${dataObject.longestWord}`);
    rightColumn.append(displayLongestWord);

    let displayShortestWord = document.createElement("h3");
    displayShortestWord.append(`Shortest Word: ${dataObject.shortestWord}`);
    rightColumn.append(displayShortestWord);

    let displayThreeWords = document.createElement("h3");
    displayThreeWords.append(`Last Three Words: ${dataObject.lastThreeWords}`);
    rightColumn.append(displayThreeWords);

    let displayWaldo = document.createElement("h3");
    displayWaldo.append(`Waldo Indexes: [${dataObject.waldoIndexes}]`);
    rightColumn.append(displayWaldo);

    results.append(container);
}

function displayObject(obj) {
    let list = document.createElement("ul");
    for (let property in obj) {
        let listItem = document.createElement("li");
        listItem.append(`${property}: ${obj[property]}`);
        list.append(listItem);
    } 
    return list;
}

textArea.addEventListener("keyup", textRecognition);