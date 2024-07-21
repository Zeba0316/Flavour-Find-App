import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Keyboard,
  Vibration,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import LottieView from "lottie-react-native";
import { ChevronLeftIcon, ClockIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';



const SpecialFeature = () => {
  const [textInput, setTextInput] = useState("");
  const [image, setImage] = useState(null);
  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const geminiKey = "AIzaSyDl74GliVPGx3s8ZFfXtvnAPuSl1iAy848";
  const navigation = useNavigation();

  async function query(data) {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
        {
          headers: {
            Authorization: 'Bearer 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',
          },
          method: 'POST',
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error('Error generating image');
      }

      const result = await response.blob();
      return result;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.replace(/^data:.+;base64,/, '');
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  const generateImage = async () => {
    try {
      const response = await query({ inputs: textInput + "picture" });
      if (response) {
        try {
          const base64 = await blobToBase64(response);
          const imageUri = `data:image/jpeg;base64,${base64}`;
          setImage(imageUri);
        } catch (error) {
          setError('Error converting blob to base64');
        }
      }
    } catch (error) {
      setError('Error generating image');
    }
  };

  const handleInputChange = (text) => {
    setTextInput(text);
  };
  const handleSend = () => {
    setImage("");
    setSolution(false)
    try {
      if (textInput.trim() == "") {
        return;
      }
      getSolution(textInput);
      generateImage();
      setTextInput("");
      Keyboard.dismiss();
      Vibration.vibrate(40);
      console.log("sent!");
    } catch (err) {
      console.log(`Error sending ingredients to server : ${err}`);
    }
  }

  const getSolution = async (textInput) => {
    console.log("111");
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `give ingredients and recipe of ${textInput}, in points remove * and only answer in text ,also add emojis `,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      setSolution(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(`Error fetching solution: ${error}`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        flexDirection: "column",
        padding: 10,
        backgroundColor: "#fee7cc",
      }}
    >
       <View style={{ position: 'absolute', top: 50, left: 0, flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 1, backgroundColor: "white", borderRadius: 45, padding: 5 }} >
          <ChevronLeftIcon size={24} strokeWidth={2} color="#fbbf24" />
        </TouchableOpacity>
      </View>

       
      <View style={{ alignSelf: "center", padding: 10, marginTop: 50 }}>
        
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 300, height: 250, resizeMode: "cover" }}
          />
        ) : (
          <LottieView
            autoPlay
            style={{
              width: 300,
              height: 250,
            }}
            source={require("../../assets/foodie.json")}
          />
        )}
      </View>
      <View style={{ height: 8 }}></View>
      {loading && <ActivityIndicator size="large" color="orange" />}
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 6,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {solution != "" ? (
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "gray",
              overflow: "hidden",
            }}
          >
            {solution}
          </Text>
        ) : (
          <>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "gray",
                overflow: "hidden",
              }}
            >
              Wanna Know Your Desired Dish Recipe?
            </Text>
            {solution === false && <ActivityIndicator style={{ marginTop: 100 }} size="large" color="orange" />}
          </>
        )}
      </ScrollView>
      <View style={{ height: 8 }}></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TextInput
          value={textInput}
          onChangeText={handleInputChange}
          placeholder="Enter Your Favourite Dish"
          style={{
            flex: 1,
            color: "#fafafa",
            backgroundColor: "#fec381",
            fontSize: 15,
            paddingVertical: 7,
            paddingHorizontal: 15,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#fffc00",
          }}
        ></TextInput>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            gap: 18,
            marginHorizontal: 3,
          }}
        >
          <TouchableOpacity onPress={handleSend}>
            <Ionicons name="send-sharp" size={30} color="#9e9e9e" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SpecialFeature;
