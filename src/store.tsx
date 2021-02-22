
function shuffle(oldArray: any) {
  let array = oldArray.slice(0)
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
  console.log('New array:', array)
  return array
}

function meme(str: string) {
  console.log('meme')
  return str[0]
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
  }

  addCard(cardData: CardContent) {
    console.log('Add card:', cardData)
    let newCard = new Card(cardData)
    this.cards.push(newCard)
    return newCard
  }

  removeCard(i: number) {
    console.log('Remove card...', i)
    this.cards.splice(i,1)
    console.log('All cards:', this)
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
}

const currentDeck = new Deck(sampleCards)

export { currentDeck }
