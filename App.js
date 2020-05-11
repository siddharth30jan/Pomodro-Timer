import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet ,Button,TextInput} from 'react-native';


export default class App extends React.Component{
  constructor(){
    super()
    this.state={
        curMin: '0',
        curSec: '0',
        bmin: '',
        bsec: '',
        wmin: '',
        wsec: '',
        isRun: false,
        isWork: false,
        x: 0
    }
  }

  run=()=>{
    //alert('clicked!')
    if(this.state.curMin==0&&this.state.curSec==0){
      //Break time
     
    }
     
    this.setState(prevState=>{
      return{
        ...prevState,
        isRun: true
      }
    })
 let X=setInterval(()=>{
        this.setState(prevState=>{
          if(prevState.curMin==0&&prevState.curSec==1){
            if(this.state.isWork){
        this.setState(prevState=>{
        return{
          ...prevState,
          curMin: prevState.bmin,
          curSec: prevState.bsec,
          isWork: false
        }
      })
    }else{
          this.setState(prevState=>{
        return{
          ...prevState,
          curMin: prevState.wmin,
          curSec: prevState.wsec,
          isWork: true
        }
      })
    }
          }
          else if(prevState.curSec==0){
            return{
              ...prevState,
              curMin: prevState.curMin-1,
              curSec: 59
            }
          }
          return {
            ...prevState,
            curSec: prevState.curSec-1
          }
        })
    },1000)

    this.setState(prevState=>{
      return{
        ...prevState,
        x: X
      }
    })
  }

  stop=()=>{
    clearInterval(this.state.x)
    this.setState(prevState=>{
      return{
        ...prevState,
        isRun: false
      }
    })
  }

  reset=()=>{
   this.stop()
    this.setState(prevState=>{
      return{
        ...prevState,
        curMin: prevState.wmin,
        curSec: prevState.wsec
      }
    })
  }

  
render(){
  let {curMin,curSec,wmin,wsec,bmin,bsec,isRun,isWork}=this.state
  return(
   <View style={{alignItems: 'center',justifyContent: 'center',flex: 1}}>
    {isWork?(<Text>WORK TIMER</Text>):(<Text>BREAK TIMER</Text>)}
    <View style={{fontSize: 48}}>
    {curMin}::{curSec<=9?`0${curSec}`:curSec}
    </View>
    <View style={{flexDirection: 'row'}}>
    {isRun?( <Button title="PAUSE" onPress={this.stop}/>):(<Button title="START" onPress={this.run}/> )}
 
  <Button title="RESET" onPress={this.reset} />
  </View>
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
<Text>Work Time:  </Text>
 <Text>Mins: </Text> <TextInput keyboardType='numeric' value={wmin} style={{width: 40,margin: 20}} onChangeText={text=>{
  if(text){
    this.setState(prevState=>{
      return {
        ...prevState,
        wmin: text,
        curMin: text,
        isWork: true
      }
    })
  }else{
    this.setState(prevState=>{
      return {
        ...prevState,
        wmin: '0',
        curMin: '0'
      }
    })
  }
 }}/>
  <Text>Secs: </Text><TextInput keyboardType='numeric' value={wsec} style={{width: 40,margin: 20}} onChangeText={text=>{
   if(text){
    this.setState(prevState=>{
      return {
        ...prevState,
        wsec: text,
        curSec: text,
        isWork: true
      }
    })
  }else{
    this.setState(prevState=>{
      return {
        ...prevState,
        wsec: '0',
        curSec: '0'
      }
    })
  }
   
 }}/>
</View>
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
<Text>Break Time:  </Text>
 <Text>Mins: </Text> <TextInput keyboardType='numeric' value={bmin} style={{width: 40,margin: 20}} onChangeText={text=>{
    if(text){
    this.setState(prevState=>{
      return {
        ...prevState,
        bmin: text
      }
    })
  }
 }}/>
  <Text>Secs: </Text><TextInput keyboardType='numeric' value={bsec} style={{width: 40,margin: 20}} onChangeText={text=>{
      if(text){
    this.setState(prevState=>{
      return {
        ...prevState,
        bsec: text
      }
    })
  }
  }}/>
</View>
 
    </View>
  )
}
}

