import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

export async function ObtainAuthToken() :Promise<string>{
  let endpoint = "/api/login"
  let body = {
    correo: "",
    contrasena: ""
  }
  let axiosResponse = await axios.post(`${Env.get("PATH_APP") + endpoint}`, body)
  return axiosResponse.data["token"]
}