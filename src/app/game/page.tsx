'use client';
import React, {useState, useEffect} from 'react';
import Card from "@/components/Card";
import BoardCell from "@/app/game/BoardCell";
import PrimaryButton from "@/components/PrimaryButton";
import ReactConfetti from 'react-confetti'
import {number} from "prop-types";

function Game() {
    const player1 = "X";
    const player2 = "O";

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isDraw, setIsDraw] = useState<boolean>(false);
    const [winner, setWinner] = useState<string | null>(null);
    const [winnerCombination, setWinnerCombination] = useState<number[]>([]);

    const squaresInitials: (string | null)[] = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ];
    const [squares, setSquares] = useState(squaresInitials);
    const [currentPlayer, setCurrentPlayer] = useState(player1);
    const [boardHistory, setBoardHistory] = useState([squaresInitials]);


    const winningCombinations = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8],
    ];

    /**
     * useEffect hook to check winner after
     * every click in cell/ board history update
     */
    useEffect(() => {
        if (squares.every(x => x !== null)) {
            setIsDraw(true);
            setIsPlaying(false);
        }

        if (squares.length > 0) {
            for (const combination of winningCombinations) {
                const [a, b, c] = combination;

                if (
                    squares[a] &&
                    squares[a] === squares[b] &&
                    squares[a] === squares[c]
                ) {
                    setWinnerCombination(combination);
                    setIsPlaying(false);
                    setWinner(squares[a]);
                }
            }
        }
    }, [squares])

    /**
     * Click handler for board cell
     * @param index
     */
    const boardCellClickHandler = (index: number) => {
        if (isPlaying && squares[index] === null) {

            let newHistory = boardHistory.slice(0, squares.filter(x => x !== null).length + 1);

            const newSquares = squares.map((value, i) => (i === index ? currentPlayer : value));

            setSquares(newSquares);
            setBoardHistory(prevHistory => [...newHistory, newSquares]);
            setCurrentPlayer(currentPlayer == player1 ? player2 : player1);
        }
    }

    /**
     * Manage start playing
     * @param isPlaying
     */
    const startPlaying = (isPlaying: boolean) => {
        if (isPlaying) {
            startOver();
        }
        setIsPlaying(isPlaying);
    }

    /**
     * Reset game
     */
    const startOver = () => {
        startPlaying(false);
        setBoardHistory([squaresInitials]);
        setSquares(squaresInitials);
        setCurrentPlayer(player1);
        setWinner(null);
        setWinnerCombination([]);
        setIsDraw(false);
    }

    const timeTravel = (index: number) => {
        setSquares(boardHistory[index])
        setCurrentPlayer(index % 2 ? 'O' : 'X');
    }

    return (
        <Card className={"lg:w-2/3 md:w-4/5 w-5/6"}>

            {winner && <>
                <ReactConfetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
                <audio src={"/crowd-cheering.mp3"} autoPlay={true} className={"hidden"} />
            </>}

            {isDraw && <audio src={"/game-over.mp3"} autoPlay={true} className={"hidden"} />}

            <div className={"flex flex-wrap text-gray-800"}>
                <div className={"flex-auto lg:w-1/2 md:w-2/3 sm:w-full p-4"}>
                    <h2 className={"text-2xl mb-3 text-center"}>Tic-Tac-Toe Board</h2>

                    <div className={"flex flex-wrap"}>
                        {Object.keys(squares).map((value, index) => {
                            return <BoardCell
                                className={winnerCombination.includes(index) ? "bg-green-500 hover:bg-green-500 text-white" : ""}
                                key={value}
                                onClick={() => {boardCellClickHandler(index)}}
                            >{squares[index]}</BoardCell>
                        })}
                    </div>
                </div>
                <div className={"flex-auto lg:w-1/2 md:w-1/3 sm:w-full p-4"}>
                    {(!isPlaying && !winner && !isDraw) && <div className={"flex flex-col justify-center items-center h-full"}>
                        <h2 className={"text-2xl mb-3 text-center"}>Click Start to Play</h2>
                        <PrimaryButton className={"w-20"} onClick={() => {startPlaying(true)}}>Start</PrimaryButton>
                    </div>}

                    {(!isPlaying && isDraw) && <div className={"flex flex-col justify-center h-full "}>
                        <div className={"text-2xl text-center"}>
                            Match Drawn
                        </div>
                        <PrimaryButton className={"w-36 mx-auto mt-3 "} onClick={startOver}>Start Again</PrimaryButton>
                    </div>}

                    {(!isPlaying && winner) && <div className={"flex flex-col justify-center h-full "}>
                        <div className={"text-2xl text-center"}>
                            Player <span className={"font-bold"}>{winner}</span> won the game
                        </div>
                        <PrimaryButton className={"w-36 mx-auto " + (!winner ? "mt-auto" : "mt-3")} onClick={startOver}>Start Over</PrimaryButton>
                    </div>}

                    {isPlaying && <div className={"flex flex-col justify-start ps-4 h-full " + (winner && "items-center")}>
                        <h2 className={"text-2xl mb-3 text-center"}>Let&apos;s Play</h2>
                        <div className={"text-2xl"}>{currentPlayer}&apos;s Turn</div>
                        <ol className={"list-decimal"}>
                            {boardHistory.map((value, index) => {
                                return <li key={index}>
                                    <PrimaryButton className={"mb-2 "} onClick={() => {
                                        timeTravel(index)
                                    }}>{index > 0 ? "Go to Move# " + index : 'Start Over'}</PrimaryButton>
                                </li>

                            })}
                        </ol>
                    </div>}
                </div>
            </div>
        </Card>
    );
}

export default Game;