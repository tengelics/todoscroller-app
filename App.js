import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import {dummyTasks} from './dummyTasks';

class App extends Component {
  state = {
    todos: dummyTasks,
  };
  onViewableItemsChanged = ({viewableItems}) => {
    console.log('First visible index: ', viewableItems[0].index);
  };
  render() {
    console.log('this.state: ', this.state);
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: 'lightgray',
            flex: 0.3,
          }}></View>
        <FlatList
          onViewableItemsChanged={this.onViewableItemsChanged}
          data={this.state.todos}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
          style={{
            flex: 1,
          }}
        />
      </SafeAreaView>
    );
  }
  renderItem = ({item}) => (
    <View style={{height: 50}}>
      <Text style={{}}>{item.taskName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default App;
