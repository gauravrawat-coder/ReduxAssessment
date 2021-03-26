import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {
  getData,
  setData,
  deleteData,
  updateData,
} from '../Services/Home/action';
import ItemList from './ItemList';
import Icon from 'react-native-vector-icons/AntDesign';

class Home extends Component {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    title: '',
    id: '',
    body: '',

    Updatedtitle: '',
    Updatedid: '',
    Updatedbody: '',
    UpdateduserId: '',
  };
  setModalVisible = (visible) => {
    if (!visible) {
      this.setState({modalVisible: visible, title: '', id: '', body: ''});
    } else {
      this.setState({modalVisible: visible});
    }
  };

  setUpdateModalVisible = (visible) => {
    this.setState({updateModalVisible: visible});
  };
  componentDidMount() {
    this.props.getData();
  }

  //for Update

  updateItem = (title, body, userId, id) => {
    this.setState({
      Updatedid: id.toString(),
      UpdateduserId: userId.toString(),
      Updatedbody: body,
      Updatedtitle: title,
      updateModalVisible: true,
    });
  };

  updateID = (id) => {
    this.setState({Updatedid: id});
  };

  updateTitle = (title) => {
    this.setState({Updatedtitle: title});
  };

  updateBody = (body) => {
    this.setState({Updatedbody: body});
  };
  updateUserID = (userId) => {
    this.setState({UpdateduserId: userId});
  };

  updateData = () => {
    const {Updatedtitle, Updatedbody, Updatedid, UpdateduserId} = this.state;
    const data = {
      title: Updatedtitle,
      userId: UpdateduserId,
      body: Updatedbody,
      id: Updatedid,
    };
    Alert.alert('Are you Sure?', 'Do you want to Update this Item ?', [
      {
        text: 'Yes',
        onPress: () => {
          this.props.updateData(data);
          this.setState({
            updateModalVisible: false,
            Updatedtitle: '',
            Updatedid: '',
            Updatedbody: '',
            UpdateduserId: '',
          });
        },
      },

      {text: 'Cancel'},
    ]);
  };

  //finish

  //delete
  deleteItem = (id) => {
    Alert.alert('Are you Sure?', 'Do you want to delete this Item ?', [
      {text: 'Yes', onPress: () => this.props.deleteData(id)},
      {text: 'Cancel'},
    ]);
  };

  //post
  submitData = () => {
    const {title, body, id} = this.state;
    const data = {title: title, userId: id, body: body};
    Alert.alert('Are you Sure?', 'Do you want to add this Item ?', [
      {
        text: 'Yes',
        onPress: () => {
          this.setState({modalVisible: false, title: '', id: '', body: ''});

          this.props.setData(data);
        },
      },

      {text: 'Cancel'},
    ]);
  };

  changeID = (id) => {
    this.setState({id: id});
  };

  changeTitle = (title) => {
    this.setState({title: title});
  };

  changeBody = (body) => {
    this.setState({body: body});
  };

  //flatlist

  renderItem = ({item}) => (
    <ItemList
      {...item}
      deleteItem={this.deleteItem}
      updateItem={this.updateItem}
    />
  );
  render() {
    const {modalVisible} = this.state;

    const {data: content} = this.props;
    return (
      <>
        <SafeAreaView />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Item List</Text>
            <TouchableOpacity
              style={styles.addMore}
              onPress={() => this.setModalVisible(!modalVisible)}>
              <Icon name="pluscircle" size={40} color="#ECF0F1" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={content}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => item + index}
          />
        </View>

        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => this.setModalVisible(!modalVisible)}>
              <Icon name="closecircle" size={25} color="#8E44AD" />
            </TouchableOpacity>
            <Text style={styles.modalHeader}>Enter Details</Text>
            <TextInput
              style={styles.textInput}
              placeholder="userid"
              value={this.state.id}
              onChangeText={(text) => this.changeID(text)}
            />
            <TextInput
              style={styles.textInput}
              value={this.state.title}
              placeholder="title"
              onChangeText={(text) => this.changeTitle(text)}
            />
            <TextInput
              value={this.state.body}
              style={[styles.textInput, styles.body]}
              placeholder="body"
              onChangeText={(text) => this.changeBody(text)}
            />
            <TouchableOpacity
              style={styles.modalSubmit}
              onPress={this.submitData}>
              <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          visible={this.state.updateModalVisible}
          onRequestClose={() => {
            this.setUpdateModalVisible(!this.state.updateModalVisible);
          }}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() =>
                this.setUpdateModalVisible(!this.state.updateModalVisible)
              }>
              <Icon name="closecircle" size={25} color="#8E44AD" />
            </TouchableOpacity>
            <Text style={styles.modalHeader}>Update Details</Text>
            <TextInput
              style={styles.textInput}
              placeholder="id"
              value={this.state.Updatedid}
              onChangeText={(text) => this.Updateid(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="userid"
              value={this.state.UpdateduserId}
              onChangeText={(text) => this.UpdateuserId(text)}
            />
            <TextInput
              style={styles.textInput}
              value={this.state.Updatedtitle}
              placeholder="title"
              onChangeText={(text) => this.updateTitle(text)}
            />
            <TextInput
              value={this.state.Updatedbody}
              style={[styles.textInput, styles.body]}
              placeholder="body"
              onChangeText={(text) => this.updateBody(text)}
            />
            <TouchableOpacity
              style={styles.modalSubmit}
              onPress={this.updateData}>
              <Text style={styles.btnText}>Update</Text>
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
  },
  header: {
    backgroundColor: '#884EA0',
    height: '10%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#ECF0F1',
  },
  addMore: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '20%',
  },
  textInput: {
    borderColor: '#8E44AD',
    borderWidth: 2,
    width: '90%',
    height: 50,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  body: {
    height: 100,
  },

  cancelBtn: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  modalHeader: {
    fontSize: 30,
    color: '#4A235A',
  },
  modalSubmit: {
    backgroundColor: '#8E44AD',
    borderRadius: 10,
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '300',
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => ({
  data: state.home.data,
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(getData()),
  deleteData: (id) => dispatch(deleteData(id)),
  setData: (data) => dispatch(setData(data)),
  updateData: (data) => dispatch(updateData(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
