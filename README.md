# Szyfr Cezara


### Piotr Pilszczek, 2ce-n

![Wygląd aplikacji](https://i.imgur.com/etAUAYw.png)


## Gdzie znaleźć aplikację?

[-> Link do strony na GitHub Pages](https://piotrpilszczek.github.io/szyfr-cezara/)

[-> Link do kodu źródłowego strony na GitHub'ie](https://github.com/piotrpilszczek/szyfr-cezara)


## Opis aplikacji

Główna funkcjonalność strony, to **szyfrowanie** słów tzw. szyfrem cezara. Można również **losować słowa pobrane z API** oraz **losować wartość przesunięcia** bezpośrednio w aplikacji.

Strona po kliknięciu przycisku **konwertuj**, szyfruje słowo wpisane w odpowiednim polu odpowiednim przesunięciem.

Wygląd aplikacji miał z zamysłu przypomiać **terminal**. Strona jest **responsywna** (dostosowuje się do ekranów z mniejszą rozdzielczością).


## Technologia użyta do stworzenia strony

Strona została napisana w frameworku [VueJS](https://v3.vuejs.org/) w wersji 3.0.0.

Język, w którym napisana została aplikacja, to TypeScript (dokumentacja [tutaj](https://v3.vuejs.org/guide/typescript-support.html) lub [tutaj](https://www.typescriptlang.org/)).


## Kod źródłowy strony

### Podstawowy opis

W głównym pliku aplikacji, czyli [`App.vue`](https://github.com/piotrpilszczek/szyfr-cezara/blob/master/src/App.vue), znajduje się komponent [`Caesar.vue`](https://github.com/piotrpilszczek/szyfr-cezara/blob/master/src/components/Caesar.vue), czyli plik z zawartością całej aplikacji (nie tworzyłem większej ilości komponentów ze względu na prostotę aplikacji).

Aplikację starałem się oprzeć na modelu. Stworzyłem model [`RandomWord.ts`](https://github.com/piotrpilszczek/szyfr-cezara/blob/master/src/models/RandomWord.ts). Zawiera on asynchroniczną funkcję `get()`, słuzącą do pobierania losowego słowa z API. Posiada on również dwie inne funkcje, czyli `getAmount()` oraz `caesarCipher()`, służące kolejno do wybrania losowego przesunięcia oraz zaszyfrowania wyrazu.

### Szyfrowanie

Szyfrowanie odbywa się - tak jak wyżej napisałem - w funkcji [`caesarCipher()`](https://github.com/piotrpilszczek/szyfr-cezara/blob/fc8534c242ae37bf5494c233ef79b63664dd2c6e/src/models/RandomWord.ts#L28) modelu [`RandomWord.ts`](https://github.com/piotrpilszczek/szyfr-cezara/blob/master/src/models/RandomWord.ts).

Tworzone są 4 zmienne - pierwsze dwie odpowiadają za alfabet, a do kolejnych dwóch przypisuję właściwości modelu (`this.word` oraz `this.amount`)

Następnie iteruję po wpisanej wartości (funkcją `.forEach(letter => { ... })`) otrzymując poszczególne znaki z wprowadzonej zmiennej. Najpierw sprawdzam, czy nie została wprowadzona duża litera (porównując `znak` ze znakiem `.toUpperCase()`). Zamieniam znak na małą literę, przypisuję do zmiennej `index` położenie w tablicy `alphabet` danej litery i sprawdzam czy znak jest literą (jeśli nie, `index == -1`, ponieważ litera nie zostanie znaleziona w tablicy).

Jeśli litera została znaleziona, dodaję do zmiennej `index` `cipherOffset`, czyli `this.amount` - przesunięcie, a także długość tablicy `alphabet`. Do zmiennej z gotowym wyrazem dodaję nowy znak (na pozycji `fullAlphabet[index]`) ze zwróceniem uwagi na uprzednio ustaloną wielkość znaku.

### Funkcję odpowiadającą za szyfrowanie umieszczę również poniżej

```ts
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
```
