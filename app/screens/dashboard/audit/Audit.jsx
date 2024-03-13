import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet, 
  Modal,
  Button
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {toast} from '../../../../utils';
import {getStorage} from '../../../../hooks/useStorage';


// components
import {ButtonBack} from '../../../../components/buttons';


const Audit = ({navigation}) => {
  // states
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [shelveData, setShelveData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const tableHeader = ['Code', 'Description', 'Qnt', 'Bin', 'Gondola'];
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getStorage('user', setUser, 'object');
    getStorage('token', setToken);
  }, []);

  // custom functions
  function makeOrganizedData(data) {
    let organizedData = {};

    data.forEach(item => {
      item.inShelf.forEach(shelfItem => {
        const key = shelfItem.gondola + shelfItem.bin + item.code;

        if (organizedData[key]) {
          organizedData[key].quantity += shelfItem.quantity;
        } else {
          organizedData[key] = {
            key: shelfItem.gondola + shelfItem.bin + item.code,
            code: item.code,
            description: item.description,
            quantity: shelfItem.quantity,
            bin: shelfItem.bin,
            gondola: shelfItem.gondola,
          };
        }
      });
    });

    return Object.values(organizedData);
  }

  const getShelveData = async () => {
      setIsLoading(true);
      const API_URL = `https://shwapnooperation.onrender.com/api/product-shelving/in-shelf?filterBy=site&value=${user?.site?.code}&pageSize=10&currentPage=1&sortBy=&sortOrder=`;
      // console.log(API_URL);
      try {
        await fetch(API_URL, {
          method: 'GET',
          headers: {
            authorization: token,
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(result => {
            if (result.status) {
              // console.log(result);
              setShelveData(makeOrganizedData(result.items));
              setIsLoading(false);
            } else {
              // toast(data.message);
              console.log(result);
              setIsLoading(false);
            }
          })
          .catch(error => {
            console.log('Fetch catch', error);
            setIsLoading(false);
          });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
  };

  useFocusEffect(
    useCallback(() => {
      if (token) {
        getShelveData();
      }
    }, [token]),
  );

  // console.log(shelveData);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredData = shelveData.filter(item =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("filter data",filteredData)

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectProduct(item)}>
      <Text className="text-black py-3 px-3  
       rounded" >{item.code} - { item.description}</Text>
    </TouchableOpacity>
  );


  const handleSearchQuery = (e) => {
    setSelectedProduct(null)
    setSearchQuery(e)
  }

  const handleSelectProduct = product => {
    setSelectedProduct(product);
    setModalVisible(true);
    setSearchQuery(product.code)
  };



  if (!shelveData || shelveData.length === 0) {
    return <Text>No data available</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-white pt-8">
      <View className="h-full px-4">
        <View className="screen-header flex flex-row items-center justify-between mb-4">
          <ButtonBack navigation={navigation} />
          <Text className="text-lg text-sh text-center font-semibold capitalize">
            Audit Screen
          </Text>
          <Text className="invisible w-2"></Text>
        </View>
        <View style={{ flex: 1 }}>

      <TextInput
        // style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
        className = "py-2 px-3 border mb-4  rounded-md text-slate-900 "
        placeholderTextColor="#333"
        placeholder="Search Product by code or name..."
        onChangeText={(e) => handleSearchQuery(e)}
        value={searchQuery}
      />

     
      {searchQuery && !selectedProduct && 
      <View className="border border-gray-600 rounded">
            <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            keyboardShouldPersistTaps="always"
          />
        </View>  }
      {searchQuery && selectedProduct && (
        <View className="p-4 shadow border-[0.5px  rounded-md text-slate-800">
          {/* <View className="flex flex-row items-center justify-center mb-4 gap-2">
            <Text className="text-black text-lg">{selectedProduct?.description}</Text>
            <Text className="text-white text-xs bg-teal-800 py-1 px-3 rounded-full">{selectedProduct?.code}</Text>
          </View> */}
          <View className="mb-3 border-b-[0.5px]">
            <Text className="text-slate-600 font-medium">Code:</Text>
            <Text className="text-slate-800 text-2xl font-bold mb-3">{selectedProduct?.code}</Text>
          </View>
          <View className="mb-3 border-b-[0.5px]">
            <Text className="text-slate-800 font-medium">Description:</Text>
            <Text className="text-slate-800 text-2xl font-bold mb-3">{selectedProduct?.description}</Text>
          </View>
          <View className="mb-3 border-b-[0.5px]">
            <Text className="text-slate-600 font-medium">Quantity:</Text>
            <Text className="text-slate-800 text-2xl font-bold mb-3">{selectedProduct?.quantity}</Text>
          </View>
          <View className="mb-3 border-b-[0.5px]">
            <Text className="text-slate-600 font-medium">Bin:</Text>
            <Text className="text-slate-800 text-2xl font-bold mb-3">{selectedProduct?.bin}</Text>
          </View>
          <View className="mb-3 border-b-[0.5px]">
            <Text className="text-slate-600 font-medium">Gondola:</Text>
            <Text className="text-slate-800 text-2xl font-bold mb-3">{selectedProduct?.gondola}</Text>
          </View>
        </View>
      )}
    </View>
       
      </View>
    </SafeAreaView>
  );
};



export default Audit;
