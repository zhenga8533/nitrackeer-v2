import { useState, useEffect } from 'react';
import axios from 'axios';
import { toProperCase, nFormatter, imageOnError } from '../../components/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faGrip, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Loading } from '../Loading';
import { TopButton } from '../../components/topButton';

const Bazaar = () => {
    const [items, setItems] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [view, setView] = useState('list-view');

    // List control
    useEffect(() => {
        axios.get('https://api.slothpixel.me/api/skyblock/bazaar')
        .then(res => {
            // Fomatting as array since I was not able to map a dictionary into react
            // Array indexes: [name, product_id, sellPrice, sellMovingWeek, buyPrice, buyMovingWeek]
            let list = [];
            for (const [_, value] of Object.entries(res.data)) {
                const stats = value.quick_status;
                const id = value.name ? value.name : toProperCase(stats.productId);
                if (stats.buyMovingWeek) {
                    list.push([
                        id,
                        stats.productId,
                        nFormatter(stats.sellPrice, 1),
                        nFormatter(stats.sellMovingWeek, 1),
                        nFormatter(stats.buyPrice, 1),
                        nFormatter(stats.buyMovingWeek, 1),
                    ])
                }
            }
            setItems(list);
            setFiltered(list);
        })
        .catch(err => console.log(err));
    }, []);

    // Control search bar
    const searchChange = (event) => {
        setSearch(event.target.value);
    };
    const searchSubmit = (event) => {
        event.preventDefault();
        setFiltered(items.filter(item => item[0].toLowerCase().includes(search.toLowerCase())));
    };

    if (!items.length) return <Loading />;

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
            <input type='text' value={ search } onChange={ searchChange } placeholder='Enter product name here'/>
            <input className='search' type='submit' value='Search' />
        </form>

        <div className='view_main'>
            <div className={ 'view_wrap ' + view }>
                { filtered.map((item) => {
                    return (<div className='view_item' key={ item[1] }>
                        <div className='vi_left'>
                            <img src={ 'https://sky.lea.moe/item/' + item[1] } alt='product' onError={ imageOnError }/>
                        </div>
                        <div className='vi_right'>  
                            <p className='title'>{ item[0] }</p>
                            {
                                view === 'list-view' ?
                                <p className='content'>
                                    <strong> Insta Sell: </strong>{ item[2] } coins&emsp;&ensp;
                                    <strong> Weekly Sell: </strong>{ item[3] }&emsp;&ensp;
                                    <strong> Insta Buy: </strong>{ item[4] } coins&emsp;&ensp;
                                    <strong> Weekly Buy: </strong>{ item[5] }
                                </p> :
                                <p className='content'>
                                    <p className='content'><strong> Insta Sell: </strong>{ item[2] } coins</p>
                                    <p className='content'><strong> Weekly Sell: </strong>{ item[3] }</p>
                                    <p className='content'><strong> Insta Buy: </strong>{ item[4] } coins</p>
                                    <p className='content'><strong> Weekly Buy: </strong>{ item[5] }</p>
                                </p>
                            }
                            <a className='btn' href={ '/bazaar/'+item[1] }>View More</a>
                        </div>
                    </div>);
                })}
            </div>
        </div>
        <TopButton />
    </div>);
};

export default Bazaar;
