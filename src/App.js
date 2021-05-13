import React, {Component, Fragment, createRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {dummyTaskHelper} from './dummyHelper';
const dummyTasks = dummyTaskHelper();
const listItemHeight = 50;
const verticalBarWidth = 20;
const verticalBarMargin = 10;

class App extends Component {
  constructor(props) {
    super(props);
    this.chartRef = createRef();
    this.listRef = createRef();
    this.chartWidth = 0;
  }

  state = {
    todoArray: dummyTasks,
    lastVerticalScroll: Date.now() - 1000,
    lastHorizontalScroll: Date.now() - 1000,
  };

  onHorizontalScroll = event => {
    if (this.state.lastVerticalScroll <= Date.now() - 1000) {
      const positionFraction =
        event.nativeEvent.contentOffset.x / event.nativeEvent.contentSize.width;
      const absolutePosition =
        positionFraction * listItemHeight * this.state.todoArray.length;
      this.listRef.current.scrollToAsync(absolutePosition);
      this.setState({lastHorizontalScroll: Date.now()});
    }
  };

  onVerticalScroll = ({viewableItems}) => {
    if (this.state.lastHorizontalScroll <= Date.now() - 1000) {
      const positionFraction =
        viewableItems[0].index / (this.state.todoArray.length - 1);
      const absolutePosition = positionFraction * this.chartWidth;
      this.chartRef.current.scrollTo({
        x: absolutePosition,
        y: 0,
        animated: true,
      });
      this.setState({lastVerticalScroll: Date.now()});
    }
  };

  onItemReorder = newArray => {
    this.setState({
      todoArray: newArray,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        {this.renderChart()}
        {this.renderList()}
      </SafeAreaView>
    );
  }

  renderChart = () => (
    <View style={styles.chartScrollContainer}>
      <ScrollView
        contentContainerStyle={styles.chartScrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={this.chartRef}
        onScroll={this.onHorizontalScroll}
        onContentSizeChange={width => {
          this.chartWidth = width;
        }}>
        {this.state.todoArray.map((item, index) => {
          const addWeekend = index > 0 && index % 5 === 0;
          return this.renderChartBar(item, addWeekend);
        })}
      </ScrollView>
    </View>
  );

  renderChartBar = (item, addWeekend) => (
    <Fragment>
      {addWeekend && this.renderWeekendBar()}
      <View
        style={{
          ...styles.chartBar,
          height: `${item.hardness * 18}%`,
        }}>
        <Text>{item.taskName.slice(0, item.taskName.indexOf('.'))}</Text>
      </View>
    </Fragment>
  );

  renderWeekendBar = () => (
    <Fragment>
      <View style={{...styles.chartBar, height: 0}} />
      <View style={{...styles.chartBar, height: 0}} />
    </Fragment>
  );

  renderList = () => (
    <DraggableFlatList
      onViewableItemsChanged={this.onVerticalScroll}
      data={this.state.todoArray}
      renderItem={this.renderListItem}
      keyExtractor={(item, index) => `draggable-item-${index}`}
      onDragEnd={({data}) => this.onItemReorder(data)}
      style={styles.flatList}
      ref={this.listRef}
    />
  );
  renderListItem = ({item, index, drag, isActive}) => (
    <TouchableOpacity
      style={styles.flatListItem}
      onLongPress={drag}
      activeOpacity={1}
      onPress={() => {}}>
      <Text>{item.taskName}</Text>
      <Text>{item.hardness}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  chartScrollContainer: {
    flex: 0.3,
  },
  chartScrollView: {
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  chartBar: {
    width: verticalBarWidth,
    marginHorizontal: verticalBarMargin,
    backgroundColor: 'teal',
  },
  flatList: {
    flex: 1,
  },
  flatListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
    height: listItemHeight,
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
});

export default App;
