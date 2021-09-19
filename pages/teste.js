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
      {Object.entries(users).map(([key, value]) => (
        <p className={styles.description}>
          {value.name}, {value.age} anos do {value.from}
        </p>
      ))}
    </div>
  );
}

export async function getStaticProps(context) {
  const response = await fetch("http://localhost:3000/api/hello");
  const users = await response.json();
  console.log(`> Get static props:`);
  console.log(`  > Next Api:`, users);
  return {
    props: {
      users: users,
    },
  };
}

export default Home;
