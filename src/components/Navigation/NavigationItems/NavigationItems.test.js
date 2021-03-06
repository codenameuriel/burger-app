import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from '../NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  }); 

  it('it should render two <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('it should render three <NavigationItem /> elements if authenticated', () => {
    wrapper.setProps({isAuth: true});
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('it should render sign out <NavigationItem /> element if authenticated', () => {
    wrapper.setProps({isAuth: true});
    expect(wrapper.contains(<NavigationItem link="/logout">Sign Out</NavigationItem>)).toEqual(true);
  });
});
