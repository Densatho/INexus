import styles from "src/styles/Home.module.css";
import handler from "./api/hello";

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

export function getStaticProps(props) {
  // const users = handler(p, NextApiResponse);
  console.log(`> Get static props:`);
  console.log(`  > Next Api:`);
  return {
    props: {
      users: [
        {
          name: "John Doe",
          age: 20,
          from: "United States of America",
        },
        {
          name: "Lucas Henrique Azzi",
          age: 21,
          from: "Brazil",
        },
      ],
    },
  };
}

export function GetStaticPathsResult(props) {
  console.log(`> Path Results:`);
  console.log(`  > props:`, props);
}

export default Home;
