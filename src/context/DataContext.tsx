import React, {createContext, useState} from 'react';
import jwt_decode from 'jwt-decode';

import {DadosUsurarioType} from '../models/DadosUsuarioTyoe';

export const DataContext = createContext({});

export const DataProvider = ({children}) => {
  const [dadosUsaurio, setDadosUsaurio] = useState<DadosUsurarioType>();

  const armazenaDadosUsuario = (jwt: any) => {
    var TokeDecodificado: any = jwt_decode(jwt);

    var usuario = TokeDecodificado.usuario;
    usuario = JSON.parse(usuario);

    setDadosUsaurio({
      id: usuario?.userId,
      nome: usuario?.usuarioNome,
      email: usuario?.userEmail,
      token: jwt,
    });
  };
  return(
    <DataContext.Provider value = {{
        dadosUsaurio,
        armazenaDadosUsuario
    }}>
        {children}
    </DataContext.Provider>
  )
};
