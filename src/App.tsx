import "./App.css";
import Footer from "./components/Footer/Footer.js";
import Header from "./components/Header/Header.js";
import Main from "./components/Main/Main.js";
import { TaskProvider } from "./contexts/TaskProvider.js";
import { ToastProvider } from "./contexts/ToastProvider.js";

function App() {
  return (
    <TaskProvider>
      <ToastProvider>
        <>
          <Header />
          <Main />
          <Footer />
        </>
      </ToastProvider>
    </TaskProvider>
  );
}

export default App;
