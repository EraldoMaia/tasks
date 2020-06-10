import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import commomStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/FontAwesome'

export default props =>{
const doneOrNotStyles = props.doneAt != null ?
{textDecorationLine: 'line-through'} : {}

  return(
    <View style={styles.conteiner}>
      <View style={styles.checkconteiner}>
        {getCheckView(props.doneAt)}
      </View>
      <View>
          <Text style={[styles.desc, doneOrNotStyles]}>{props.desc}</Text>
          <Text>{props.estameAt + ""}</Text>
      </View>
    </View>
  )
}

function getCheckView(doneAt){
  if(doneAt!=null){
  return(
  <View style={styles.done}>
    <Icon name='check' size={20}></Icon>
  </View>  )}else{
    return(
    <View style={styles.pending}></View>)}
}

const styles = StyleSheet.create({
conteiner:{
  flexDirection: 'row',
  borderColor: '#AAA',
  borderBottomWidth: 1,
  alignItems: 'center',
  paddingVertical: 15,
},
checkconteiner:{
  width: '20%',
  alignItems:'center',
  justifyContent:'center',
},
pending:{
  height:26,
  width:26,
  borderRadius:13,
  borderWidth:1,
  borderColor: '#555',
},
done:{
  height:26,
  width:26,
  borderRadius:13,
  borderWidth:1,
  borderColor: '#555',
  backgroundColor:'#00FA9A',
  alignItems:'center',
  justifyContent:'center',
},
desc:{
  fontFamily: commomStyles.fontFamily,
  color: commomStyles.colors.mainText,
  fontSize: 15,


}

})