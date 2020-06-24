import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'

import todayImage from '../../assets/imgs/today.jpg';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import AddTask from './AddTask';
import { server, showError} from '../common'

const inicialstate = {
  showDoneTasks: true,
  showAddTask: false,
  visibleTasks: [],
  tasks: [],
};

export default class TaskList extends Component {
  state = {
    ...inicialstate
  };
  componentDidMount = async () => {
    const stateString = await AsyncStorage.getItem('tasksState')
    const savedState = JSON.parse(stateString) || inicialstate
    this.setState({showDoneTasks: savedState.showDoneTasks}, this.filterTasks)

    this.loadTasks()
  };

  loadTasks = async () => {
    try{
      const maxDate = moment()
      .add({days: this.props.daysAhead})
      .format('YYYY-MM-DD 23:59:59')
      const res = await axios.get(`${server}/tasks?date=${maxDate}`)
      this.setState({tasks: res.data}, this.filterTasks)
    }catch(e){
      showError(e)
    }
  }

  toggleFilter = () => {
    this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks);
  };

  filterTasks = () => {
    let visibleTasks = null;
    if  (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      const pending = task => task.doneAt === null;
      visibleTasks = this.state.tasks.filter(pending);
    }
    this.setState({visibleTasks});
    AsyncStorage.setItem('tasksState',JSON.stringify({
      showDoneTasks: this.state.showDoneTasks
    }),)
  };
  toggleTask = async taskId => {
      try{
        await axios.put(`${server}/tasks/${taskId}/toggle`)
        this.loadTasks()
      }catch(e){
        showError(e)
      }
  };

  addTask = async newTask => {
    if(!newTask.desc || !newTask.desc.trim()) {
        Alert.alert('Dados Inválidos', 'Descrição não informada!')
        return 
    }

    try {
        await axios.post(`${server}/tasks`, {
           desc: newTask.desc,
           estimateAt: newTask.date 
        })

        this.setState({ showAddTask: false }, this.loadTasks)
    } catch(e) {
        showError(e)
    }
}


  deleteTask = async (taskId) =>{
    try{
      await axios.delete(`${server}/tasks/${taskId}`)
      this.loadTasks()
    }catch(e){
      showError(e)
    }
  }

  render() {
    const hoje = moment()
      .locale('pt-br')
      .format('ddd, D[ de] MMM')
    return (
      <View style={styles.container}>
        <AddTask isVisible={this.state.showAddTask} 
        onCancel={() => this.setState({showAddTask: false})}
        onSave={this.addTask}/>
        <ImageBackground source={todayImage} style={styles.backgound}>
          <View style={styles.iconBar}>
          <TouchableOpacity onPress={this.toggleFilter}>
              <Icon onPress={() => this.props.navigation.openDrawer()} name={'bars'}
               size={20} color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>        
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.barradetitulos}>
              <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.subtitle}>{hoje}</Text>
          </View>
        </ImageBackground>
        <View style={styles.Tasklist}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => (
              <Task {...item} toggleTask={this.toggleTask}
              onDelete={this.deleteTask} />
            )}
          />
        </View>
        <TouchableOpacity style={styles.addButton} 
        onPress={()=> this.setState({showAddTask:true})}
        activeOpacity={0.7}>
          <Icon name='plus' size={20} color={commonStyles.colors.secondary}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgound: {
    flex: 3,
  },
  Tasklist: {
    flex: 7,
  },
  barradetitulos: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 35,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 40 : 10,
  },
  addButton:{
    position:'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: commonStyles.colors.today,
    alignItems: 'center',
    justifyContent: 'center',
  },
});