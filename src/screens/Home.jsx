import { View, Text, StyleSheet, ScrollView, StatusBar, Image, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import React from 'react'
import { MEAL_FILTERS } from '../data/categories';
import { useNavigation } from '@react-navigation/native';

const Home = () => {

    const navigation = useNavigation();

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#e8f5e9' }}>
            <StatusBar barStyle={'default'} />
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <ImageBackground style={styles.bgImage} source={require('../assets/food-bg.jpeg')} />
                    <View style={styles.gradientBlock}>
                        <Text style={styles.headingTxt}>Recipe App</Text>
                        <TouchableOpacity activeOpacity={0.7} style={styles.searchBox}
                        onPress={()=>{navigation.navigate('Search')}}
                        >
                            <Image source={require("../assets/search.png")} style={styles.icon} />
                            <Text style={styles.placeholderTxt}>Search recipes...</Text>
                        </TouchableOpacity>
                        <Text style={styles.note}>Search yummy recipes with Recipe App</Text>
                    </View>

                </View>

                <Text style={[
                    styles.headingTxt,
                    {
                        color: 'black',
                        textAlign: "left",
                        marginLeft: 10,
                        fontSize: 18,
                        padding: 0
                    }]
                }>Category</Text>
                <View style={styles.categoryContainer}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={MEAL_FILTERS}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={styles.categoryList}
                                activeOpacity={0.7}>
                                <Image style={styles.categoryListImage} source={{ uri: item.image }} />
                                <Text style={styles.categoryListTxt}>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <Text style={[
                    styles.headingTxt,
                    {
                        color: 'black',
                        textAlign: "left",
                        marginLeft: 10,
                        fontSize: 18,
                        padding: 0,

                    }]
                }>Trendings 🔥</Text>
                <View style={styles.categoryContainer}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={MEAL_FILTERS}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={styles.trendingList}
                                activeOpacity={0.7}
                            >
                                <Image style={styles.trendingListImage} source={{ uri: item.image }} />
                                <View style={styles.gradientBlock}>
                                    <Text style={styles.trendingListTxt}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {

    },
    topContainer: {
        height: 300,
        width: '100%',
        borderWidth: 1,
        borderColor: 'green',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        overflow: 'hidden',
    },
    bgImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    gradientBlock: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        top: 0,
        right: 0,
        height: '100%',
        width: '100%'
    },
    headingTxt: {
        color: 'white',
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        padding: 10
    },
    searchBox: {
        width: '90%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 70,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: 'black',
        marginHorizontal: 20
    },
    placeholderTxt: {
        fontSize: 16,
        color: 'gray'
    },
    note: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        marginTop: 10
    },
    categoryContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    categoryList: {
        backgroundColor: 'white',
        height: 150,
        width: 120,
        overflow: 'hidden',
        borderRadius: 6,
        shadowColor: '#2e7d32',
        shadowOffset: 4,
        shadowOpacity: '0.8',
        marginRight: 10
    },
    categoryListImage: {
        height: 120,
        width: '100%',
        objectFit: 'cover',
        // borderRadius: 6
    },
    categoryListTxt: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 3
    },
    trendingList: {
        backgroundColor: 'white',
        height: 200,
        width: 160,
        overflow: 'hidden',
        borderRadius: 6,
        shadowColor: '#2e7d32',
        shadowOffset: 4,
        shadowOpacity: '0.8',
        marginRight: 10
    },
    trendingListImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',

    },
    trendingListTxt: {
        position: 'absolute',
        bottom: 10,
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        marginLeft: 6,
        overflow: 'scroll'
    }

});