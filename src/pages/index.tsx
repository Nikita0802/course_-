import React, { useState } from 'react';
import { Htag, Button, P, Tag, Rating } from '../components';





export default function Home(): JSX.Element {

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
    </>
  );
}
