import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <Image src="/background-image.jpg" alt="background" fill />
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Beaver Scouts Management Program!
        </h1>

        <p className={styles.description}>
          This application stores information on Beaver Scouts, a co-ed youth
          organization that offers children indoor programming and outdoor
          adventures to prepare them for success in the world.
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Logs &rarr;</h2>
            <p>
              Find in-depth information on badges, songs, skits, & meetings.
            </p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Beavers &rarr;</h2>
            <p>Review and manage each Beaver's profile, grade and tailcolor!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Leaders &rarr;</h2>
            <p>
              Discover and review each Leader's profile, colony and contact
              info!
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Admin &rarr;</h2>
            <p>
              Leverage the full power to edit and manage badges, meetings and
              activities.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        Made by Alice, Vlad, Kyle{" "}
        <span className={styles.logo}>
          <Image
            src="/brown-tail.png"
            alt="beaver Logo"
            width={72}
            height={70}
          />
        </span>
      </footer>
    </div>
  );
}
