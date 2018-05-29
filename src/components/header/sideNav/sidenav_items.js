import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const SideNavItems = () => {

  const items = [
    {
      type: 'navItem',
      icon: 'home',
      text: 'Home',
      link: '/'
    },
    {
      type: 'navItem',
      icon: 'sign-in',
      text: 'Log in',
      link: '/login'
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'My Profile',
      link: '/user'
    },
    {
      type: 'navItem',
      icon: 'sign-out',
      text: 'Logout',
      link: '/user/logout'
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Logout',
      link: '/user/register'
    },
    {
      type: 'navItem',
      icon: 'plus-circle',
      text: 'Add job',
      link: '/user/add'
    }
  ];

  const element = (item, i) => (
    <div key={i} className={item.type}>
      <Link to={item.link}>
        <FontAwesome name={item.icon}/>
        {item.text}
      </Link>
    </div>
  );

  const showItems = () => (
    items.map((item, i) => {
        return element(item, i)
      }
    ));

  return (
    <div>
      {showItems()}
    </div>
  )

};

export default SideNavItems;