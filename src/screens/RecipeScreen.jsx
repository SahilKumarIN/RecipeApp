import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';

const RecipeScreen = ({navigation}) => {
  const routes = useRoute();
  const itemData = routes.params.item.recipe;
  const recipeKeys = [
    {value: 'dietLabels', title: 'Diet Labels'},
    {value: 'healthLabels', title: 'Health Labels'},
    {value: 'ingredientLines', title: 'Ingredients'},
  ];
  const [selectedLabel, setSelectedLabel] = useState(recipeKeys[0].value);
  const labelData = itemData[selectedLabel];

  return (
    <View style={{flex: 1, backgroundColor: '#e8f5e9'}}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <Image style={styles.backIcon} source={require('../assets/back.png')} />
      </TouchableOpacity>
      <View style={styles.foodImageContainer}>
        <Image
          source={{
            uri: itemData.image,
          }}
          style={styles.foodImage}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <View style={styles.itemData}>
            {/* <Text style={styles.desertType}>{itemData.dishType}</Text> */}
            <Text style={styles.itemName}>{itemData.label}</Text>
          </View>
        </View>
      </View>
      <View style={styles.recipeContainer}>
        <FlatList
          style={{margin: 10}}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recipeKeys}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedLabel(item.value);
                }}>
                <View
                  key={index}
                  style={[
                    {
                      padding: 8,
                      borderWidth: 1,
                      borderColor: 'black',
                      borderRadius: 6,
                      marginRight: 10,
                    },
                    item.value == selectedLabel
                      ? {backgroundColor: 'black'}
                      : '',
                  ]}>
                  <Text
                    style={[
                      {color: 'black', fontSize: 18, fontWeight: '500'},
                      item.value == selectedLabel ? {color: 'white'} : '',
                    ]}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <FlatList
          style={{
            height: Dimensions.get('screen').height / 2,
          }}
          showsVerticalScrollIndicator={false}
          data={labelData}
          renderItem={({item, index}) => {
            return (
              
              <View
                key={index}
                style={{
                  backgroundColor: 'white',
                  margin: 10,
                  padding: 6,
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 6,
                }}>
                  
                <Text style={{color: 'black', fontWeight: '600', fontSize: 18}}>
                  {item}
                </Text> 
          
              </View>
             
            );
          }}
        />
        
        
        
      </View>
      
    </View>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  backBtn: {
    marginLeft: 10,
    marginTop: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    // top: 10,
    // left: 20,
    zIndex: 9,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  foodImageContainer: {
    width: '100%',
    height: Dimensions.get('window').height / 3,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    overflow: 'hidden',
    shadowColor: 'gray',
    shadowOffset: 4,
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  itemData: {
    position: 'absolute',
    bottom: 20,
  },
  itemName: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    padding: 4
  },
  desertType: {
    color: '#2e7d32',
    backgroundColor: '#e8f5e9',
    width: '30%',
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontWeight: '600',
    borderRadius: 6,
    marginVertical: 10,
  },
});
