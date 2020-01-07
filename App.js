/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, ScrollView, View, Text, SafeAreaView, NativeModules, TouchableOpacity } from 'react-native';
import { Header, Colors, } from 'react-native/Libraries/NewAppScreen';

console.ignoredYellowBox;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'valueFromState',
      threadValue: 'tmp',
    };
    this.assignNativeEvent = this.assignNativeEvent.bind(this);
    this.callNativeEvent = this.callNativeEvent.bind(this);
    this.threadExample = this.threadExample.bind(this);
  }

  callNativeEvent() {
    NativeModules.NativeFunctions.doNativeLog("selam", "canım");
  }
  assignNativeEvent() {
    let value;
    NativeModules.NativeFunctions.callBackMethodExample((error, events) => {
      if (error) {
        console.error('hehehehe' + error);
      } else {
        console.log('hahahah' + events);
        value = events;
        this.setState({value});
      }
    });
  }
  threadExample() {
    let threadValue;
    NativeModules.NativeFunctions.doSomethingExpensive(tmpValue => {
      console.log('hahahah' + tmpValue);
      threadValue = tmpValue;
      this.setState({threadValue});
    });
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <TouchableOpacity
              onPress={() => this.callNativeEvent()}
              style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Call Native Event</Text>
              <Text style={styles.sectionDescription}>
                Bu fonksiyon çağrılınca native tarafta log atacak.(xcodeda ve
                chrome debuggerda görünüyor)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.assignNativeEvent()}
              style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Callback Example</Text>
              <Text style={styles.sectionDescription}>
                Callback i olan Native tarafta çağrılan fonksiyon örneği
              </Text>
            </TouchableOpacity>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitleResult}>{this.state.value}</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.threadExample()}
              style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Thread Example</Text>
              <Text style={styles.sectionDescription}>
                native tarafta async Call yapan fonksiyonu çağırma
              </Text>
            </TouchableOpacity>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitleResult}>{this.state.threadValue}</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.setState({value: "valueFromState", threadValue: 'tmp'})}
              style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Clear</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    borderBottomWidth: 0.4,
    paddingBottom: 10,
    borderBottomColor: Colors.black,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionTitleResult: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ff0000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
