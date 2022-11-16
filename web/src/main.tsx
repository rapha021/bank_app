import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import App from "./App"
import LoginProvider from "./contexts/login/login.context"
import "react-toastify/dist/ReactToastify.css"
import RequestsProvider from "./contexts/requests/requests.context"
import { GlobalStyle } from "./globalStyle"
import RegisterProvider from "./contexts/register/register.context"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <RegisterProvider>
          <RequestsProvider>
            <ToastContainer />
            <GlobalStyle />
            <App />
          </RequestsProvider>
        </RegisterProvider>
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
)
