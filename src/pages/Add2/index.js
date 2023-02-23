import { Alert, StyleSheet, Text, View, Image, ActivityIndicator, PermissionsAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
export default function Add2({ navigation, route }) {


    const options = {
        includeBase64: true,
        quality: 0.2,
    };


    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [kirim, setKirim] = useState({
        tipe: route.params.tipe,
        lokasi: '',
        deskripsi: '',
        status: '',
        rekomendasi: '',
        standar: '',
        foto: '',
        catatan: '',
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false


    });


    // setLoading(false);

    const sendServer = () => {

        if (!kirim.foto) {
            showMessage({
                type: 'danger',
                message: 'Foto Masih kosong !'
            })
        } else {
            console.log(kirim);
            setLoading(true);

            axios.post(apiURL + 'cek_add2', kirim).then(res => {
                setLoading(false);
                console.log(res.data);
                if (res.data == 200) {
                    Alert.alert(MYAPP, 'Data berhasil di simpan !');


                }
            })
        }

    }


    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
    useEffect(() => {
        requestCameraPermission();
    }, []);

    const MyPilih = ({ judul, no }) => {
        return (
            <View style={{
                marginVertical: 3,
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: kirim[no] ? colors.primary : colors.border,
                alignItems: 'center'
            }}>
                <View style={{
                    flex: 1
                }}>
                    <Text style={{
                        left: 5,
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 40
                    }}>{judul}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    if (!kirim[no]) {
                        setKirim({
                            ...kirim,
                            [no]: true
                        })
                    } else {
                        setKirim({
                            ...kirim,
                            [no]: false
                        })
                    }
                }} style={{
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                }}>
                    <Icon type='ionicon' name='checkmark-circle' color={kirim[no] ? colors.primary : colors.border} />
                </TouchableOpacity>
            </View>
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
                height: 50,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                backgroundColor: colors.primary,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 20,
                    color: colors.white
                }}>{route.params.tipe}</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{
                padding: 10,
            }}>
                <TouchableOpacity
                    onPress={() => launchCamera(options, response => {
                        if (response.didCancel) {
                        } else if (response.error) {
                        } else {
                            if (response.fileSize <= 2000000) {
                                let source = { uri: response.uri };
                                setKirim({ ...kirim, foto: `data:${response.type};base64, ${response.base64}`, });
                            } else {
                                showMessage({ message: 'Ukuran Foto Terlalu Besar Max 500 KB', type: 'danger', });
                            }
                        }
                    })}
                    style={{
                        padding: 0,
                        backgroundColor: colors.white,
                        marginVertical: 5,
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: colors.primary,
                    }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Icon type='ionicon' name='camera' color={colors.primary} size={12} />
                        <Text
                            style={{
                                left: 5,
                                fontFamily: fonts.secondary[600],
                                color: colors.primary,
                            }}>
                            Visual
                        </Text>
                    </View>
                    <Image
                        source={{
                            uri: !kirim.foto ? 'https://zavalabs.com/nogambar.jpg' : kirim.foto,
                        }}
                        style={{
                            width: '100%',
                            aspectRatio: 1,
                            resizeMode: 'contain',
                            transform: [{ rotate: '90deg' }]
                        }}
                    />

                </TouchableOpacity>
                <MyInput label="Lokasi" iconname="location" onChangeText={x => setKirim({ ...kirim, lokasi: x })} />
                <MyGap jarak={5} />



                {/* <MyInput label="Deskripsi" iconname="folder-open" onChangeText={x => setKirim({ ...kirim, deskripsi: x })} /> */}

                <MyPilih judul="TIDAK DILENGKAPI DENGAN RAMBU BAHAYA" no={1} />
                <MyPilih judul="TIDAK DILENGKAPI DENGAN CHECKLIST PEMELIHARAAN" no={2} />
                <MyPilih judul="TIDAK DILENGKAPI DENGAN GAMBAR" no={3} />
                <MyPilih judul="TIDAK DILENGKAPI DENGAN PENANDA" no={4} />
                <MyPilih judul="TIDAK DILENGKAPI DENGAN RAMBU WAJIB APD" no={5} />
                <MyPilih judul="TIDAK DILENGKAPI DENGAN GROUNDING" no={6} />
                <MyPilih judul="SIRKIT TIDAK DILENGKAPI DENGAN GPAL" no={7} />
                <MyPilih judul="TIDAK DILENGKAPI DENGAN BONDING PINTU PANEL" no={8} />
                <MyPilih judul="RUANG BEBAS PANEL TIDAK MENCUKUPI" no={9} />
                <MyPilih judul="LAMPU INDIKATOR RUSAK" no={10} />
                <MyPilih judul="INDIKATOR UKUR RUSAK" no={11} />
                <MyPilih judul="TANDA PENGENAL KABEL TIDAK SESUAI" no={12} />




                <MyGap jarak={5} />

                <MyInput label="Catatan" iconname="create" onChangeText={x => setKirim({ ...kirim, catatan: x })} />



            </ScrollView>

            <View style={{
                padding: 10,
            }}>
                <MyGap jarak={20} />
                {!loading && <MyButton onPress={sendServer} title="SIMPAN" warna={colors.primary} Icons="person-add" />}

                {loading && <ActivityIndicator size="large" color={colors.primary} />
                }
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})