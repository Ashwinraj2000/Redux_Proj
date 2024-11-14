import Product from './Product'
import Header from './Header'
import {Provider} from 'react-redux'
import store from './store/store'

function App() {
  return (
   <Provider store={store}>
      <Header></Header>
       <Product></Product>
   </Provider>
  )
}

export default App
