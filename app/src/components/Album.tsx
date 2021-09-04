import { StackNavigationProp } from '@react-navigation/stack'
import { format, parseISO } from 'date-fns'
import { LinearGradient } from 'expo-linear-gradient'
import React, { FC, memo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { HomeStackParamList } from '../@types/StackParamList'
import { colors } from '../config/colors'
import { MyText } from './MyText'
import { SmoothFastImage } from './SmoothFastImage'

interface Props {
  data: {
    album: {
      id: string
      name: string
      albumCover: string
      createdAt: string
    }
    albumCover: {
      id: string
      key: string
      mimetype: string
      fileURL: string
      createdAt: string
    }
  }
  navigation?: StackNavigationProp<HomeStackParamList, 'Albums'>
}

const Album: FC<Props> = ({
  data: {
    album: { id, name, createdAt },
    albumCover,
  },
  navigation,
}) => {
  const linearGradient = albumCover
    ? ['rgba(15, 15, 15, 0)', 'rgba(15, 15, 15, 0.8)']
    : ['rgba(15, 15, 15, 0)', 'rgba(15, 15, 15, 0)']

  return (
    <TouchableOpacity
      style={[styles.touchable, styles.parent]}
      activeOpacity={0.4}
      onPress={() => {
        if (navigation) navigation.navigate('AlbumFiles', { id })
      }}
    >
      <View
        style={{
          backgroundColor: !albumCover ? colors.secondary : 'transparent',
        }}
      >
        <View style={styles.parent}>
          <SmoothFastImage
            style={[styles.albumCover, styles.parent]}
            source={{ uri: albumCover?.fileURL }}
            resizeMode='cover'
          />
          <LinearGradient
            style={[{ flex: 1 }, styles.card]}
            start={[0.5, 0]}
            end={[0.5, 1]}
            colors={linearGradient}
          >
            <View style={styles.details}>
              <MyText
                numberOfLines={1}
                customStyles={{
                  maxWidth: '40%',
                }}
              >
                {name}
              </MyText>
              <MyText size='xs' customStyles={{ opacity: 0.57 }}>
                {format(parseISO(createdAt), 'p yyyy-MM-dd')}
              </MyText>
            </View>
          </LinearGradient>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default memo(Album, ({ data: prev }, { data: next }) => {
  const secondCondition = prev?.albumCover
    ? prev.albumCover.key !== next.albumCover.key
    : false

  if (prev.album.id !== next.album.id || secondCondition) {
    return false
  }
  return true
})

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
  },
  touchable: {
    marginBottom: 8,
  },
  albumCover: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: colors.borderColor,
    borderWidth: 1.5,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  details: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  card: {
    width: '100%',
    height: '100%',
    padding: 15,
    justifyContent: 'flex-end',
  },
})