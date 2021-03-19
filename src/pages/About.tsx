import React from 'react';
import Header from '../components/Header';

export default () => {
  return (
    <div>
      <Header />
      <div className="container">
        <h1>About the Project</h1>
        <div className="main-section" style={{maxWidth: '680px',textAlign:"justify", margin: '0 auto'}}>
        Kanjicards is an app for memorizing Kanji words. Somehow they operate differently from individual kanji letters.
        So I made this app to prepare for a Japanese language course and practice my TypeScript. Two birds with one stone.
        <br></br>
        <br></br>
        In case you're here just to use the Practice feature, I prepared some of the cards I used during my studies
        so you don't have to make them from scratch.
        <br></br>
        <br></br>
        This project is heavily inspired from Pseudomon's <u><a style={{color: '#ffffff'}} href="https://pseudomon.github.io/lightningcards/#">Lightning Cards</a></u>. This app is completely front-end,
        so you can save the page and it'll work offline. It automatically saves your decks locally in your browser,
        but you can also use the import/exporter feature to create a backup or to move to a different system/browser.
        </div>
      </div>
    </div>
  );
}