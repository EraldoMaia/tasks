import React, {Component} from 'react'
import {ImageBackground, Text, StyleSheet, View, TextInput,
        TouchableOpacity,
        Platform,
        Alert,
        } from 'react-native'

import commonStyles from '../commonStyles'
import backgroundImage from '../../assets/imgs/login.jpg'

export default class Auth extends Component{
  state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      stageNew: false,
  }

  siginOrSignup = () => {
    if (this,state.stageNew){
      Alert.alert('Sucesso!', 'Criar conta!')
    }else{
      Alert.alert('Sucesso!', 'Logar!')
    }
  }

  render(){
    return(
        <ImageBackground source={backgroundImage} style={styles.backgroud}>
          <Text style={styles.title}>TASKS</Text>
          <View style={styles.formConteiner}>
            <Text style={styles.subtitle}>
            {
              this.state.stageNew ? 'Crie seu acesso' : 'Informe seus dados'
            }
            </Text>
            {this.state.stageNew && 
            <TextInput placeholder='Nome' value={this.state.name} style={styles.input}
            onChangeText={name => this.setState({name})}/>
            }
            <TextInput placeholder='E-mail' value={this.state.email} style={styles.input}
            onChangeText={email => this.setState({email})}/>
            <TextInput placeholder='Senha' value={this.state.password} style={styles.input}
            onChangeText={password => this.setState({password})} secureTextEntry={true}/>
            {this.state.stageNew && 
            <TextInput placeholder='Confirme a Senha' value={this.state.confirmPassword} style={styles.input}
            onChangeText={confirmPassword=> this.setState({confirmPassword})} secureTextEntry={true}/>
            }
            <TouchableOpacity onPress={this.siginOrSignup}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{this.state.stageNew ? 'Cadastrar' : 'Acessar'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{padding: 10}} 
          onPress={() => this.setState({stageNew: !this.state.stageNew})}>
            <Text style={styles.buttonText}>
            {this.state.stageNew ? 'Já possui conta?' : 'Não possui conta?'}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  backgroud: {
      flex: 1,
      width: '100%',
      alignItems:'center',
      justifyContent: 'center',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10,
  },
  subtitle:{
    fontFamily: commonStyles.fontFamily,
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  input:{
    backgroundColor: '#fff',
    marginTop: 10,
    padding: Platform.OS == 'ios' ? 15 : 10
  },
  formConteiner: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    width: '90%',
  },
  button:{
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText:{
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
  },
  
})