import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PromoProvider } from "./context/PromoContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Promo from "./pages/Promo";
import Order from "./pages/Order";
import { OrderProvider } from "./context/OrderContext";
import History from "./pages/History";
import { HistoryProvider } from "./context/HistoryContext";

function App() {
  return (
    <Router>
      <PromoProvider>
        <OrderProvider>
          <HistoryProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/promo" element={<Promo />} />
              <Route path="/order" element={<Order />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </HistoryProvider>
        </OrderProvider>
      </PromoProvider>
    </Router>
  );
}

export default App;
