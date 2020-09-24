module.exports.nameCase = (word) => {
    word = word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    return word;
}

module.exports.sentenceCase = (word) => {
    word = word.toLowerCase().trim();
    let result = "";
    if (word.includes(" ")) {
        let wordArr = [];
        let words = word.split(" ");
        words.forEach((word) => {
            wordArr.push(
                word.replace(word.charAt(0), word.charAt(0).toUpperCase())
            );
        });

        return (wordArr = wordArr.join(" "));
    }
    result = word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    return result;
}

module.exports.upperCase = (word) => {
    return word.toUpperCase();
}

module.exports.lowerCase = (word) => {
    return word.toLowerCase().trim();
}

module.exports.addZero = (number, type) => {
    var numberStr = String(number);
    if (type == "phoneNumber") {
        if (numberStr.length == 10) {
            return `0${number}`;
        }
    }

    if (type == "accountNumber") {
        if (numberStr.length == 9) {
            return `0${number}`;
        }
    }

    return number;
}