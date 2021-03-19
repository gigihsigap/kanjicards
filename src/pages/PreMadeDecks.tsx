import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const {store} = require('../store.tsx');

export default () => {
  // TODO: Add premade decks section

  return (
    <div>
      <Header />
        
      <Footer/>
    </div>
  );
}