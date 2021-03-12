// function generateRandomNumber(x: number) {
//   let arr = [];
//   while(arr.length < x) { // This will generate 'x' random numbers
//     let r = Math.floor(Math.random() * 100) + 1;
//     if(arr.indexOf(r) === -1) arr.push(r);
//   }
//   return arr.join('')
// }

function shuffle(oldArray: any) {
  let array = oldArray.slice(0)
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
  console.log('New array:', array)
  return array
}

class Card {
  kanji: string;
  hiragana: string;
  translate: Array<string>;
  constructor(cardData: CardContent) {
    this.kanji = cardData.kanji || ''
    this.hiragana = cardData.hiragana || ''
    this.translate = cardData.translate || []
  }

  changeContent(cardData: CardContent) {
    this.kanji = cardData.kanji || ''
    this.hiragana = cardData.hiragana || ''
    this.translate = cardData.translate || []
    console.log('Change content:', this)
  }
}

let sampleCards = [
  new Card({
    kanji: '学生',
    hiragana: 'がくせい',
    translate: ['student'],
  }),
  new Card({
    kanji: '先生',
    hiragana: 'せんせい',
    translate: ['teacher', 'instructor', 'master', 'sensei', 'elder'],
  }),
  new Card({
    kanji: '割引',
    hiragana: 'わりびき',
    translate: ['discount', 'reduction'],
  })
]

class Deck {
  name: string;
  cards: Array<Card>;
  currentSession: any;
  // id: string;

  constructor(cards: Array<Card>) {
    this.name = "Sample Cards"
    this.cards = cards || sampleCards
    this.currentSession = {
      deck: this.cards.slice(0),
      correctCounter: 0,
      playedCounter: 0,
      setting: 'default',
      totalCount: this.cards.length
    }
    // this.id = `${this.name}#${generateRandomNumber(4)}`
  }

  addCard(cardData: CardContent) {
    let newCard = new Card(cardData)
    this.cards.push(newCard)
    return newCard
  }

  removeCard(i: number) {
    this.cards.splice(i,1)
  }

  shuffleAllCards() {
    let allCards = this.cards.slice(0)
    console.log('Shuffle all cards', allCards)
    this.currentSession.deck = shuffle(allCards)
    this.currentSession.totalCount = allCards.length
  }

  startNewSession(setting='default') {
    this.currentSession.correctCounter = 0
    this.currentSession.playedCounter = 0
    this.currentSession.setting = setting
    this.shuffleAllCards()
  }

  drawCard() {
    // return a card from the end and remove it from the deck
    return this.currentSession.deck.pop()
  }

  setNumOfCards(num: number) {
    // for practice session with a set number of cards
    if (num >= this.cards.length || num <= 1) { return }
    for (let i = 1; i < num; i++) {
      this.currentSession.deck.pop()
    }
  }

  changeName(name: string) {
    this.name = name
  }

  replaceDeck(deckData: Deck) {
    console.log('Replace deck', deckData)
    // Changing name
    this.changeName(deckData.name)
    const newCards = deckData.cards

    // Emptying cards in the Deck
    this.cards = []

    // Putting in all the new cards
    newCards.forEach((card) => {
      this.addCard(card)
    })

    // Shuffling the new deck
    this.shuffleAllCards()
  }

  saveToLocalStorage() {
    let deck = { name: this.name, cards: this.cards}
    let exportedDeck = JSON.stringify(deck)
    localStorage.setItem("kanjicards", exportedDeck)
  }

  getFromLocalStorage() {
    const importedDeck = localStorage.getItem("kanjicards")
    if (!importedDeck) { return }
    console.log(importedDeck, 'imported')
    const deck = JSON.parse(importedDeck)
    this.replaceDeck(deck)
    // Down testing code, no need to return anything
    return importedDeck
  }

  getAllLocalDecks() {
    const allDecks = localStorage.getItem("kanjidecks")
    return (allDecks) ? JSON.parse(allDecks) : undefined 
  }

  compileAllDecks() {
    const cards = this.cards
    const deck = { name: this.name, cards: cards }

    const JSONdata = localStorage.getItem("kanjidecks")
    const oldDecks = JSONdata ? JSON.parse(JSONdata) : undefined
    let newDecks

    // If there's none stored yet, make a new array
    if (oldDecks) {
      newDecks = oldDecks.concat([deck])
    }
    else {
      newDecks = [this]
    }
    console.log('Set item LC "kanjidecks"', newDecks)
    localStorage.setItem("kanjidecks", JSON.stringify(newDecks))
  }

  removeFromLocalDecks(i: number) {
    const JSONdata = localStorage.getItem("kanjidecks")
    if (!JSONdata) { return }
    let newDecks = JSON.parse(JSONdata)
    newDecks.splice(i, 1)
    localStorage.setItem("kanjidecks", JSON.stringify(newDecks))
  }

  destroyLocalDecks() {
    localStorage.removeItem("kanjidecks")
  }
}

const store = new Deck(sampleCards)

export { store }
