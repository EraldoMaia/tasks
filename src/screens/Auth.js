import React, {Component} from 'react'
import {ImageBackground, Text, StyleSheet, View,
        TouchableOpacity,
        Alert,
        } from 'react-native'
import axios from 'axios'

import commonStyles from '../commonStyles'
import backgroundImage from '../../assets/imgs/login.jpg'
import AuthInput from '../components/Authinput'
import {server, showError, showSuccess} from '../common'

const initialState = {
      name: '',
      email: 'eraldomaia.mec@outlook.com',
      password: '123456',
      confirmPassword: '',
      stageNew: false,
}

export default class Auth extends Component{
  state = {
    ...initialState
}

signinOrSignup = () => {
  if(this.state.stageNew) {
      this.signup()
    }else
      {
      this.signin()
    }
  }

  signup = async () => {
    try {
        await axios.post(`${server}/signup`, {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        })

        showSuccess('Usuário cadastro!')
        this.setState({ ...initialState })
    } catch(e) {
        showError(e)
    }
}

signin = async () => {
  try {
   const res = await axios.post(`${server}/signin`, {
      email: this.state.email,
      password: this.state.password,
  })
    axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
    this.props.navigation.navigate('Home', res.data)
  }
  catch(e){
    showError(e)
  }
}

  render(){
    const validations = []
    validations.push(this.state.email && this.state.email.includes('@'))
    validations.push(this.state.password && this.state.password.length >= 6)

    if(this.state.stageNew)
    { 
      validations.push(this.state.name && this.state.name.trim().length >= 3)
      validations.push(this.state.password === this.state.confirmPassword)
    }
    const validForm = validations.reduce((t,a) => t && a)

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
            <AuthInput icon='user' placeholder='Nome' value={this.state.name} style={styles.input}
            onChangeText={name => this.setState({name})}/>
            }
            <AuthInput icon='at' placeholder='E-mail' value={this.state.email} style={styles.input}
            onChangeText={email => this.setState({email})}/>
            <AuthInput icon='lock' placeholder='Senha' value={this.state.password} style={styles.input}
            onChangeText={password => this.setState({password})} secureTextEntry={true}/>
            {this.state.stageNew && 
            <AuthInput icon='asterisk' placeholder='Confirme a Senha' value={this.state.confirmPassword} style={styles.input}
            onChangeText={confirmPassword=> this.setState({confirmPassword})} secureTextEntry={true}/>
            }
            <TouchableOpacity onPress={this.signinOrSignup}
            disabled={!validForm}>
              <View style={[styles.button, validForm ? {} : {backgroundColor: '#aaa'}]}>
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
  },
  formConteiner: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    width: '90%',
    borderRadius: 10,
  },
  button:{
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText:{
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
  },
  
})