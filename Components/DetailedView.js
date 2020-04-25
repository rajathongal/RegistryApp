import React , {Component} from 'react';
import {Text, View, StyleSheet, Button, TextInput, ScrollView,Image,TouchableOpacity}  from 'react-native';
import {Dropdown} from 'react-native-material-dropdown'
import firebase from '../fb'
import ImagePicker from 'react-native-image-picker'

const options={
  title: 'Choose Picture',
  takePhotoButtonTitle: 'Use Camera',
  chooseFromLibraryButtonTitle: 'Choose From Gallery'
}


export default class Detail extends  Component {
    constructor(props){
        super(props);
        this.state={
            USN: this.props.navigation.state.params.USN,
            Name: this.props.navigation.state.params.Name,
            Event: this.props.navigation.state.params.Event,
            key: this.props.navigation.state.params.key,
            Phone: this.props.navigation.state.params.Phone,
            College: this.props.navigation.state.params.College,
            City: this.props.navigation.state.params.City,
            avatarSource: this.props.navigation.state.params.avatarSource
        }
    }

    
    update=(USN, Name, Event, key,Phone,College,City,avatarSource)=>{
            firebase.database().ref().child(key).update({USN, Name, Event,Phone,College,City,avatarSource})
            this.props.navigation.goBack()
    }

    delete(key){
        
            firebase.database().ref(`${key}`).remove()
            this.props.navigation.goBack()
    }

    selectImage=()=>{
      ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
        
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePic ker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let source={uri: response.uri}
            this.setState({
              avatarSource: source,
            });
          }
     });
  }


    render() {
        let Events = [{
            value: 'One',
          }, {
            value: 'Two',
          }, {
            value: 'Three',
          }];
        console.log(this.state.Event)
        return(
          <>
          <ScrollView> 
            <View style={styles.container}>
              <View style={styles.preview}>  
                      <Text style={{fontSize:20, fontWeight:"bold", padding:20, borderBottomColor: "black",marginBottom:20,
                                  borderBottomWidth: StyleSheet.hairlineWidth}}>Scroll Down! To Edit your Details  </Text>
                      <View style={styles.profilePreview}>
                              <Image source={this.state.avatarSource}
                                style={{  borderRadius:50,
                                  width:100,
                                  height:100,
                                }}
                                value={this.state.avatarSource}/>
                      </View>
                      
                  </View>
                <TextInput style={styles.input} 
                placeholder= "University Seat Number" 
                placeholderTextColor='#8A8F9E'  
                keyboardType='email-address'  
                autoCorrect={false}      
                onChangeText={USN => this.setState({USN})}
                value={this.state.USN}
              />
                <TextInput style={styles.input} 
                placeholder= "Your Name Here" 
                placeholderTextColor='#8A8F9E'  
                keyboardType='email-address'  
                autoCorrect={false}      
                onChangeText={Name => this.setState({Name})}
                value={this.state.Name}
              />
               <TextInput style={styles.input} 
                placeholder= "Phone" 
                placeholderTextColor='#8A8F9E'  
                keyboardType='email-address'  
                autoCorrect={false}      
                onChangeText={Phone => this.setState({Phone})}
                value={this.state.Phone}
              />
               <TextInput style={styles.input} 
                placeholder= "Your College" 
                placeholderTextColor='#8A8F9E'  
                keyboardType='email-address'  
                autoCorrect={false}      
                onChangeText={College => this.setState({College})}
                value={this.state.College}
              />
               <TextInput style={styles.input} 
                placeholder= "Your City" 
                placeholderTextColor='#8A8F9E'  
                keyboardType='email-address'  
                autoCorrect={false}      
                onChangeText={City => this.setState({City})}
                value={this.state.City}
              />

          
              <Dropdown style={{margin:10}}
                label='Events'
                data={Events}  
                onChangeText={Event => this.setState({Event})}
                value={this.state.Event}


              />

            <TouchableOpacity onPress={this.selectImage} >
              <Image
              source={require('./Images/camera.png')}
              style={{width:30, height:30,opacity:0.2 ,alignContent:'center', justifyContent: "center", margin:10,backgroundColor:"white"}}/>
            </TouchableOpacity>

            <Button  title="Submit" onPress={()=> this.update(this.state.USN,this.state.Name,this.state.Event, this.state.key,this.state.City,this.state.Phone,this.state.College,this.state.avatarSource)}/>
            <Button  title="Delete" onPress={()=> this.delete(this.state.key)}/>
            </View>

            </ScrollView>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      top:50,
      paddingHorizontal:20,
      marginBottom:130
    },
    input: {
        height: 50,
        margin: 20,
        paddingHorizontal: -10,
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        fontSize: 15,
        color: "#161F3D",
    },   
    btn: {
      marginTop:0,
      flex:1,
      paddingHorizontal:20,
      paddingBottom:20
    } ,
    text:{
      margin:10,
      padding:10,
      fontSize:15,
      fontWeight:'bold'
    },
    preview:{
      flex:1,
      flexDirection:'column',
      
      justifyContent:'space-between',
      alignItems:'center',

    },
    profilePreview:{
        borderWidth:0.2,
       borderRadius:50,
        width:100,
        height:100,
      
    } 
})

