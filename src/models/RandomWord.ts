interface RandomWordI {
    word: string;
    amount: number;
}

class RandomWordDTO implements RandomWordI {
    word = '';
    amount = 0;
}

export default class RandomWord extends RandomWordDTO {
    constructor(dto: RandomWordDTO = new RandomWordDTO()) {
        super();
        Object.assign(this, dto);
    }

    async get(): Promise<void> {
        return fetch('https://random-word-api.herokuapp.com/word').then(result => result.json().then((word: string[]) => { this.word = word[0] }))
        .catch(e => { throw e; })
    }

    async getAmount(): Promise<void> {
        return fetch('http://numbersapi.com/random/math?min=1&max=27').then(result => result.text().then(text => { this.amount = parseInt(text.split(" ")[0]) }))
        .catch(e => { throw e; });
    }

    caesarCipher(): string {
        const alphabet = "abcdefghijklmnopqrstuvwxyz", fullAlphabet = alphabet + alphabet + alphabet, cipherText = this.word, cipherOffset = this.amount % alphabet.length
        let cipherFinish = '';

        cipherText.split('').forEach(letter => {
            const uppercase = letter === letter.toUpperCase();
            letter = letter.toLowerCase();
            let index = alphabet.indexOf(letter);
            if(index == -1) cipherFinish += letter;
            else { index += cipherOffset + alphabet.length; cipherFinish += uppercase ? fullAlphabet[index].toUpperCase() : fullAlphabet[index]; }
        });

        return cipherFinish;
    }
}
