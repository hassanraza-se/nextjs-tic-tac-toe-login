'use client';
import React, {useState, useEffect} from 'react';
import Card from "@/components/Card";
import BoardCell from "@/app/game/BoardCell";
import PrimaryButton from "@/components/PrimaryButton";
import ReactConfetti from 'react-confetti'

function Game() {
    const player1 = "X";
    const player2 = "O";

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [winner, setWinner] = useState<string | null>(null);
    const [winnerCombination, setWinnerCombination] = useState<number[]>([]);


    type CellValue = string | null
    type SquareType = {
        [index: number]: CellValue;
    };

    const squaresInitials: SquareType= {
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
    };
    const [squares, setSquares] = useState<SquareType>(squaresInitials);
    const [currentPlayer, setCurrentPlayer] = useState(player1);
    const [boardHistory, setBoardHistory] = useState<SquareType>({});

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
        if (Object.keys(boardHistory).length > 0) {
            for (const combination of winningCombinations) {
                const [a, b, c] = combination;

                if (
                    boardHistory[a] !== undefined &&
                    boardHistory[a] === boardHistory[b] &&
                    boardHistory[a] === boardHistory[c]
                ) {
                    setWinnerCombination(combination);
                    setIsPlaying(false);
                    setWinner(boardHistory[a]);
                }
            }
        }
    }, [boardHistory])

    /**
     * Click handler for board cell
     * @param index
     */
    const boardCellClickHandler = (index: number) => {
        if (isPlaying && squares[index] === null) {
            setSquares(prevState => ({
                ...prevState,
                [index]: currentPlayer
            }));

            setBoardHistory(prevState => ({
                ...prevState,
                [index]: currentPlayer
            }))
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
        setBoardHistory({});
        setSquares(squaresInitials);
        setCurrentPlayer(player1);
        setWinner(null);
        setWinnerCombination([]);
    }

    return (
        <Card className={"w-2/3 p-4"}>

            {winner && <>
                <ReactConfetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
                <audio src={"/crowd-cheering.mp3"} autoPlay={true} className={"hidden"} />
            </>}

            <div className={"flex text-gray-800"}>
                <div className={"flex-auto w-1/2"}>
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
                <div className={"flex-auto w-1/2 px-6"}>
                    {(!isPlaying && !winner) && <div className={"flex flex-col justify-center items-center h-full"}>
                        <h2 className={"text-2xl mb-3 text-center"}>Click Start to Play</h2>
                        <PrimaryButton className={"w-20"} onClick={() => {startPlaying(true)}}>Start</PrimaryButton>
                    </div>}

                    {(!isPlaying && winner) && <div className={"flex flex-col justify-center h-full "}>
                        <div className={"text-2xl text-center"}>
                            Player <span className={"font-bold"}>{winner}</span> won the game
                        </div>
                        <PrimaryButton className={"w-36 mx-auto " + (!winner ? "mt-auto" : "mt-3")} onClick={startOver}>Start Over</PrimaryButton>
                    </div>}

                    {isPlaying && <div className={"flex flex-col justify-center h-full " + (winner && "items-center")}>
                        <h2 className={"text-2xl mb-3 text-center"}>Let&apos;s Play</h2>
                        <div className={"text-2xl"}>{currentPlayer}&apos;s Turn</div>
                        <div>
                            {Object.keys(boardHistory).map((value, index) => {
                                return <div key={index}>{value} =&gt; {boardHistory[index]} </div>
                            })}
                        </div>
                        <PrimaryButton
                            className={"w-36 mx-auto " + (!winner ? "mt-auto" : "mt-3")}
                            onClick={startOver}
                        >Start
                            Over
                        </PrimaryButton>
                    </div>}
                </div>
            </div>
        </Card>
    );
}

export default Game;