import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, SafeAreaView } from 'react-native';
import { fonts, windowWidth, colors } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';


export default function ({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    email: null,
    password: null
  });
  const [loading, setLoading] = useState(false);



  const masuk = () => {

    navigation.replace('Home')

  }

  useEffect(() => {
  }, [])

  return (

    <SafeAreaView style={{
      flex: 1,
      padding: 10,
      backgroundColor: colors.white
    }}>

      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>


        <Image
          source={require('../../assets/logo.png')}
          style={
            {
              width: windowWidth - 50,
              height: 120,
              resizeMode: 'contain'
            }
          }
        />


        <Text style={{
          textAlign: 'center',
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 20,
          marginBottom: 50,
        }}>By : Diki Hermawan</Text>
      </View>


      <View style={{ padding: 10, flex: 1, }}>

        <MyButton
          onPress={masuk}
          title="START INSPECTION"
          warna={colors.primary}
          Icons="shield-checkmark-outline"
        />

      </View>
      <Text style={{
        textAlign: 'center',
        fontFamily: fonts.secondary[400],
        fontSize: windowWidth / 30,
        color: colors.primary,
      }}>copyrights 2023 © version 1</Text>
    </SafeAreaView >



  );
}

const styles = StyleSheet.create({});
