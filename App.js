import React, {Component, createRef} from 'react';
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
import {dummyTaskHelper} from './dummyTaskHelper';
const dummyTasks = dummyTaskHelper();
const listItemHeight = 50;
const verticalBarWidth = 20;
const verticalBarMargin = 10;

class App extends Component {
  constructor(props) {
    super(props);
    this.chartRef = createRef();
    this.listRef = createRef();
  }
  state = {
    todos: dummyTasks,
    lastVerticalScroll: Date.now() - 500,
    lastHorizontalScroll: Date.now() - 500,
  };

  onHorizontalChange = event => {
    if (this.state.lastVerticalScroll <= Date.now() - 500) {
      const position =
        event.nativeEvent.contentOffset.x / event.nativeEvent.contentSize.width;
      console.log('Position: ', position);
      this.listRef.current.scrollToAsync(
        position * listItemHeight * this.state.todos.length,
      );
      this.setState({lastHorizontalScroll: Date.now()});
    }
  };

  onVerticalChange = ({viewableItems}) => {
    if (this.state.lastHorizontalScroll <= Date.now() - 500) {
      console.log('First visible index: ', viewableItems[0].index);
      this.chartRef.current.scrollTo({
        x: viewableItems[0].index * (verticalBarWidth + verticalBarMargin * 2),
        y: 0,
        animated: true,
      });
      this.setState({lastVerticalScroll: Date.now()});
    }
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
        <View style={{flex: 0.3}}>
          <ScrollView
            contentContainerStyle={{
              backgroundColor: 'lightgray',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ref={this.chartRef}
            onScroll={this.onHorizontalChange}>
            {(() => {
              return this.state.todos.map((item, index) => {
                return (
                  <View
                    style={{
                      width: verticalBarWidth,
                      height: `${item.hardness * 18}%`,
                      marginHorizontal: verticalBarMargin,
                      backgroundColor: 'teal',
                    }}>
                    <Text>
                      {item.taskName.slice(0, item.taskName.indexOf('.'))}
                    </Text>
                  </View>
                );
              });
            })()}
          </ScrollView>
        </View>
        <DraggableFlatList
          onViewableItemsChanged={this.onVerticalChange}
          data={this.state.todos}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${index}`}
          onDragEnd={({data}) => this.reorderItems(data)}
          style={{
            flex: 1,
          }}
          ref={this.listRef}
        />
      </SafeAreaView>
    );
  }
  renderItem = ({item, index, drag, isActive}) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.3,
        borderBottomColor: 'black',
        height: listItemHeight,
        paddingVertical: 14,
        paddingHorizontal: 10,
      }}
      onLongPress={drag}
      activeOpacity={1}
      onPress={() => {
        console.log('pressed');
      }}>
      <Text>{item.taskName}</Text>
      <Text>{item.hardness}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});

export default App;
