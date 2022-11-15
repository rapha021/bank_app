import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import App from "./App"
import LoginProvider from "./contexts/login.context"
import "react-toastify/dist/ReactToastify.css"
import RequestsProvider from "./contexts/requests.context"
import { GlobalStyle } from "./globalStyle"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <RequestsProvider>
          <ToastContainer />
          <GlobalStyle />
          <App />
        </RequestsProvider>
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
)
