import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default props =>{
  return(
    <View style={styles.conteiner}>
      <Text>{props.desc}</Text>
      <Text>{props.estameAt + ""}</Text>
      <Text>{props.doneAt + ""}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
conteiner:{
  flexDirection: 'row',
  borderColor: '#AAA',
  borderBottomWidth: 1,
  alignItems: 'center',
  paddingVertical: 15,
}


})