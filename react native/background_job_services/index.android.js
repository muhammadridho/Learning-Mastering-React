/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
const styles = require('./styles.js')

import BackgroundTimer from 'react-native-background-timer'
import * as firebase from 'firebase'
const ListItem = require('./components/ListItem');
const firebaseConfig = {
  apiKey: 'AIzaSyC3ebdIS2Hyt0QDL7A4_QJC0Nuu6lK6jUE',
  authDomain : 'firereactbasenative.firebaseapp.com',
  databaseURL : 'https://firereactbasenative.firebaseio.com',
  storageBucket : ''
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class background_job_services extends Component {
  constructor(props){
   super(props)
   this.state = {
      dataSource : new ListView.DataSource({
        rowHasChanged : (row1, row2) => row1 != row2,
      })
    }
   this.itemsRef = this.getRef().child('items');
  }

  getRef() {
    return firebaseApp.database().ref();
  }




  componentDidMount(){
    //send to background job
    const intervalId = BackgroundTimer.setInterval(() => {
	console.log('tic');
    }, 200);

  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>
      </View>
    );
  }


  _renderItem(item) {



    return (
      <ListItem item={item} onPress={() => console.log('clicked')} />
    );
}

}

AppRegistry.registerComponent('background_job_services', () => background_job_services);
