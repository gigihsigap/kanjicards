import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const {store} = require('../store.tsx');

export default (props:any) => {

  const downloadJSON = () => {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store.cards));
    var dlAnchorElem:any = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",dataStr);
    // TODO: Allow space on file name?
    dlAnchorElem.setAttribute("download", `${store.name}.json`);
  }
  
  return (
    <div>
      <Header />
        <h1>Export Deck</h1>
        <a id="downloadAnchorElem" onClick={() => downloadJSON()}>
          <button className="btn">Click here to download as JSON!</button>
        </a>
        <div>
          <textarea
            defaultValue={JSON.stringify(store.cards,null,2)}
            style={{width:'500px', height:'300px', marginTop: '1em'}}
            />
        </div>
      <Footer/>
    </div>
  );
}