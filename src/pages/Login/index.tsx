import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ImageBackground,
  Image
} from 'react-native';
import AxiosInstance from '../../api/AxiosInstance';

import {styles} from './style';

import {DataContext} from '../../context/DataContext';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [load, setLoad] = useState(false);

  const {armazenaDadosUsuario} = useContext(DataContext);


  const handleLogin = async () => {
    //console.log(`mail: ${email} - senha: ${senha}`);
    setLoad(true)
    var tokenJwt: any = null;

    try {
      const retorno = await AxiosInstance.post(`/auth/login`, {
        email: email,
        password: senha,
      });

      if (retorno.status === 200) {
      console.log(`retorno` + JSON.stringify(retorno.data));
        tokenJwt = retorno.data;

        armazenaDadosUsuario(tokenJwt['jwt-token']);

        navigation.navigate('Home');
        setLoad(false);
      } 

      else if(retorno.status === 400 || retorno.status === 401){
        setLoad(false);
        
      }    
      else {
        console.log('Erro ao realizar autenticacao');
        setLoad(false);
      }
    } catch (error) {
      console.log('Erro ao realizar a autenticação' + JSON.stringify(error));
      
      Alert.alert('Erro requisicao','Usuario ou senha invalidos');
      setLoad(false);
    }
  };


  if(load){
    return(
      <View style={styles.loading}>
        <ActivityIndicator size={'large'} />
        <Text>Aguarde....</Text>
      </View>
    )
  }

  return (
    <ImageBackground
    source={require('../../assets/image/livraria.jpg')}
    style = {styles.fundo}
    >
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Image
          style={{ height: '50%', width:"50%"}}
          source={require('../../assets/image/logo.png')}
        />
      </View>

      <View style={styles.conteudo}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          onChangeText={setEmail}
          value={email}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={setSenha}
          value={senha}
        />
      </View>

      <View style={styles.rodape}>
        <TouchableOpacity style={styles.botao} onPress={() => handleLogin()}>
          <Text style={styles.textoBotao}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
  );
};

export default Login;
