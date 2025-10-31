module.exports = {
    computeLength: (str) => {
        return str.length;
    },

    isPalindrome: (str) => {
        const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        return cleanedStr === cleanedStr.split('').reverse().join('');
    },

    countUniqueCharacters: (str) => {
        const uniqueChars = new Set(str);
        return uniqueChars.size;
    },

    generateCharacterFrequency: (str) => {
        const frequencyMap = {};
        for (const char of str) {
            frequencyMap[char] = (frequencyMap[char] || 0) + 1;
        }
        return frequencyMap;
    }
};