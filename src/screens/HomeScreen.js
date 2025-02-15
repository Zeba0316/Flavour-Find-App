import { View, Text,ScrollView,Image ,Pressable,StyleSheet,} from 'react-native'
import React, { useEffect, useState } from 'react'
import {  StatusBar } from 'react-native-web'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {BellIcon} from 'react-native-heroicons/outline'
import Categories from '../components/Categories';
import  axios from 'axios';
import Recipes from '../components/recipes';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';



export default function HomeScreen() {

  const[activeCategory,setActiveCategory]=useState('beef');
  const [categories,setCategories]=useState([])
const [meals,setMeals]=useState([]);
const navigation =useNavigation();

  useEffect(()=>{
    getCategories();
    getRecipes();
  },[])

  const handleChangeCategory=category=>{
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);

  }

  const getCategories=async()=>{
    try{
      const response=await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
      // console.log('got categories:',response.data);
      if(response && response.data){
        setCategories(response.data.categories)
      }
    }
    catch(err){
      console.log('error: ',err.message);
    }
  }
  const getRecipes=async(category="Beef")=>{
    try{
      const response=await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      // console.log('got recipes:',response.data);
      if(response && response.data){
        setMeals(response.data.meals);
      }
    }
    catch(err){
      console.log('error: ',err.message);
    }
  }

  
  return (
    <View className="flex-1 " style={{backgroundColor:"#fff1e6"}}>
      <StatusBar style="light"/>
      <ScrollView showsVerticalIndicator={false}
      contentContainerStyle={{paddingBottom: 50}}
      className="space-y-6 pt-14">
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between item-center mb-2">
          <Image source={require('../../assets/images/fflogo1.png')} style={{height:hp(7),width:hp(7),marginTop:-3}}/>
          <View className="flex-row justify-between ">
          <Pressable onPress={()=>{navigation.navigate("Special")}} className="pr-5" style={styles.button} >
          <Ionicons name="sparkles-sharp" size={24} color="white" style={{ marginRight: 3 }}/>
            <Text className="text-neutral-600" style={{...styles.buttonText,marginRight:10}}>Dish Genie</Text> 
          </Pressable>
          <BellIcon size={hp(4)} color="gray"/>
          </View>
        </View>

        {/* greetings and punchline */}
        <View className="mx-4 space-y-2 mb-2 ">
          <Text style={{fontSize:hp(1.7)}} className="text-neutral-600">
            Hello, Foodies!
          </Text>
          <View>
            <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-600 ">Make your own Food</Text>
          </View>
          <Text style={{fontSize:hp(3.8)}}  className="font-semibold text-neutral-600 ">
            Stay at <Text className="text-amber-400">Home</Text>
          </Text>
        </View>

{/* box */}
<View style={{ alignSelf: "center",borderRadius: 10, marginTop: 5, }}>
<Image source={require('../../assets/images/food.jpg')} style={{ width: wp(90), height: hp(30),borderRadius: 10}}/>

</View>
{/* <View style={{ alignSelf: "center", borderRadius: 10 }}>
  <Image 
    source={require('../../assets/images/food.jpg')} 
    style={{ flex: 1,width: wp(80), height:hp(25), borderRadius: 10 }}
    resizeMode="contain"
  />
</View> */}







        {/* search bar
        <View className="mx-4 flex-row item-center rounded-full bg-black/5 p-[6px]">
          <TextInput placeholder="Search any recipes" placeholderTextColor={'gray'} style={{fontSize:hp(1.7)}} className="flex-1 text-base mb-1 pl-3 tracking-wider"/>
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray"/>
          </View>
        </View> */}


        {/* categories  */}
        <View>
          {categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/> } 
        </View>

        {/* recipes  */}

        <View>
          < Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>

    
  )
}



const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: 'orange',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});