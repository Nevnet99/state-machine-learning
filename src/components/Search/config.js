import { assign, createMachine } from 'xstate';

const invokeFetchProducts = () => 
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(json=> json)


export const productsFetchMachine = createMachine({
    id: 'fetchProducts',
    initial: 'idle',
    context: {
        products: []
    },
    states: {
      idle: {
          on: {
              FETCH: { target: "loading" }
          }
      },
      loading: {
       invoke: {
           id: 'fetch-products',
           src: invokeFetchProducts,
           onDone: {
            target: 'success',
            actions: assign({ products: (_context, event) => event.data })
           },
           onError: 'error'
       }
      },
      success: {},
      error: {},
     
      
    }
  });