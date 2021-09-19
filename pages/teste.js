import styles from "src/styles/Home.module.css";

function Home(props) {
  const users = props.users;
  return (
    <div
      style={{
        marginTop: "5rem",
      }}
    >
      <h1 className={styles.title}>
        Bem vindo a Nexus, um site de apostas dos campeonatos oficiais de League
        of Legends
      </h1>
      <p className={styles.description}>usuários cadastrados: </p>
    </div>
  );
}

export default Home;
