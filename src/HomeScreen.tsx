import React, { useState, useEffect } from 'react';
import { View, Text, Button, Animated, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { currentTab } from '../redux/currentTab/currentTabSlice';
import { tabBar } from '../util/tabBar';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { login } from '../redux/login/loginSlice';
import { useForm, Controller } from "react-hook-form"

function HomeScreen({ route, navigation }) {
  type loginDataType = {
    username: string
    password: string
  }

  const defaultLoginData: loginDataType = {
    username: "",
    password: ""
  }

  let fadeAnim = React.useRef(new Animated.Value(0)).current;

  const [loginData, setLoginData] = useState<loginDataType>(defaultLoginData)
  const [errorMsg, setErrorMsg] = useState<string>("")

  const {
    control, handleSubmit, getValues, reset
  } = useForm({
    defaultValues: loginData,
  })

  const onSubmit = () => {
    setErrorMsg("")
    const value = getValues()
    setLoginData(value)
    loginDataValidation(value)
  }

  const loginDataValidation = (loginData: loginDataType) => {
    if (loginData.username == "" || loginData.password == "") {
      setErrorMsg("Missing required info")
    } else {
      dispatch(login(loginData))
        .then((res) => {
          // console.log("login res:",res)
          if (res.payload["username"]) {
            reset(defaultLoginData)
            goToDetail(tabBar[0].navigator)
            navigation.navigate('Dashboard')
            fadeOut()
          }
          if (res.payload["msg"]){
            setErrorMsg(res.payload["msg"])
            reset(defaultLoginData)
          }
        })
        .catch((err)=>{
          setErrorMsg("Network issue")
          reset(defaultLoginData)
        })
    }
  }

  const username = useAppSelector((state) => state.login.res_username)
  const fetchState = useAppSelector((state) => state.login.fetch_state)

  const dispatch = useAppDispatch()

  const goToDetail = async (tab: string) => {
    dispatch(currentTab(tab))
  }

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start()
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  };

  useEffect(() => {
    fadeIn()
  });

  return (
    <View style={styles.mainContainer}>
      <Text>Home Screen</Text>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View
          style={{ width: 200, justifyContent: 'center', alignItems: "center" }}
        >
          {!username &&
            <View style={styles.loginForm}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputView}>
                    <View style={{justifyContent: 'flex-start', width: '100%'}}>
                      <Text>Username</Text>
                    </View>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize='none'
                    />
                  </View>
                )}
                name="username"
              />
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputView}>
                    <View style={{justifyContent: 'flex-start', width: '100%'}}>
                      <Text>Password</Text>
                    </View>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize='none'
                    />
                  </View>
                )}
                name="password"
              />

              <View style={styles.submitBtnContainer}>
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text>Login</Text>
                </TouchableOpacity>
              </View>
            </View>

          }

          {fetchState == "pending" &&
            <View>
              <Text>Loading...</Text>
            </View>
          }

          {errorMsg &&
            <View>
              <Text style={{ color: 'red' }}>{errorMsg}</Text>
            </View>
          }
        </View>

      </Animated.View>
      <TouchableOpacity onPress={()=>{
        reset(defaultLoginData)
        goToDetail(tabBar[0].navigator)
        // navigation.navigate(tabBar[0].navigator)
        navigation.navigate("Dashboard")
        fadeOut()
      }}>
        <Text>Bypass login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailText: {
    color: 'grey',
  },
  textInput: {
    width: 100,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 6,
    paddingHorizontal: 6,
  },
  submitBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    width: 100,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  loginForm: {
    backgroundColor:'white', 
    padding: 14, 
    marginVertical: 6, 
    borderRadius: 6
  },
  inputView: {
    // flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});

export default HomeScreen