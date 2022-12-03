import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

const lolIcon = './png-transparent-league-of-legends-gamer-saiyan-drawing-league-of-legends-game-fictional-character-legend.png'

export default function Home() {
  const [championIput, setChampionInput] = useState("");
  const [showChampion, setShowChampion] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ champion: championIput }),
    });
    const data = await response.json();
    setShowChampion("")
    setResult(data.result);
    setShowChampion(championIput)
    setChampionInput("");
  }

  return (
    <div>
      <Head>
        <title>Generate one trick username</title>
        <link rel="icon" href={lolIcon} />
      </Head>

      <main className={styles.main}>
        <img src={lolIcon} className={styles.icon} />
        <h3>Generate one trick username</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter a champion"
            value={championIput}
            onChange={(e) => setChampionInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>
          {showChampion && <h2>Champion input: {showChampion[0].toUpperCase() + showChampion.slice(1).toLowerCase()}</h2>}
          {result}
          </div>
      </main>
    </div>
  );
}
