import React, {Component} from 'react'
import {Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  StyleSheet} from 'react-native'
import commonStyles from '../commonStyles';

const initialState = {desc: ''}

export default class AddTask extends Component{
  state={
    ...initialState
  }
  
  render(){
    return(
      <Modal transparent={true} visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType='slide'>
          <TouchableWithoutFeedback onPress={this.props.onCancel}>
            <View style={styles.backgroud}></View>
          </TouchableWithoutFeedback>
          <View style={styles.conteiner}>
            <Text style={styles.header}>Nova Tarefa</Text>
            <TextInput style={styles.input} 
            placeholder='Informe a Descrição...'
            onChangeText={desc => this.setState({desc})}
            value={this.state.desc}/>
            <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={this.props.onCancel}>
            <View style={styles.backgroud}></View>
          </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({

  backgroud:{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  conteiner:{
    backgroundColor: '#FFF',
  },
  header:{
    fontSize: 20,
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    textAlign: 'center',
    color: commonStyles.colors.secondary,
    padding: 15,
  }, 
  buttons:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button:{
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.today,
  },
  input:{
    fontFamily: commonStyles.fontFamily,
    height: 40,
    margin: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 9,
  },
})