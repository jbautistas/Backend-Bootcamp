import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

export async function ObtainAuthToken() :Promise<string>{
  let endpoint = "/api/v1/login"
  let body = {
    email: Env.get("USER_ADMIN"),
    password: Env.get("PASS_ADMIN")
  }
  let axiosResponse = await axios.post(`${Env.get("PATH_APP") + endpoint}`, body)
  return axiosResponse.data["token"]
}