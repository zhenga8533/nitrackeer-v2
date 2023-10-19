import star from '../images/stars.png';
import moon from '../images/moon.png';
import mountain_behind from '../images/mountains_behind.png';
import mountain_front from '../images/mountains_front.png';
import { useEffect } from 'react';
import { TopButton } from '../components/topButton';

export const Home = () => {
    useEffect(() => {
        let stars = document.getElementById('stars');
        let moons = document.getElementById('moon');
        let mountain_behinds = document.getElementById('mountain_behind');
        let text = document.getElementById('text');
        let btn = document.getElementById('btn');
        let mountain_fronts = document.getElementById('mountain_front');

        window.addEventListener('scroll', function() {
            let value = window.scrollY;
            stars.style.left = value * 0.25 + 'px';
            moons.style.top = value * 1.05 + 'px';
            mountain_behinds.style.top = value * 0.5 + 'px';
            mountain_fronts.style.top = value * 0 + 'px';
            text.style.marginRight = value * 3 + 'px';
            text.style.marginTop = value * 1.5 + 'px';
            btn.style.marginTop = value * 1.5 + 'px';
        })
    }, []);

    return (<body className='home'>
        <section>
            <img src={ star } id='stars' alt='stars.png'/>
            <img src={ moon } id='moon' alt='moon.png'/>
            <img src={ mountain_behind } id='mountain_behind' alt='mountain_behind.png'/>
            <h2 id='text'>Nitrackeer</h2>
            <a href='#sec' id='btn'>Explore</a>
            <img src={ mountain_front } id='mountain_front' alt='mountain_front.png'/>
        </section>
        <div class='sec' id='sec'>
            <h2>Welcome to Nitrackeer</h2>
            <p/>
            <p>This website allows you to track the prices and states of various items on the Hypixel Bazaar and Auction House.</p>
            <p>-</p>
            <p>Prices are updated frequently and loaded through utilizing these following APIs:</p>
            <p><a href='https://api.hypixel.net'>https://api.hypixel.net</a></p>
            <p><a href='https://docs.slothpixel.me'>https://docs.slothpixel.me</a></p>
            <p><a href='https://sky.coflnet.com/api/index.html'>https://sky.coflnet.com/api/index.html</a></p>
            <p>-</p>
            <p>Other resources are accessed through these following APIs:</p>
            <p><a href='https://mc-heads.net'>https://mc-heads.net</a></p>
            <p><a href='https://mojang-api-docs.gapple.pw'>https://mojang-api-docs.gapple.pw</a></p>
            <p><a href='https://sky.shiiyu.moe'>https://sky.shiiyu.moe</a></p>
            <p>-</p>
            <p>Thank you for using and enjoy!</p>
        </div>
        <TopButton />
    </body>)
};