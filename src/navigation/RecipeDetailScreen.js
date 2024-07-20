import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native';
import { CachedImage } from '../helpers/image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/loading';
import { UsersIcon } from 'react-native-heroicons/solid';
import { FireIcon } from 'react-native-heroicons/solid';
import { Square3Stack3DIcon } from 'react-native-heroicons/outline';
import YoutubeIframe from 'react-native-youtube-iframe';

// import  WebView  from 'react-native-webview';

export default function RecipeDetailScreen(props) {
  // console.log(props.route.params);
  let item = props.route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMealData(item.idMeal);
  }, [])

  const getMealData = async (id) => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      console.log('got meal data', response.data);
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    }
    catch (err) {
      console.log('error: ', err.message);
    }
  }


  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal['strIngredient' + i]) {
        indexes.push(i);
      }

    }
    console.log('Ingredient Indexes:', indexes);
    return indexes;
  };

  const getYoutubeVideoId=(url)=>{
    const regex=/[?&]v=([^&]+)/;
    const match= url.match(regex);
    if(match && match[1]){
      return match[1];
    }
    return null;
  }



  return (    
  <ScrollView className="bg-white flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
      <StatusBar style={"light"} />


      {/*recipe image  */}
      <View style={{ position: 'relative', width: '100%', height: hp(60) }}>
        <CachedImage resizeMode='cover' uri={item.strMealThumb}  sharedTransitionTag={item.strMeal} style={{ width: wp(100), height: hp(60), borderBottomLeftRadius: 40, borderBottomRightRadius: 30, marginTop: 0.1 }} />
      </View>


      {/* back-btn */}
      <View style={{ position: 'absolute', top: 50, left: 0, flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 1, backgroundColor: "white", borderRadius: 45, padding: 5 }} >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} style={{ zIndex: 1, backgroundColor: "white", borderRadius: 45, padding: 5 }} >
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? "red" : "gray"} />
        </TouchableOpacity>
      </View>
     
     {/* meal desciption */}
     {
      loading? (
      <Loading size='large' style={{marginTop:16}}/>):
        (
        <View style={{justifyContent:"space-between",paddingBottom:30}}>
          
          {/* name and area */}
          <View style={{margin:15}}>
            <Text style={{fontSize: hp(3),fontWeight:"bold",color:"#333"}} >
              {meal?.strMeal}
            </Text>
            <Text style={{fontSize: hp(2),color:"#666"}} >
              {meal?.strArea}
            </Text>
          </View>
          
          {/* misc */}
          <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
            

            <View style={{ padding: 8, borderRadius: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FCD34D" }} >
                    <View style={{ height: hp(6.5), width: hp(6.5), backgroundColor: '#FFFFFF', borderRadius: hp(6.5) / 2, justifyContent: 'center', alignItems: 'center' }} >
                      <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />

                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                        35
                      </Text>
                      <Text style={{ fontSize: hp(1.2) }} className="font-bold text-neutral-700">
                        Mins
                      </Text>

                    </View>
            </View>

            <View style={{ padding: 8, borderRadius: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FCD34D" }} >
                    <View style={{ height: hp(6.5), width: hp(6.5), backgroundColor: '#FFFFFF', borderRadius: hp(6.5) / 2, justifyContent: 'center', alignItems: 'center' }} >
                      <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />

                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                        03
                      </Text>
                      <Text style={{ fontSize: hp(1.2) }} className="font-bold text-neutral-700">
                        Servings
                      </Text>

                    </View>
            </View>

            <View style={{ padding: 8, borderRadius: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FCD34D" }} >
                    <View style={{ height: hp(6.5), width: hp(6.5), backgroundColor: '#FFFFFF', borderRadius: hp(6.5) / 2, justifyContent: 'center', alignItems: 'center' }} >
                      <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />

                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                        103
                      </Text>
                      <Text style={{ fontSize: hp(1.2) }} className="font-bold text-neutral-700">
                        Calories
                      </Text>

                    </View>
            </View>

            <View style={{ padding: 8, borderRadius: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FCD34D" }} >
                    <View style={{ height: hp(6.5), width: hp(6.5), backgroundColor: '#FFFFFF', borderRadius: hp(6.5) / 2, justifyContent: 'center', alignItems: 'center' }} >
                      <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />

                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                        
                      </Text>
                      <Text style={{ fontSize: hp(1.2) }} className="font-bold text-neutral-700">
                        Easy
                      </Text>

                    </View>
            </View>

          </View>


            {/* indgredient */}
            <View style={{margin: 20}}>
              <Text style={{fontSize:hp(3), fontWeight: 'bold', color: '#333' }} >
                Ingredients
              </Text>
              <View style={{marginTop:5}}>
                {
                  ingredientsIndexes(meal).map(i=>{
                    return(
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center' ,marginBottom: 5}}>
                        <View style={{height:hp(1.5),width:hp(1.5), backgroundColor: '#FCD34D', borderRadius: 5 }} />
                       <Text style={{fontSize: hp(1.7),marginLeft:10, fontWeight: 'bold', color: '#333'}}>
                        {meal['strMeasure' + i]}
                       </Text>

                       <Text style={{fontSize: hp(1.7),marginLeft:10,fontWeight:"medium",color:"#666"}}>
                        {meal['strIngredient' + i]}
                       

                       </Text>



                      </View>
                    )
                  })
                }

              </View>
            </View>

           {/* instructions */}
            <View style={{margin: 20}}>
              <Text style={{fontSize:hp(3), fontWeight: 'bold', color: '#333' }} >
                Instructions
              </Text>
              <Text style={{fontSize:hp(2),marginTop:10}} className="text-neutral-700">
                {
                  meal?.strInstructions
                }
              </Text>
            </View>

            {/* recipe video */}
            {
              meal.strYoutube && (
                <View className="space-y-4">
                  <Text style={{fontSize: hp(2.5),fontWeight:"bold",flex:1,color:'#4B5563', margin:12}} >Recipe Video</Text>
                  {/* <View style={{ marginHorizontal: 12, marginBottom: 12 }}>
                     <YoutubeIframe 
                    videoId={getYoutubeVideoId(meal.strYoutube)} 
                    height={hp(40)} 
                    />
                  </View> */}
                </View>

              )
            }


          


        </View>)
     }
     

              















    </ScrollView> 

  )

}
