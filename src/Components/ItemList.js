import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const ItemList = ({title, body, userId, id, deleteItem, updateItem}) => {
  if (id % 2 === 0) {
    return (
      <TouchableOpacity style={style.cardEvenContainer}>
        <View style={style.btnContainer}>
          <TouchableOpacity onPress={() => deleteItem(id)}>
            <Icon
              style={style.deleteBtn}
              name="delete"
              size={20}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateItem(title, body, userId, id)}>
            <Icon style={style.editBtn} name="edit" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={style.heading}>{title}</Text>
        <Text style={style.content}>{body}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={style.cardContainer}>
        <View style={style.btnContainer}>
          <TouchableOpacity onPress={() => deleteItem(id)}>
            <Icon
              style={style.deleteBtn}
              name="delete"
              size={20}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateItem(title, body, userId, id)}>
            <Icon style={style.editBtn} name="edit" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={style.heading}>{title}</Text>
        <Text style={style.content}>{body}</Text>
      </TouchableOpacity>
    );
  }
};
const style = StyleSheet.create({
  cardContainer: {
    margin: 10,
    flex: 1,
    backgroundColor: '#D7BDE2',
    borderRadius: 20,
    padding: 20,
  },
  cardEvenContainer: {
    margin: 10,
    backgroundColor: '#BB8FCE',
    flex: 1,
    padding: 20,
    borderRadius: 20,
  },
  heading: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  content: {
    paddingTop: 10,
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  deleteBtn: {
    marginHorizontal: 5,
  },
  editBtn: {
    marginHorizontal: 5,
  },
});

export default ItemList;
