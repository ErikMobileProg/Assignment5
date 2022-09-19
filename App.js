import { StyleSheet, Text, View, Button, TextInput, FlatList, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function CalculatorScreen({ navigation }) {

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const convertedInput1 = parseInt(input1);
  const convertedInput2 = parseInt(input2);

  const [result, setResult] = useState('');

  const [data, setData] = useState([]);

  const buttonHandlerAdd = () => {
    const resultAdd = convertedInput1 + convertedInput2;
    setResult(resultAdd);
    setData([...data, { key: input1 + ' + ' + input2 + ' = ' + (resultAdd) }]);
  }

  const buttonHandlerSub = () => {
    const resultSub = convertedInput1 - convertedInput2;
    setResult(resultSub)
    setData([...data, { key: input1 + ' - ' + input2 + ' = ' + (resultSub) }]);
  }

  return (
    <View style={styles.container}>

      <View style={styles.div1}>

        <Text style={styles.text}>
          Result: {result}
        </Text>

        <TextInput
          style={styles.textInput}
          keyboardType='numeric'
          onChangeText={input1 => setInput1(input1)}
        />

        <TextInput
          style={styles.textInput}
          keyboardType='numeric'
          onChangeText={input2 => setInput2(input2)}
        />

      </View>

      <View style={styles.div2}>

        <View style={styles.buttons}>
          <Button title=' + ' onPress={buttonHandlerAdd} />
        </View>

        <View style={styles.buttons}>
          <Button title=' - ' onPress={buttonHandlerSub} />
        </View>

        <Button title='History' onPress={() => navigation.navigate('History', { data: data })} />

      </View>

    </View>
  );
}


function HistoryScreen({ route }) {

  const { data } = route.params;

  return (
    <View style={styles.container}>

      <View style={styles.div3}>

        <Text style={styles.text}>
          History
        </Text>

        <SafeAreaView style={styles.list}>
          <FlatList
            data={data}
            renderItem={({ item }) => <Text>{item.key}</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>

      </View>

    </View>
  );
}


export default function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  text: {
    fontSize: 20
  },
  div1: {
    alignItems: 'center',
    marginBottom: 20
  },
  div2: {
    flexDirection: 'row'
  },
  div3: {
    marginTop: 50
  },
  buttons: {
    marginRight: 5
  },
  list: {
    alignItems: 'center'
  }

});

