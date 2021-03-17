<template>
  <div class="caesar">
    <h1>> Szyfr Cezara</h1>
    <p>Wykonane przez: <b>Piotr Pilszczek</b>, 2ce-n</p><br><br>
    <form class="caesar-form" @submit.prevent="">
      <div class="caesar-form-inputs">
        <input :disabled="loading" class="main-input" v-model="randomWord.word" placeholder="Wpisz tekst do konwersji..." />
        <input :disabled="loading" v-model="randomWord.amount" placeholder="Przes..." />
      </div>
      <div class="caesar-form-buttons">
        <button :disabled="loading" @click="getRandomWord">Losuj słowo</button>
        <button :disabled="loading" @click="getRandomAmount">Losuj przes.</button>
      </div>
      <div class="caesar-form-buttons">
        <button @click="handleCaesar" :disabled="loading" class="primary" type="submit">Szyfruj</button>
        <button @click="handleCaesarBack" :disabled="loading" class="primary" type="submit">Odszyfruj</button>
      </div>
    </form>
    <div class="caesar-result">
      {{ loading ? 'Ładowanie...' : result || 'Tu znajdzie się wynik...' }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import RandomWord from "@/models/RandomWord";

export default defineComponent({
  name: 'Caesar',
  setup() {
    const randomWord = ref<RandomWord>(new RandomWord());
    const result = ref<string>('');
    const loading = ref<boolean>(false);

    const handleCaesar = () => result.value = !randomWord.value.word ? "Wpisz tekst!" : result.value = randomWord.value.caesarCipher();
    const handleCaesarBack = () => result.value = !randomWord.value.word ? "Wpisz tekst!" : result.value = randomWord.value.caesarCipher(-1);

    const getRandomWord = () => {
      loading.value = true;
      randomWord.value.get()
      .catch(e => result.value = `Wystąpił błąd! ${ e }`)
      .finally(() => loading.value = false);
    }

    const getRandomAmount = () => randomWord.value.getAmount()

    return {
      handleCaesar,
      randomWord,
      getRandomWord,
      loading,
      result,
      getRandomAmount,
      handleCaesarBack
    }
  }
});
</script>

<style scoped>
  h1 {
    font-size: 3rem;
  }

  .caesar {
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  }

  .caesar .caesar-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 500px;
  }

  .caesar .caesar-form .caesar-form-inputs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }

  .caesar .caesar-form .caesar-form-inputs input {
    width: 20%;
  }

  .main-input {
    width: 80% !important;
  }

  .caesar .caesar-form .caesar-form-buttons {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }

  input {
    padding: 20px;
    outline: none;
    border: none;
    border-bottom: 2px #2c3e50 solid;
    font-size: 1.3rem;
  }

  input::placeholder {
    font-size: 1.3rem;
  }

  button {
    padding: 10px 30px;
    border: 1px #2c3e50 solid;
    outline: none;
    background: none;
    cursor: pointer;
    width: 100%;
  }

  button:hover {
    background-color: #2c3e50;
    color: white;
  }

  button[disabled] {
    border: 1px #242932 solid;
    background-color: #242932;
  }

  .primary {
    background-color: #2c3e50;
  }

  .primary:hover {
    background-color: white;
    color: #242932;
  }

  .caesar .caesar-result {
    width: 500px;
    height: 50px;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2c3e50;
  }

  @media screen and (max-width: 600px) {
    .caesar .caesar-form, .caesar .caesar-result {
      width: 90vw !important;
    }

    .caesar .caesar-form .caesar-form-buttons {
      flex-direction: column;
    }
  }
</style>
