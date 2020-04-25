import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Home from "./Components/Home"
import ParticipantsList from './Components/ParticipantsList'
import Detail from './Components/DetailedView'

const StackNav = createStackNavigator({
    Participants:ParticipantsList,
    Details:Detail
})
const TabNavigator = createBottomTabNavigator({
    Register: Home ,
    List: StackNav,

  },);
  
  const MyNavigator = createAppContainer(TabNavigator);


export default class Navigation extends Component {
    
    render(){
        return(<MyNavigator/>)
    }
}
