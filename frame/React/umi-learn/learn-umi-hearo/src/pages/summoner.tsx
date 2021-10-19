import React, { FC } from 'react';
import styles from './summoner.less';
import { connect, SummonerModelState, ConnectProps } from 'umi';

interface PageProps extends ConnectProps {
  summoner: SummonerModelState;
}

const Summoner: FC<PageProps> = (props) => {
  console.log(props.summoner);
  return (
    <div>
      <h1 className={styles.title}>Page summoner</h1>
      <h2>This is {props.summoner.name}</h2>
    </div>
  );
};
export default connect(({ summoner }: { summoner: SummonerModelState }) => ({ summoner }))(
  Summoner,
);
