import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import { AuthProvider } from "./context/AuthProvider";
import { InfoClienteProvider } from "./context/InfoClienteProvider";
import { FranjasProvider } from "./context/FranjasProvider";
import { DataExtraProvider } from "./context/DataExtraProvider";
import { PowerProvider } from "./context/PowerProvider";
import { ConsumosAnualesProvider } from "./context/ConsumosAnualesProvider";
import "./App.css";

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ConsumosAnualesProvider>
            <InfoClienteProvider>
              <DataExtraProvider>   
                <FranjasProvider>             
                  <PowerProvider>
                      <Header />
                      <Main />
                  </PowerProvider>
                </FranjasProvider>
              </DataExtraProvider>
            </InfoClienteProvider>
          </ConsumosAnualesProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
