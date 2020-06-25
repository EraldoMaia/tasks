import React from 'react'
import {ScrollView, View, Text, StyleSheet, Platform} from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import {Gravatar} from 'react-native-gravatar'
import commonStyles from '../commonStyles'

export default props => {
  return(
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>TASKS</Text>
            <Gravatar style={styles.avatar} 
            options={{
              email: props.navigation.getParam('email'),
              secure: true,

            }}/>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{props.navigation.getParam('name')}</Text>
              <Text style={styles.email}>{props.navigation.getParam('email')}</Text>
            </View>
        </View>
        <DrawerItems {...props}/>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  header:{
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  title:{
    color: '#000',
    fontFamily: commonStyles.fontFamily,
    fontSize: 25,
    paddingTop: Platform.OS === 'ios' ? 70 : 30,
    padding: 10,
  },
  avatar:{
    width: 60,
    height: 60,
    borderWidth: 3,
    borderRadius: 30,
    margin: 10,
  },
  userInfo: {
    padding: 10,
  },
  name: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    color: '#000',
    
  },
  email: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 15,
    
  },

})