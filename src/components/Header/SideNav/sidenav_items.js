import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const SideNavItems = () => {

    const items = [
        {
            icon: 'home',
            text: 'Home',
            link: '/'
        }
    ]

    const element = (item,i) => (
        <div key={i}>
            <Link to={item.link}>
                <FontAwesome name={item.icon}/>
                {item.text}
            </Link>
        </div>
    );

    const showItems = () => (
            items.map((item,i)=>{
                       return element(item,i)
                }
    ));

    return (
        <div>
            {showItems()}
        </div>
    )

};

export default SideNavItems;