/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View,Text, FlatList, TouchableOpacity,StyleSheet,Image} from 'react-native';
import firebase from '../fb'


class ParticipantsList extends Component {


  constructor(props){
    super(props);
    this.state={
        participants:[],
    }
}
  
componentDidMount(){
  firebase.database().ref().on('value', (snapshot)=> {
    var part = []
    snapshot.forEach((child) => {
      part.push({
        key: child.key,
        Name: child.val().Name,
        USN: child.val().USN,
        Event: child.val().Event,
        Phone:child.val().Phone,
        College:child.val().College,
        City: child.val().City,
        avatarSource: child.val().avatarSource,
       
      })
    })
  //console.log(part)
  this.setState({participants:part})
  });
}

  render(){
    console.log(this.state.participants)
    return(
      <View style={{alignSelf:'center', flex:1, justifyContent:'center'}}>
        <FlatList style={{width:'100%'}}
        data={this.state.participants}
        keyExtractor={(item)=>item.key}
        renderItem={({item})=>{
          return(
            <View>
              
            <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{this.props.navigation.navigate('Details',{...item})}}>
             <View style={styles.cardparent}>
                <View style={styles.InnerCardStyle}> 
                            <View style={styles.profilePreview}>
                                              <Image source={item.avatarSource}
                                                style={{  borderRadius:50,
                                                  width:80,
                                                  height:80}}
                                                />
                            </View>
                            <View style={styles.InnerTextStyle}>
                                 <Text style={{padding:10, fontSize:30,fontWeight:'bold'}}> {item.Name}</Text>
                                 <Text style={{padding:10, fontSize:15, fontWeight:'bold'}} > {item.Event}</Text>
                            </View>
                  </View>          
             </View>
            </TouchableOpacity>
            </View>
          )
        }}/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    cardparent:{
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "black",
        width:330,
        height:100,
        marginTop:30,
        paddingBottom:20,
      

    },
    profilePreview:{
      borderWidth:0.2,
     borderRadius:50,
      width:80,
      height:80,
    
  } ,
  InnerCardStyle:{
    flex:1,
    flexDirection:'row',

    justifyContent:'space-between',
    alignItems:'center',
    
  },
  InnerTextStyle:{
    flex:1,
    flexDirection:'column',
    padding:10
  }
})

export default ParticipantsList;
