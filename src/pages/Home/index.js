import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import { SliderBox } from "react-native-image-slider-box";


export default function Home({ navigation }) {


  const isFocused = useIsFocused();
  useEffect(() => {


  }, [isFocused]);





  const MyMenu = ({ img, judul, onPress, desc }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{
        flexDirection: 'row',
        marginVertical: 3,
        alignItems: 'center',
        backgroundColor: colors.primary,
        marginHorizontal: 10,
        padding: 10,
      }} >
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image source={img} style={{
            width: windowHeight / 7,
            height: windowHeight / 14,
            resizeMode: 'contain'
          }} />
        </View>
        <Text style={{
          fontFamily: fonts.secondary[600],
          color: colors.white,
          fontSize: windowWidth / 25,
          textAlign: 'center'

        }}>{judul}</Text>
      </TouchableOpacity>
    )
  }


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>

      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0,
      }}>
        <Image
          source={require('../../assets/logo.png')}
          style={
            {
              width: windowWidth - 100,
              height: 120,
              resizeMode: 'contain'
            }
          }
        />
      </View>
      <View style={{
        flex: 1,
        justifyContent: 'center'
      }}>

        <MyMenu onPress={() => navigation.navigate('Add1', {
          tipe: 'LISTRIK ARUS LEMAH'
        })} img={require('../../assets/A1.png')} judul="LISTRIK ARUS LEMAH" />
        <MyMenu onPress={() => navigation.navigate('Add2', {
          tipe: 'PANEL LISTRIK'
        })} img={require('../../assets/A2.png')} judul="PANEL LISTRIK" />
        <MyMenu onPress={() => navigation.navigate('Add3', {
          tipe: 'SUMBER LISTRIK'
        })} img={require('../../assets/A3.png')} judul="SUMBER LISTRIK" />

        <MyMenu onPress={() => navigation.navigate('Add4', {
          tipe: 'INSTALASI LISTRIK'
        })} img={require('../../assets/A4.png')} judul="INSTALASI LISTRIK" />
        <MyMenu onPress={() => navigation.navigate('Add5', {
          tipe: 'SISTEM PEMBUMIAN'
        })} img={require('../../assets/A5.png')} judul="SISTEM PEMBUMIAN" />
        <MyMenu onPress={() => navigation.navigate('Add6', {
          tipe: 'SISTEM PENYALUR PETIR'
        })} img={require('../../assets/A6.png')} judul="SISTEM PENYALUR PETIR" />

      </View>



    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: windowHeight,
    height: windowWidth / 2,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});