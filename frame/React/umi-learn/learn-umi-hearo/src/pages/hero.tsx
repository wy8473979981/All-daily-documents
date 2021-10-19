import React, { FC } from 'react';
import styles from './hero.less';
import { connect, HeroModelState, ConnectProps } from 'umi';

interface PageProps extends ConnectProps {
  hero: HeroModelState;
}

const Hero: FC<PageProps> = (props) => {
  console.log(props.hero);
  return (
    <div>
      <h1 className={styles.title}>Page hero</h1>
      <h2>This is {JSON.stringify(props.hero)}</h2>
    </div>
  );
};
export default connect(({ hero }: { hero: HeroModelState }) => ({ hero }))(
  Hero,
);
