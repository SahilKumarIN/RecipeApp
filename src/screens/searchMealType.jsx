import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  Dimensions,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const SearchMealType = () => {
  const routes = useRoute();
  const mealType = routes.params;

  const navigation = useNavigation();
  const [searchTxt, setSearchTxt] = useState(routes.params);
  const [result, setResult] = useState([]);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [cuisineType, setCuisineType] = useState('indian');

  const searchRecipe = async () => {
    setLoader(true);

    const resp = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=food&mealType=${mealType}&cuisineType=${cuisineType}&app_id=26542a0a&app_key=838f7da80f0a88c3c9c78bd27cc54267`,
      {
        method: 'GET',
      },
    );
    // Here API will be called
    const respData = await resp.json();
    setResult(respData.hits);
    setLoader(false);
  };

  useEffect(() => {
    searchRecipe();
  }, [cuisineType]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <Image style={styles.backIcon} source={require('../assets/back.png')} />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Image style={styles.icon} source={require('../assets/search.png')} />
          <Text style={styles.searchInput}>{searchTxt}</Text>
          {/* {
            searchTxt !== '' ?
              <Pressable onPress={() => {
                setSearchTxt('')
                setResult([])
              }}>
                <Image style={styles.icon} source={require('../assets/close.png')} />
              </Pressable> : ""
          } */}
        </View>
        {/* <TouchableOpacity style={styles.searchBtn}
          onPress={() => searchRecipe()}
        >
          <Text style={styles.searchBtnTxt}>Search</Text>
        </TouchableOpacity> */}
      </View>
      {loader ? (
        <ActivityIndicator
          style={{height: Dimensions.get('window').height / 2}}
          size={'large'}
          color={'#1b5e20'}
        />
      ) : searchTxt !== '' ? (
        <View style={styles.flatListContainer}>
          <FlatList
            style={{
              height: Dimensions.get('window').height - 200,
              marginTop: 10,
            }}
            showsVerticalScrollIndicator={false}
            data={result}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('RecipeScreen', (data = {item}));
                  }}>
                  <View style={styles.listItem}>
                    <Image
                      style={styles.listItemImg}
                      source={{uri: item.recipe.image}}
                    />
                    <View>
                      <Text style={styles.listItemTitle}>
                        {item.recipe.label}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <Text
          style={[
            styles.searchBtnTxt,
            {
              textTransform: 'none',
              textAlign: 'center',
              width: '80%',
              alignSelf: 'center',
              marginTop: Dimensions.get('window').width / 2,
            },
          ]}>
          Search some yummy dishes with Recipe App
        </Text>
      )}
      {!modal && (
        <Pressable
          style={styles.categoryContainer}
          onPress={() => {
            setModal(!modal);
          }}>
          <Image
            style={[styles.icon, {tintColor: '#4caf50'}]}
            source={require('../assets/filter.png')}
          />
        </Pressable>
      )}
      <Modal
        animationType="slide"
        visible={modal}
        transparent={true}
        style={styles.modalContainer}>
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.6)']}
          style={styles.modalGradient}>
          {modal && (
            <Pressable
              style={styles.categoryContainer}
              onPress={() => {
                setModal(!modal);
              }}>
              <Image
                style={[styles.icon, {tintColor: '#4caf50'}]}
                source={require('../assets/close.png')}
              />
            </Pressable>
          )}

          <View style={styles.menuContainer}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '600',
                color: 'white',
                marginBottom: 20,
              }}>
              {'Filters'}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: 'white',
                marginTop: 10,
              }}>
              {'Cuisines'}
            </Text>
            <View style={styles.menu}>
              <Pressable
                onPress={() => {
                  setCuisineType('indian');
                }}>
                <Text
                  style={[
                    styles.menuItem,
                    cuisineType == 'indian' && styles.selectedMenu,
                  ]}>
                  Indian
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setCuisineType('american');
                }}>
                <Text
                  style={[
                    styles.menuItem,
                    cuisineType == 'american' && styles.selectedMenu,
                  ]}>
                  American
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setCuisineType('chinese');
                }}>
                <Text
                  style={[
                    styles.menuItem,
                    cuisineType == 'chinese' && styles.selectedMenu,
                  ]}>
                  Chinese
                </Text>
              </Pressable>
            </View>
            <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
              {'Meal Type'}
            </Text>
            <View style={styles.menu}>
              <Text
                numberOfLines={2}
                style={[
                  styles.menuItem,
                  mealType == 'breakfast' ? styles.selectedMenu : '',
                ]}>
                Breakfast
              </Text>
              <Text
                numberOfLines={2}
                style={[
                  styles.menuItem,
                  mealType == 'brunch' ? styles.selectedMenu : '',
                ]}>
                Brunch
              </Text>
              <Text
                numberOfLines={2}
                style={[
                  styles.menuItem,
                  mealType == 'lunch' ? styles.selectedMenu : '',
                ]}>
                Lunch
              </Text>
              <Text
                numberOfLines={2}
                style={[
                  styles.menuItem,
                  mealType == 'dinner' ? styles.selectedMenu : '',
                ]}>
                Dinner
              </Text>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
};

export default SearchMealType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
  },
  backBtn: {
    marginLeft: 10,
    marginTop: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  searchContainer: {},
  searchBox: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'black',
    marginHorizontal: 10,
  },
  searchInput: {
    width: '73%',
    color: 'black',
  },
  searchBtn: {
    backgroundColor: '#81c784',
    width: '30%',
    height: 50,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnTxt: {
    color: '#1b5e20',
    fontSize: 18,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  flatListContainer: {
    width: '90%',
    alignSelf: 'center',
    gap: 10,
  },
  listItem: {
    width: '100%',
    height: 80,
    borderRadius: 14,
    backgroundColor: 'white',
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  listItemImg: {
    height: '90%',
    width: 80,
    borderRadius: 10,
    marginLeft: 6,
  },
  listItemTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    width: '70%',
    paddingHorizontal: 10,
  },
  categoryContainer: {
    backgroundColor: '#fefefe',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    right: 30,
    zIndex: 9,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.7,
  },
  modalGradient: {
    flex: 1,
  },
  modalContainer: {
    width: '100%',
    height: '100%',
  },
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',

    paddingVertical: 20,
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  menu: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    marginVertical: 10,
  },
  menuItem: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    borderRadius: 8,
  },
  selectedMenu: {
    backgroundColor: '#c8e6c9',
    color: '#1b5e20',
  },
});
