import React from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import commomStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'

export default props =>{
const doneOrNotStyles = props.doneAt != null ?
{textDecorationLine: 'line-through'} : {}

const date = props.doneAt ? props.doneAt : props.estameAt

const formattedDate = moment(date).locale('pt-br')
.format('ddd, D[ de] MMM')

  return(
    <View style={styles.conteiner}>
      <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
        <View style={styles.checkconteiner}>
          {getCheckView(props.doneAt)}
        </View>
      </TouchableWithoutFeedback>
      <View>
          <Text style={[styles.desc, doneOrNotStyles]}>{props.desc}</Text>
          <Text style={styles.date}>{formattedDate  + ""}</Text>
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
},
date:{
  fontFamily: commomStyles.fontFamily,
  color: commomStyles.colors.subText,
  fontSize: 12,
},

})