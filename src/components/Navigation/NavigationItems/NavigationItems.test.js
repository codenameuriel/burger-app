import React from 'react';

// enzyme library allows for unit testing by creating standalone instances of the component being tested
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from '../NavigationItem/NavigationItem';

// connect enzyme to React application
configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  let wrapper;

  // helper function that executes before each test
  beforeEach(() => {
    // shallow allows rendering React component without rendering nested components 
    wrapper = shallow(<NavigationItems />);
  }); 

  it('it should render two <NavigationItem /> elements if not authenticated', () => {
    // NavigationItem is represented as function and not JSX
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('it should render three <NavigationItem /> elements if authenticated', () => {
    wrapper.setProps({isAuth: true});
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
});
