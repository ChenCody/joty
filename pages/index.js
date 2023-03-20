import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';
import { Input, Button, Image } from 'antd';
import axios from 'axios';
const { Search } = Input;

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [searchGameList, setGameList] = useState([]);
  const [gameInfoList, setGameInfoList] = useState([]);

  const buttonClick = (gameInfo) => {
    console.log('gameInfo', gameInfo);
    if (gameInfo && gameInfo.id) {
      axios.get('/api/getInfoById?id=' + gameInfo.id).then(res => {
        console.log('getInfoById', res.data);

        if (res.status === 200 && res.data && res.data.result) {
          setGameInfoList(res.data.result);
        }
      });
    }
  }


  const searchLoop = [];
  searchGameList.forEach((game,index) => {
    searchLoop.push(<Button key={index} onClick={() => buttonClick(game)}>{game.name}</Button>);
  });

  const gameLoop = [];
  gameInfoList.forEach((game,index) => {
    gameLoop.push(
      <Image
      key={index}
      width={200}
      src={game.url}
      />
    );
  });


  const onSearch = (data) => {
    axios.get('/api/searchGame?game=' + data).then(res => {
      if (res.status === 200 && res.data && res.data.result) {
        setGameList(res.data.result);
      }
    });
  }


  return (
    <>
      <Head>
        <title>查询游戏信息</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>查询游戏封面</h1>
        <Search
          width={300}
          allowClear
          placeholder='请输入你要查询的游戏名'
          onSearch={onSearch}>
        </Search>

        在上面的输入框输入你想搜的游戏名，点击右边的放大镜查询。点击下方出现的游戏名，即可查看该游戏的封面。
        <div>
          {searchLoop}
        </div>
        <div>
          {gameLoop}
        </div>
      </main>
    </>
  )
}

