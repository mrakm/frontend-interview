import apolloLogo from "./assets/apollo-logo.jpeg";
import styles from "./App.module.css";
import classnames from "classnames";

function App() {
  return (
    <div className={styles.root}>
      <a href="https://www.apollo.io/tech-blog" target="_blank">
        <img
          src={apolloLogo}
          className={classnames(styles.logo)}
          alt="Apollo logo"
        />
      </a>
      <h1>Thanks for interviewing with Apollo!</h1>
      &#8249;Your code here&#8250;
    </div>
  );
}

export default App;
