import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native-web'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import {useNavigation,useIsFocused} from '@react-navigation/native';
// import RenderItem from '../components/RenderItem';

export default function WelcomeScreen() {
  const ring1padding=useSharedValue(0);
  const ring2padding=useSharedValue(0);
  const isFocussed=useIsFocused();
  const navigation=useNavigation();

  useEffect(()=>{
    if(isFocussed){
    ring1padding.value=0;
    ring2padding.value=0;
    setTimeout(()=>ring1padding.value=withSpring(ring1padding.value+hp(5)),100);
    setTimeout(()=>ring2padding.value=withSpring(ring2padding.value+hp(5.5)),300);
      setTimeout(()=>navigation.navigate('Home'),2500);
    }
  },[isFocussed])
  return (
     <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />
       <StatusBar barStyle="light-content" />  

      {/* //  logo image with rings */}
       <Animated.View className="bg-white/20 rounded-full " style={{padding:ring2padding}}>
        <Animated.View className="bg-white/20 rounded-full" style={{padding:ring1padding}}>
          <Image source={require('../../assets/images/welcome1.png')} style={{ width: hp(20), height: hp(20) }} />
        </Animated.View>
      </Animated.View> 

      {/* // <View style={{flex:1,}}> */}
      {/* //   <Animated.FlatList data={data} renderItem={({item,index})=>{ */}
      {/* //     return <RenderItem/>
      //   }} keyExtractor={item=>item.id} scrollEventThrottle={16}/>
      // </View> */}

      {/* title and punch line */}
      <View className="flex items-center space-y-2">
        <Text style={{fontSize:hp(7)}} className="font-bold text-white tracking-widest ">Flavour Find</Text>
        <Text style={{fontSize:hp(2)}} className="font-medium text-white tracking-widest ">Taste the World,Flavour Find</Text>
      </View>
    </View>
  )
}