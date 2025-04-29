import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const uniqueEmojis: string[] = [
    "🍎", "🍌", "🍓", "🍉", "🍍",
    "🍒", "🍊", "🍇", "🥝", "🍑"
  ];

  const emojis: string[] = [...uniqueEmojis, ...uniqueEmojis];

  // Game state
  const [flipped, setFlipped] = useState<boolean[]>(Array(emojis.length).fill(false));
  const [matched, setMatched] = useState<boolean[]>(Array(emojis.length).fill(false));
  const [turns, setTurns] = useState<number>(0);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [shuffledEmojis, setShuffledEmojis] = useState<string[]>([]);

  // Shuffle function
  const shuffleEmojis = () => {
    return [...emojis].sort(() => Math.random() - 0.5);
  };

  // Shuffle emojis on initial load and when restarting
  useEffect(() => {
    setShuffledEmojis(shuffleEmojis());
  }, []);

  const handleCardClick = (index: number) => {
    if (flipped[index] || matched[index] || selectedCards.length === 2) return;

    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);

    if (newSelected.length === 2) {
      const [firstIndex, secondIndex] = newSelected;
      const firstEmoji = shuffledEmojis[firstIndex];
      const secondEmoji = shuffledEmojis[secondIndex];

      if (firstEmoji === secondEmoji) {
        const newMatched = [...matched];
        newMatched[firstIndex] = true;
        newMatched[secondIndex] = true;
        setMatched(newMatched);
        setSelectedCards([]);
      } else {
        setTimeout(() => {
          const resetFlipped = [...flipped];
          resetFlipped[firstIndex] = false;
          resetFlipped[secondIndex] = false;
          setFlipped(resetFlipped);
          setSelectedCards([]);
        }, 1000);
      }

      setTurns(prev => prev + 1);
    }
  };


  const handleRestart = () => {
    setFlipped(Array(emojis.length).fill(false));
    setMatched(Array(emojis.length).fill(false));
    setTurns(0);
    setShuffledEmojis(shuffleEmojis());
  };

  return (
    <div className="game-container">
      {/* <h4>Welcome to Memory Game</h4> */}
      <h2>Welcome to Memory Game</h2>
      <div className="game-board">
        {shuffledEmojis.map((emoji, index) => (
          <div key={index} className={`card ${flipped[index] || matched[index] ? 'flipped' : ''}`}>
            <div className="card-inner" onClick={() => handleCardClick(index)}>
              <div className="card-front">{emoji}</div>
              <div className="card-back"></div>
            </div>
          </div>

        ))}
      </div>
      <div className="info">
        <p>Turns: {turns}</p>
        <button onClick={handleRestart}>Restart Game</button>
      </div>
    </div>
  );
}

export default App;
