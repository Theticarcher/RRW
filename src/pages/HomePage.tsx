import React from 'react';
import '../styling/style.sass';
import info from '../assets/info.json'


const HomePage: React.FC = () => {
   return (
    <div id='welcome'>
        <title>{info.title}</title>
        <h1 id='wh1'>{info.wh1}</h1>
        <h2 id='wh2'>{info.wh2}</h2>
    </div>
   );
}
export default HomePage;