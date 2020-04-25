import React , {Component} from 'react';
import {Text, View, StyleSheet, Button, TextInput,ScrollView, TouchableOpacity,Image, ImageBackground}  from 'react-native';
import {Dropdown} from 'react-native-material-dropdown'
import firebase from '../fb'
import ImagePicker from 'react-native-image-picker';

const options={
  title: 'Choose Picture',
  takePhotoButtonTitle: 'Use Camera',
  chooseFromLibraryButtonTitle: 'Choose From Gallery', 
}

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            USN:'',
            Name:'',
            Event:'',
            Phone:'',
            College:'',
            City:'',
            avatarSource: null,
          
        }
    }
    
    Register=(USN, Name, Event,Phone,College,City,avatarSource)=>{
        firebase.database().ref().push({USN, Name, Event,Phone,College,City, avatarSource}); 
        this.setState({
          USN:'',
          Name:'',
          Event:'',
          Phone:'',
          College:'',
          City:'',
          avatarSource: null,
          
        })
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


    render(){
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
             
              <ScrollView  > 
              <View style={styles.container}>
                  <View style={styles.preview}>  
                      <Text style={{fontSize:20, fontWeight:"bold", padding:20, borderBottomColor: "black",
                                  borderBottomWidth: StyleSheet.hairlineWidth}}> Register Here ! </Text>
                      <View style={styles.profilePreview}>
                              <Image source={this.state.avatarSource}
                                style={{  borderRadius:50,
                                  width:100,
                                  height:100}}
                                value={this.state.avatarSource}/>
                      </View>
                      
                  </View>
                <TextInput style={styles.input} 
                placeholder= "Your Name Here" 
                placeholderTextColor='#8A8F9E'  
                keyboardType='email-address'  
                autoCorrect={false}      
                onChangeText={Name => this.setState({Name})}
                value={this.state.Name}
              />
                <TextInput style={styles.input} 
                placeholder= "University Seat Number" 
                placeholderTextColor='#8A8F9E'  
                keyboardType='email-address'  
                autoCorrect={false}      
                onChangeText={USN => this.setState({USN})}
                value={this.state.USN}
              />
                <TextInput style={styles.input} 
                placeholder= "Contact Number" 
                placeholderTextColor='#8A8F9E'  
                keyboardType='email-address'  
                autoCorrect={false}      
                onChangeText={Phone => this.setState({Phone})}
                value={this.state.Phone}
              />
               <TextInput style={styles.input} 
                placeholder= "College Name" 
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
              <View style={{ margin:20, width:320,paddingHorizontal:50,flex:1,marginHorizontal:-1 }} > 
              <Dropdown
                label='Events'
                data={Events}  
                onChangeText={Event => this.setState({Event})}
                value={this.state.Event}
                style={{color:"black"}}
              />
              </View>

              <TouchableOpacity onPress={this.selectImage} >
              <Image
              source={require('./Images/camera.png')}
              style={{width:30, height:30,opacity:0.2 ,alignContent:'center', justifyContent: "center", margin:10,backgroundColor:"white"}}/>
            </TouchableOpacity>
            
              <View style={{height:100,marginTop:60}}> 
              <Button  title="Submit" onPress={()=> this.Register(this.state.USN,this.state.Name,this.state.Event,this.state.Phone,this.state.College,this.state.City,this.state.avatarSource)} />
              </View>
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
        
    },
    input: {

        height: 50,
        alignItems:'center',
       // paddingHorizontal: 10,
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        fontSize: 15,
        color: "#161F3D",
        justifyContent:'center',
        
        marginTop:10,
    
    }, 
    preview:{
      flex:1,
      flexDirection:'row',
      
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
    