import React from 'react';
import Header from '../components/Header';

export default () => {
  return (
    <div>
      <Header />
      <div className="container about">
        <h1>How to Use</h1>
        <div className="main-section" style={{maxWidth: '680px',textAlign:"justify", margin: '0 auto', padding: '1em 0.5em'}}>
        Kanji Cards is an app for memorizing kanji words made by Gap.
        Test your kanji knowledge with those cards using Practice Mode! (Hint: it's on the top right!)
        <br></br>
        <br></br>
        You can create your own cards by clicking "Add Card".
        Type in the kanji word, how to read it in hiragana, and its translations.
        Want to edit an existing card? Just click on the card! Simple as that.
        <br></br>
        <br></br>
        Your set of cards is called a Deck, and ideally each deck should have a theme.
        Want to switch deck? Click "Manage Deck" and select one you're going to use.
        You can build a new deck from scratch, but you can also add pre-made decks!
        <br></br>
        <br></br>
        This app also supports offline use. Just do a right click and save the page!
        Save your cards using "Export Deck" feature. Load it back by going into "Add Deck"
        and clicking "Import Deck". Your cards are stored locally in your browser too!
        <br></br>
        <br></br>
        </div>
      </div>
    </div>
  );
}