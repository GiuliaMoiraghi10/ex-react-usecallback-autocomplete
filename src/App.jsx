import './App.css'

import { useState, useEffect } from 'react'

function App() {

  // variabile di stato per input (query usata come value dell'input)
  const [query, setQuery] = useState('')

  // variabile di stato per ricerca tramite chiamata (array inizialmente vuoto)
  // se c'è almeno un prodotto cercato ( e lo verifico con), lo stampo con map
  const [products, setProducts] = useState([])
  console.log(products)

  // ogni volta che scrivo una query nell'input, ci deve essere una funzione che aggiorna i prodotti(recuperati da chiamata fetch)
  // creo variabile per chiamata fetch
  // quindi creo useEffect che ogni volta che cambia una query, fa un controllo (fa un'operazione ad ogni cambio di stato)

  const fetchProducts = async (query) => {
    if (query.trim() === '') { //se la query è = ad una stringa vuota, mi ritorna un array vuoto. Faccio return per bloccare chiamate
      setProducts([])
      return
    }

    try {
      const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchProducts(query)
  }, [query])


  return (
    <>
      <h1>EX - Autocomplete</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='Cerca prodotto...'
        />
      </div>
      {products.length > 0 && (
        <div>
          {products.map((product) => (
            <p key={product.id}>{product.name}</p>
          ))}
        </div>
      )}
    </>
  )
}

export default App
