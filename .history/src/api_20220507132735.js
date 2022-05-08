import axios from "axios";

const api = axios.create({
  baseURL: "https://ddragon.leagueoflegends.com/cdn/11.14.1/data/pt_BR/championFull.json",
});

export default api;
