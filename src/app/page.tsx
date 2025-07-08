'use client'

import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'


export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const winner = calculateWinner(board)
  useEffect(() => {
    if (winner === '🌚') {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#7f7f7f', '#333333', '#cfcfcf'],
        shapes: ['circle'],
      })
    } else if (winner === '🌝') {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#fffacd', '#ffd700', '#fceabb'],
        shapes: ['circle'],
      })
    }
  }, [winner])

  const status = winner
    ? `🎉 Winner: ${winner}`
    : board.every(Boolean)
    ? "It's a draw!"
    : `Next player: ${isXNext ? '🌚 New Moon' : '🌝 Full Moon'}`

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? '🌚' : '🌝'
    setBoard(newBoard)
    setIsXNext(!isXNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-stars p-6">
      <div className="bg-gray-800 rounded-3xl border-4 border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.6)] p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">🌟 Tic-Tac-Gloe 🌟</h1>
        <p className="mb-4 text-lg text-white text-center">{status}</p>

        <div className="mx-auto w-[16rem] grid grid-cols-3 gap-2">
          {board.map((square, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`w-20 h-20 text-3xl font-bold text-white rounded-md flex items-center justify-center
                          transition-all duration-300 ease-in-out hover:scale-110
                          ${
                            square === '🌝'
                              ? 'bg-yellow-100 border-2 border-yellow-400 shadow-[0_0_10px_#fef08a]'
                              : square === '🌚'
                              ? 'bg-gray-800 border-2 border-gray-500 shadow-[0_0_10px_#9ca3af]'
                              : 'bg-gray-700 border-2 border-transparent hover:bg-indigo-500 hover:shadow-[0_0_10px_#818cf8]'
                          }`}
            >
              {square && <span className="animate-pop-in origin-center">{square}</span>}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={resetGame}
            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md transition-all duration-200 ease-in-out
                      hover:scale-105 active:scale-95 hover:shadow-[0_0_10px_4px_rgba(129,140,248,0.7)] w-fit mx-auto"
          >
            Reset Board
          </button>
        </div>
      </div>
    </main>
  )
}

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
