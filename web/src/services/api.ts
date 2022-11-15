import axios from "axios"

const token = localStorage.getItem("@bank:token")

export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  headers: { Authorization: `Bearer ${token}` },
})
