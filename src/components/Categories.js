import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { categoryData } from '../constants/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import  Animated,{FadeInDown} from 'react-native-reanimated';
import { CachedImage } from '../helpers/image';

export default function Categories({categories,activeCategory,handleChangeCategory}) {
    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4" contentContainerStyle={{ paddingHorizontal: 15 }}>
                {
                    categories.map((cat, index) => {
                        const isActive=cat.strCategory===activeCategory;
                        const activeButtonStyle=isActive? { backgroundColor: '#F59E0B' } : { backgroundColor: 'rgba(0, 0, 0, 0.1)' };
                        return (
                        <TouchableOpacity key={index} onPress={()=>handleChangeCategory(cat.strCategory)} style={{ marginRight: wp(4) }}>
                            <View style={[styles.categoryButton, activeButtonStyle]} >
                                {/* <Image source={{ uri: cat.strCategoryThumb }} style={{ width: hp(6), height: hp(6) }} className="rounded-full"/> */}
                                <CachedImage  uri={ cat.strCategoryThumb } style={styles.categoryImage}/>
                            </View>
                            <Text  style={styles.categoryText} >
                                {cat.strCategory}
                            </Text>
                        </TouchableOpacity>)


                    })
                }
            </ScrollView>
        </Animated.View>
    )
}


const styles = {
    categoryButton: {
        borderRadius: hp(3),
        padding: hp(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryImage: {
        width: hp(6),
        height: hp(6),
        borderRadius: hp(3),
    },
    categoryText: {
        fontSize: hp(2),
        color: '#333',
        marginTop: hp(1),
        textAlign: 'center',
    },
};