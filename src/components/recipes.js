import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import  Animated,{FadeInDown} from 'react-native-reanimated';
import Loading from './loading';
import {useNavigation} from '@react-navigation/native'
import { CachedImage } from '../helpers/image';


export default function Recipes({categories,meals}) {
    const navigation=useNavigation();
    return (
        <View style={{ flex: 1, marginHorizontal: wp(2), marginTop: hp(2) }}>
            <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: '#333',marginLeft:20,marginBottom:15 }} >Recipes</Text>
            <View>
                {
                  categories.length==0 || meals.length==0? (<Loading size="large" className="mt-20" />):(
                    <MasonryList
                    data={meals}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item,i }) => <RecipeCard item={item} index={i} navigation={navigation}/>}
                    // refreshing={isLoadingNext}
                    // onRefresh={() => refetch({ first: ITEM_CNT })}
                    onEndReachedThreshold={0.1}
                    // onEndReached={() => loadNext(ITEM_CNT)}
                />

                  )  
                }
              
            </View>
        </View>
    )
}

const RecipeCard=({item,index,navigation})=>{
    let isEven=index%2==0;
    return(
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}  style={{ width: '100%', paddingLeft: isEven ? 0 : wp(2), paddingRight: isEven ? wp(2) : 0 }}>
            <Pressable style={{width: '100%',paddingLeft:isEven? 0:8,paddingRight: isEven? 8:0}} 
            className="flex justify-center mb-4 space-y-1"
            onPress={()=>navigation.navigate('RecipeDetail',{...item})}>
                {/* <Image source={{uri:item.strMealThumb}} style={
                    {height:index%3==0? hp(25):hp(35),width:'100%',borderRadius: 35}} className="bg-black/5"/> */}
                <CachedImage 
                uri={item.strMealThumb} 
                sharedTransitionTag={item.strMeal}
                 style={{
                    height: index % 3 === 0 ? hp(25) : hp(35),
                    width: '100%',
                    borderRadius: hp(2),
                    marginBottom: hp(1),
                }} 
                resizeMode="cover"

                />


                    <Text   style={{
                        fontSize: hp(2),
                        fontWeight: 'bold',
                        color: '#333',
                        textAlign: 'center',
                        paddingBottom: wp(2),
                        paddingTop: wp(0.5)
                    }} >
                        {item.strMeal.length>20? item.strMeal.slice(0,20)+'...':item.strMeal}
                    </Text>
            </Pressable>
        </Animated.View>
    )
}

