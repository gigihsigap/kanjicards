import React from 'react';
import CompleteCard from './CompleteCard';

// let allCards = [
//   {
//     kanji: '1',
//     hiragana: 'ichi',
//     translate: 'one',
//   },
//   {
//     kanji: '2',
//     hiragana: 'ni',
//     translate: 'two',
//   }
// ]

interface CompleteCardProps {
  data: {
    kanji: string,
    hiragana: string,
    translate: string[],
  }
}

const CardList: React.FC<{}> = (props) => {
  return (
    <div>
      <div>
        {/* {allCards.map((each) => (
          <div style={{margin: "1.3em"}}>
            <CompleteCard content={each}/>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default CardList;