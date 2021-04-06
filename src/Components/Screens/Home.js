import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  StatusBar,
} from 'react-native';
import Modal from 'react-native-modal';

import {connect} from 'react-redux';
import {
  getData,
  getGenre,
  getLanguage,
  sortData,
  updateData,
} from '../../Services/Home/action';
import ItemList from './ItemList';
import Icon from 'react-native-vector-icons/AntDesign';

class Home extends Component {
  state = {
    grid: true,
    modalVisible: false,
    selectedOption: 'Most popular',
    finalOption: 'Most popular',
  };
  componentDidMount() {
    this.props.getData();
    this.props.getGenre();
    this.props.getLanguage();
  }

  modalVisibility = (visibility) => this.setState({modalVisible: visibility});

  changeGrid = () => {
    this.setState({grid: !this.state.grid});
  };

  changeOption = (option) => {
    this.setState({selectedOption: option});
  };

  submitFilter = () => {
    this.setState({
      modalVisible: false,
      finalOption: this.state.selectedOption,
    });
    this.props.sortData(this.state.selectedOption);
  };

  endReached = () => {
    let nextPage = this.props.pageNo + 1;
    this.props.updateData(nextPage, this.state.selectedOption);
  };

  //flatlist
  renderItem = ({item}) => {
    return (
      <ItemList
        {...item}
        genreList={this.props.genre}
        languageList={this.props.language}
        grid={this.state.grid}
      />
    );
  };
  render() {
    const {data: content} = this.props;
    return (
      <>
        <SafeAreaView style={styles.safeArea} />
        <View style={styles.container}>
          <View style={[styles.header, styles.firstHeader]}>
            <Text style={styles.headerText}>Home</Text>
            <TouchableOpacity
              onPress={() => {
                this.modalVisibility(!this.state.modalVisible);
              }}>
              <Icon name={'filter'} size={30} color={'#a6aab0'} />
            </TouchableOpacity>
          </View>

          <View style={styles.header}>
            <Text style={styles.headerText}>{this.state.finalOption}</Text>
            <TouchableOpacity onPress={this.changeGrid}>
              <Icon name={'appstore-o'} size={30} color={'#a6aab0'} />
            </TouchableOpacity>
          </View>
          {this.state.grid ? (
            <FlatList
              data={content}
              key={1}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => item + index}
              numColumns={1}
              ItemSeparatorComponent={() => (
                <View style={styles.flatListSeparator} />
              )}
              onEndReached={this.endReached}
            />
          ) : (
            <View>
              <FlatList
                columnWrapperStyle={styles.flatListContainer}
                data={content}
                key={2}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => item + index}
                numColumns={2}
                onEndReached={this.endReached}
              />
            </View>
          )}
        </View>

