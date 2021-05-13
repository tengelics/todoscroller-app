import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {dummyTasks} from './dummyTasks';

class App extends Component {
  state = {
    todos: dummyTasks,
  };
  onViewableItemsChanged = ({viewableItems}) => {
    console.log('First visible index: ', viewableItems[0].index);
  };
  reorderItems = newArray => {
    this.setState({
      todos: newArray,
    });
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
        <DraggableFlatList
          onViewableItemsChanged={this.onViewableItemsChanged}
          data={this.state.todos}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${index}`}
          onDragEnd={({data}) => this.reorderItems(data)}
          style={{
            flex: 1,
          }}
        />
      </SafeAreaView>
    );
  }
  renderItem = ({item, index, drag, isActive}) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderBottomColor: 'black',
      }}
      onLongPress={drag}
      activeOpacity={1}
      onPress={() => {
        console.log('pressed');
      }}>
      <Text
        style={{
          paddingVertical: 14,
        }}>
        {item.taskName}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});

export default App;
