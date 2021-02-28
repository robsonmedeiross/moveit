import { CompletedChallenges } from "../components/CompletedChallenges";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CountDown } from '../components/CountDown'
import styles from '../styles/pages/home.module.css';
import Head from 'next/head';
import { ChalengedBox } from "../components/ChalengedBox";
import { CountDownPrivider } from "../contexts/CountDownContext";
import  { GetServerSideProps } from 'next';
import { ChalengedProvider } from "../contexts/ChalengedContext";

interface HomeProps{
  level: number;
  currentExperience: number;
  chalengedCompleted: number;
}


export default function Home(props: HomeProps) {
  return (
    <ChalengedProvider
      level={props.level}
      currentExperience={props.currentExperience}
      chalengedCompleted={props.chalengedCompleted}
    >
      <div className={styles.container}>
        <Head>
            <title>Inicio | move.it</title>
        </Head>

        <ExperienceBar />

        <CountDownPrivider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <CountDown />
            </div>  
            <div>
              <ChalengedBox />
            </div>
          </section>
        </CountDownPrivider>
      </div>
    </ChalengedProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, chalengedCompleted  } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      chalengedCompleted: Number(chalengedCompleted)
    }
  }
}