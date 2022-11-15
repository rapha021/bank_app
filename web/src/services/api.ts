import axios from "axios"

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyNzQ5MDgyLTRiZWQtNGVmZi05ODEwLWU4MGJmMjA4OTU1MyIsImlhdCI6MTY2ODUwMDY0MSwiZXhwIjoxNjY4NTg3MDQxfQ.UV2hxpsPidKwu8YHTFm6szIUI3_szFsFT2RDwA38spk"

export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  headers: { Authorization: `Bearer ${token}` },
})
