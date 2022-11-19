import Link from "next/link";
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
          <Link href="/logs" className={styles.card}>
            <h2>Logs &rarr;</h2>
            <p>
              Find in-depth information on badges, songs, skits, & meetings.
            </p>
          </Link>

          <Link href="/beavers" className={styles.card}>
            <h2>Beavers &rarr;</h2>
            <p>Review and manage each Beaver's profile, grade and tailcolor!</p>
          </Link>

          <Link href="/leaders" className={styles.card}>
            <h2>Leaders &rarr;</h2>
            <p>
              Discover and review each Leader's profile, colony and contact
              info!
            </p>
          </Link>

          <Link href="/admin" className={styles.card}>
            <h2>Admin &rarr;</h2>
            <p>
              Leverage the full power to edit and manage badges, meetings and
              activities.
            </p>
          </Link>
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
