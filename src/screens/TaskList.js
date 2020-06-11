import React, {Component} from 'react'
import {Text, View, ImageBackground, StyleSheet, FlatList} from 'react-native'
import todayImage from '../../assets/imgs/today.jpg'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles'
import Task from '../components/Task'

export default class TaskList extends Component{

  state = {
    tasks: [{
        id: Math.random(),
        desc: 'Analisar dados, Enel!',
        estimateAt: new Date(),
        doneAt: new Date(),
    },
    {
      id: Math.random(),
      desc: 'Desenvolver app!',
      estimateAt: new Date(),
      doneAt: null,
  },
  ]
  }
  render(){
  const hoje = moment().locale('pt-br').format('ddd, D[ de] MMM')
    return(
      <View style={styles.container}>
        <ImageBackground source={todayImage} style={styles.backgound}>
          <View style={styles.barradetitulos}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{hoje}</Text>
          </View>
        </ImageBackground>
          <View style={styles.Tasklist}>
            <FlatList data={this.state.tasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => <Task {...item}/>} />
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgound: {
    flex: 3,
  },
  Tasklist:{
    flex: 7,
  }, 
  barradetitulos:{
    flex: 1,
    justifyContent: 'flex-end',
  },
  title:{
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 35,
    marginLeft:20,
    marginBottom:20,
  },
  subtitle:{
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft:20,
    marginBottom:20,
  },
})