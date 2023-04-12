import React, { useState } from 'react';
import { Htag, Button, P, Tag, Rating } from '../components';
import { withLayout } from '../layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';





function Home({ menu }: HomeProps): JSX.Element {

  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag={'h1'} >Текст 1</Htag>
      <Button appearance='primary' arrow='right' >Кнопка 1</Button>
      <Button appearance='ghost' arrow='down'>Кнопка 2</Button>
      <P size='m'>
        Идет два программиста по улице, один говорит другому:
      </P>
      <Tag size='m' >Ты знаешь, моя жена сказала, что если я еще раз проведу ночь с клавиатурой, то она уйдет от меня.</Tag>
      <Tag size='s' color='red'> И как ты собираешься это предотвратить?</Tag>
      <Tag color='primary' >Я перейду на мышь.</Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      {menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}