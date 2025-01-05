
import Home from "./components/pages/Home"
import { ProductProvider } from "./context/useProducts"

function App() {

  return (
    <>
    <ProductProvider>
      <Home/>
    </ProductProvider>
    </>
  )
}

export default App
