import { useState } from "react";
import axios from "axios";
import { toIdCase, imageOnError } from "../util/functions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faGrip, faSearch } from '@fortawesome/free-solid-svg-icons'
import { TopButton } from "../components/topButton";

export const Auction = () => {
    const [view, setView] = useState("list-view");
    const [search, setSearch] = useState("");
    const [items, setItems] = useState([]);

    // Control search bar
    const searchChange = (event) => {
        setSearch(event.target.value);
    };
    const searchSubmit = (event) => {
        event.preventDefault();
        axios.get("https://sky.coflnet.com/api/auctions/tag/" + search + "/active/bin")
        .then(res => {
            let list = [];
            res.data.forEach(auction => {
                list.push([
                    auction.itemName,
                    auction.uuid,
                    auction.auctioneerId,
                    auction.tier,
                    auction.startingBid,
                    auction.end,
                    auction.tag
                ]);
            });
            setItems(list);
        }).catch(err => alert(err));
    };

    return (
    <div className="wrapper">
        <div className="links">
            <ul>
                <li className="li-list" onClick={ () => setView("list-view") }>
                    <FontAwesomeIcon icon={ faList }/> List View</li>
                <li className="li-grid" onClick={ () => setView("grid-view") }>
                    <FontAwesomeIcon icon={ faGrip }/> Grid View</li>
            </ul>
        </div>

        <form onSubmit={ searchSubmit }>
            <label><FontAwesomeIcon icon={ faSearch }/>&ensp;</label>
            <input type="text" value={search} onChange={ searchChange } placeholder="Enter item name here"/>
            <input className="search" type="submit" value="Search" />
        </form>

        <div className="view_main">
            { /* Player auction information display */ }
            <div className={ "view_wrap " + view }>
                { items.map((item) => {
                    return (<div className="view_item" key={ item[1] }>
                        <div className="vi_left">
                            <img src={ "https://sky.lea.moe/item/" + toIdCase(item[6]) } alt="product" onError={ imageOnError }/>
                        </div>
                        <div className="vi_right">  
                            <p className="title">{ item[0] }</p>
                            {
                                view === "list-view" ?
                                <p className="content">
                                    <p className="content">
                                        <strong> ID: </strong>{ item[1] } &emsp;&ensp;
                                        <strong> Seller: </strong>{ item[2] } &emsp;&ensp;
                                    </p>
                                    <p className="content">
                                        <strong> Tier: </strong>{ item[3] } &emsp;&ensp;
                                        <strong> Price: </strong>{ item[4] } &emsp;&ensp;
                                        <strong> End Date: </strong>{ item[5] } &emsp;&ensp;
                                    </p>
                                </p> :
                                <p className="content">
                                    <p className="id"><strong> ID: </strong>{ item[1] }</p>
                                    <p className="id"><strong> Seller: </strong>{ item[2] }</p>
                                    <p className="content"><strong> Tier: </strong>{ item[3] }</p>
                                    <p className="content"><strong> Price: </strong>{ item[4] }</p>
                                    <p className="content"><strong> Ends: </strong>{ item[5] }</p>
                                </p>
                            }
                            <a className="btn" href={ "/auction/"+item[1] }>View More</a>
                        </div>
                    </div>);
                })}
            </div>
        </div>
        <TopButton />
    </div>);
};
