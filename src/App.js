import Header from "./components/header/header";
import Modal from "./components/modal/modal";
import Personnel from "./components/personnel/personnel";
import Statistics from "./components/statistics/statistics";
import NoData from "./components/no-data/noData";
import { useContext } from "react";
import ContextProvider from "./context/context";

function App() {
  const { dataUpload } = useContext(ContextProvider);

  return (
    <div className="App">
      <Header />
      <Modal />
      <main>
        {dataUpload.length > 0 ? (
          <>
            <Statistics />
            <Personnel />
          </>
        ) : (
          <NoData />
        )}
      </main>
    </div>
  );
}

export default App;
