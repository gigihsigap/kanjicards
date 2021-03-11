import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const {store} = require('../store.tsx');

export default (props:any) => {
  // Ganti sistem dari yang sekarang jadi punyanya Aliya

  const downloadJSON = () => {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store.cards));
    var dlAnchorElem:any = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",dataStr);
    // Perlu handle ketika ada spasi di nama
    dlAnchorElem.setAttribute("download", `${store.name}.json`);
  }

  

  const importFileChosen = (e:any) => {
    // When a file is selected for import, read its content and put it into the state that fills the textbox.
    // const theFile = e.target.files[0]

    // let reader = new FileReader()

    // reader.onload = (() => {
    //   return (e) => {
    //     this.update({
    //       deckToImport: e.target.result
    //     })
    //   }
    // })()

    // reader.readAsText(theFile)
  }

  const importDeck = () => {
    // const deckToImport = this.state.deckToImport
    // const importedDeck = JSON.parse(deckToImport)

    // this.props.deck.replaceDeck(importedDeck)
    // this.props.updateDeck()

    // this.update({ imported: true })
  }

  const changeImportText = (e: any) => {
    // this.update({
    //   deckToImport: e.target.value
    // })
  }

  


  
  return (
    <div>
      <Header />
        

        {/* <input type="file" onchange={ importFileChosen }>

        <div>
          <textarea oninput={ changeImportText }>{ state.deckToImport }</textarea>
        </div>
        <div>
          <button onclick={ importDeck }>Click to import cards</button>
        </div> */}
        

        <h1>Export</h1>
        <textarea defaultValue={JSON.stringify(store.cards,null,2)} />
        <a id="downloadAnchorElem" onClick={() => downloadJSON()}><button>Download</button></a>
      <Footer/>
    </div>
  );
}