        {/* modal */}
        <Modal
          isVisible={this.state.modalVisible}
          style={styles.viewModal}
          onSwipeComplete={() => this.modalVisibility(!this.state.modalVisible)}
          onBackButtonPress={() =>
            this.modalVisibility(!this.state.modalVisible)
          }
          swipeDirection={'down'}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Filter</Text>
            </View>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}>Date</Text>
              <View style={styles.modalChoices}>
                <Text style={styles.modalText}>Releases</Text>
                <Switch
                  trackColor={{false: '#bdbdbd', true: '#bcc6c4'}}
                  ios_backgroundColor="#bdbdbd"
                  onValueChange={() => this.changeOption('Releases')}
                  value={this.state.selectedOption === 'Releases'}
                  thumbColor={
                    this.state.selectedOption === 'Releases'
                      ? '#146a5e'
                      : 'white'
                  }
                />
              </View>
              <View style={styles.modalChoices}>
                <Text style={styles.modalText}>Old</Text>
                <Switch
                  trackColor={{false: '#bdbdbd', true: '#bcc6c4'}}
                  ios_backgroundColor="#bdbdbd"
                  onValueChange={() => this.changeOption('Old')}
                  value={this.state.selectedOption === 'Old'}
                  thumbColor={
                    this.state.selectedOption === 'Old' ? '#146a5e' : 'white'
                  }
                />
              </View>
            </View>

            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}>Popularity</Text>
              <View style={styles.modalChoices}>
                <Text style={styles.modalText}>Most Popular</Text>
                <Switch
                  trackColor={{false: '#bdbdbd', true: '#bcc6c4'}}
                  ios_backgroundColor="#bdbdbd"
                  onValueChange={() => this.changeOption('Most popular')}
                  value={this.state.selectedOption === 'Most popular'}
                  thumbColor={
                    this.state.selectedOption === 'Most popular'
                      ? '#146a5e'
                      : 'white'
                  }
                />
              </View>
              <View style={styles.modalChoices}>
                <Text style={styles.modalText}>Less Popular</Text>
                <Switch
                  trackColor={{false: '#bdbdbd', true: '#bcc6c4'}}
                  ios_backgroundColor="#bdbdbd"
                  onValueChange={() => this.changeOption('Less popular')}
                  value={this.state.selectedOption === 'Less popular'}
                  thumbColor={
                    this.state.selectedOption === 'Less popular'
                      ? '#146a5e'
                      : 'white'
                  }
                />
              </View>
            </View>

            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}>Revenue</Text>
              <View style={styles.modalChoices}>
                <Text style={styles.modalText}>Higher revenue</Text>
                <Switch
                  trackColor={{false: '#bdbdbd', true: '#bcc6c4'}}
                  ios_backgroundColor="#bdbdbd"
                  onValueChange={() => this.changeOption('Higher revenue')}
                  value={this.state.selectedOption === 'Higher revenue'}
                  thumbColor={
                    this.state.selectedOption === 'Higher revenue'
                      ? '#146a5e'
                      : 'white'
                  }
                />
              </View>
              <View style={styles.modalChoices}>
                <Text style={styles.modalText}>Lowest revenue</Text>
                <Switch
                  trackColor={{false: '#bdbdbd', true: '#bcc6c4'}}
                  ios_backgroundColor="#bdbdbd"
                  onValueChange={() => this.changeOption('Lowest revenue')}
                  value={this.state.selectedOption === 'Lowest revenue'}
                  thumbColor={
                    this.state.selectedOption === 'Lowest revenue'
                      ? '#146a5e'
                      : 'white'
                  }
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={this.submitFilter}>
              <Text style={styles.btnText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <SafeAreaView />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#191919',
  },
  safeArea: {
    backgroundColor: '#191919',
  },
  firstHeader: {
    borderBottomColor: '#161616',
    borderBottomWidth: 5,
    marginHorizontal: 5,
  },
  header: {
    backgroundColor: '#191919',
    height: '10%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
  },
  headerText: {
    fontSize: 25,
    fontWeight: '400',
    color: '#a6aab0',
  },
  flatListContainer: {justifyContent: 'space-around'},
  flatListSeparator: {marginVertical: 10},
  viewModal: {
    justifyContent: 'flex-end',
    flex: 1,
    margin: 0,
    padding: 0,
  },
  modalContainer: {
    backgroundColor: '#171717',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
  },
  modalHeader: {
    marginBottom: 20,
  },
  modalHeaderText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    color: 'lightslategray',
  },
  modalTitle: {},
  modalTitleText: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 10,
    color: 'lightslategray',
  },
  modalText: {
    color: 'dimgray',
    fontSize: 18,
    fontWeight: '300',
  },
  modalChoices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  btnContainer: {
    backgroundColor: '#3a444d',
    padding: 15,
    borderRadius: 50,
    marginVertical: 20,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
  },
});

const mapStateToProps = (state) => ({
  data: state.home.data,
  pageNo: state.home.currentPage,
  genre: state.home.genre,
  language: state.home.language,
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(getData()),
  getGenre: () => dispatch(getGenre()),
  getLanguage: () => dispatch(getLanguage()),
  sortData: (sortBy) => dispatch(sortData(sortBy)),
  updateData: (page, sortBy) => dispatch(updateData(page, sortBy)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
