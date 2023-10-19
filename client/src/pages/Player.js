import { useState } from 'react';
import axios from 'axios';
import { toIdCase, imageOnError } from '../util/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faGrip, faSearch } from '@fortawesome/free-solid-svg-icons'
import { TopButton } from '../components/topButton';

export const Player = () => {
    const [view, setView] = useState('list-view');
    const [search, setSearch] = useState('');
    const [player, setPlayer] = useState('Volcaronitee');
    const [uuid, setUuid] = useState('58e7ba62ed31445c8fa71cf5ed575940');
    const [items, setItems] = useState([]);

    // Control search bar
    const searchChange = (event) => {
        setSearch(event.target.value);
    };
    const searchSubmit = (event) => {
        event.preventDefault();
        setPlayer(search);
        axios.get('https://api.ashcon.app/mojang/v2/user/' + search)
        .then(res => {
            setPlayer(res.data.username);
            setUuid(res.data.uuid.replace(/-/g, ''));
            axios.get(`https://api.hypixel.net/skyblock/auction?key=${process.env.REACT_APP_API_KEY}&player=` + res.data.uuid.replace(/-/g, ''))
            .then(res => {
                let list = [];
                res.data.auctions.forEach(auction => {
                    list.push([
                        auction.item_name,
                        auction._id,
                        auction.tier,
                        auction.starting_bid,
                        auction.claimed.toString(),
                    ]);
                });
                setItems(list);
            })
        }).catch(err => alert('Invalid username!'));
    };

    return (
    <div className='wrapper'>
        <div className='links'>
            <ul>
                <li className='li-list' onClick={ () => setView('list-view') }>
                    <FontAwesomeIcon icon={ faList }/> List View</li>
                <li className='li-grid' onClick={ () => setView('grid-view') }>
                    <FontAwesomeIcon icon={ faGrip }/> Grid View</li>
            </ul>
        </div>

        <form onSubmit={ searchSubmit }>
            <label><FontAwesomeIcon icon={ faSearch }/>&ensp;</label>
            <input type='text' value={search} onChange={ searchChange } placeholder='Enter username here'/>
            <input className='search' type='submit' value='Search' />
        </form>

        <div className='view_main'>
            { /* Player information display */ }
            <div className={ 'view_wrap list-view' }>
                <div className='view_item' key={ player }>
                    <div className='vi_left'>
                        <img src={ 'https://mc-heads.net/avatar/' + player } alt='product' onError={ imageOnError }/>
                    </div>
                    <div className='vi_right'>  
                    <a className='name' href={ 'https://sky.shiiyu.moe/stats/' + player }>{ player }</a>
                        <p className='content'> <strong> UUID: </strong> { uuid }</p>
                    </div>
                </div>
            </div>

            { /* Player auction information display */ }
            <div className={ 'view_wrap ' + view }>
                { items.map((item) => {
                    return (<div className='view_item' key={ item[1] }>
                        <div className='vi_left'>
                            <img src={ 'https://sky.lea.moe/item/' + toIdCase(item[0]) } alt='product' onError={ imageOnError }/>
                        </div>
                        <div className='vi_right'>  
                            <p className='title'>{ item[0] }</p>
                            {
                                view === 'list-view' ?
                                <p className='content'>
                                    <strong> ID: </strong>{ item[1] } &emsp;&ensp;
                                    <strong> Tier: </strong>{ item[2] } &emsp;&ensp;
                                    <strong> Price: </strong>{ item[3] } &emsp;&ensp;
                                    <strong> Sold: </strong>{ item[4] }
                                </p> :
                                <p className='content'>
                                    <p className='content'>{ item[1] }</p>
                                    <p className='content'><strong> Tier: </strong>{ item[2] }</p>
                                    <p className='content'><strong> Price: </strong>{ item[3] }</p>
                                    <p className='content'><strong> Sold: </strong>{ item[4] }</p>
                                </p>
                            }
                            <a className='btn' href={ '/auction/'+item[1] }>View More</a>
                        </div>
                    </div>);
                })}
            </div>
        </div>
        <TopButton />
    </div>);
};
