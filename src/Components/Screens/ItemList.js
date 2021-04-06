import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const baseURL = 'https://image.tmdb.org/t/p/w200';
const ItemList = ({
  id,
  title,
  vote_average,
  original_language,
  release_date,
  genreList,
  poster_path,
  genre_ids,
  languageList,
  grid,
}) => {
  if (grid) {
    return (
      <TouchableOpacity style={style.cardEvenContainer} key={id}>
        <View style={style.imageContainer}>
          {poster_path === null ? (
            <Image
              style={style.Nulllogo}
              source={require('../../assets/no-camera.png')}
            />
          ) : (
            <Image
              style={style.logo}
              source={{uri: `${baseURL}${poster_path}`}}
            />
          )}
        </View>
        <View style={style.textContainer}>
          <View style={style.titleContainer}>
            <Text style={style.textHeading}>{title}</Text>
          </View>
          <View style={style.releaseContainer}>
            {release_date === '' ? (
              <Text style={style.genreText}>Not Mentioned</Text>
            ) : (
              <Text style={style.genreText}>{release_date.split('-')[0]}</Text>
            )}
            <View style={style.divider} />

            {languageList !== undefined &&
              languageList.map(
                (data) =>
                  data.iso_639_1 === original_language && (
                    <Text key={data} style={style.genreText}>
                      {data.english_name}
                    </Text>
                  ),
              )}
          </View>

          <View style={style.genreContainer}>
            {genre_ids.map((ids, index) => {
              if (genreList) {
                if (index === genre_ids.length - 1) {
                  return (
                    <Text key={ids} style={style.genreText}>
                      {genreList[ids]}
                    </Text>
                  );
                } else {
                  return (
                    <Text key={ids} style={style.genreText}>
                      {genreList[ids]},
                    </Text>
                  );
                }
              }
            })}
          </View>
          {vote_average > 7 && (
            <View style={style.rating}>
              <Text style={style.ratingText}>{vote_average}</Text>
            </View>
          )}

          {vote_average < 7 && vote_average > 4 && (
            <View style={style.midrating}>
              <Text style={style.ratingText}>{vote_average}</Text>
            </View>
          )}

          {vote_average <= 4 && (
            <View style={style.lowrating}>
              <Text style={style.ratingText}>{vote_average}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={style.gridContainer} key={id}>
        <View style={style.gridImageContainer}>
          {poster_path === null ? (
            <Image
              style={style.Nulllogo}
              source={require('../../assets/no-camera.png')}
            />
          ) : (
            <Image
              style={style.logo}
              source={{uri: `${baseURL}${poster_path}`}}
            />
          )}
        </View>

        <View style={style.gridTextContainer}>
          <View style={style.gridTitleContainer}>
            <Text style={style.gridTextHeading}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};
const style = StyleSheet.create({
  logo: {
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageContainer: {
    width: 150,
    height: 250,
  },
  cardEvenContainer: {
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  textContainer: {
    marginLeft: 20,
  },

  titleContainer: {
    width: 200,
  },
  textHeading: {
    fontSize: 20,
    fontWeight: '400',
    color: '#9ca3ae',
  },
  releaseContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  divider: {
    borderColor: '#65666b',
    borderWidth: 1,
    marginHorizontal: 10,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 200,
  },
  genreText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#65666b',
  },
  rating: {
    backgroundColor: '#195531',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 6,
    paddingHorizontal: 28,
    borderRadius: 100,
  },
  lowrating: {
    backgroundColor: '#9c2d3c',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 6,
    paddingHorizontal: 28,
    borderRadius: 100,
  },
  midrating: {
    backgroundColor: '#643f13',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 6,
    paddingHorizontal: 28,
    borderRadius: 100,
  },
  ratingText: {
    color: '#cefbe1',
    fontSize: 18,
    fontWeight: '600',
  },
  //   grid

  gridContainer: {
    marginTop: 50,
    width: '35%',
    marginHorizontal: 10,
  },
  gridImageContainer: {
    width: '100%',
    height: 250,
  },

  gridTextContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  gridTitleContainer: {},
  gridTextHeading: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#6f7277',
  },
  Nulllogo: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default ItemList;
