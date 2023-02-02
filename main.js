import './style.css'
import javascriptLogo from './javascript.svg'

document.querySelector('#app').innerHTML = `
  <div>
  <h2 id='vite'>Hello Vite!</h2>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h3>Syncronous, Asyncronous, Promise, Async-Await</h3>
    <p>You can open the console and see the commented sentences on the code to see the explanation.</p>
  </div>
`;

// this asyncronous func (need a time first to return a value or result)
const fetchApi = () => {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        resolve(res.json())
      })
      .catch((err) => {
        reject(new Error(err.message))
      })
  })
};

console.log('sync func');

// this syncronous function
// syncronous func will execute the function according to the order of the lines
(function JsFuncSyncronous() {
  const data = fetchApi()
  console.log(data)

  // this 3 func console.log below will show the 'abc' on log without waiting the fetchApi func to done first
  // and after that, the fetchApi status will promise pending
  // beacuse it's should be called again to get the resultt
  console.log('a')
  console.log('b')
  console.log('c')
}());

console.log('\n');

//this syncronous function
(function JsFuncSyncronous() {

  // in this case, this fetchApi will log or return or will get the result beacuse we add the .then after the fetchApi  
  // but the conssole.log(res) will show after the console.log(abc), because fetchApi() need some time to fetch first and return the result
  // and syncronous function will still execute the func sequentially
  // even the log 'async func' on line 68 will show first before the console.log(res), 
  // because the fetchApi() not done yet to fetch the api and get the result to return

  fetchApi().then((res) => {
    console.log(res)
  })

  console.log('a')
  console.log('b')
  console.log('c')
}());

console.log('async func');

//this asyncronous function
(async function JsFuncAsyncronous() {

  // with async-await keyword, the console.log(abc) will wait the fetchApi() first, when it's done, then it'll execute the console.log(abc)
  await fetchApi().then((res) => {
    console.log(res)
  })

  console.log('a')
  console.log('b')
  console.log('c')
}());



// Promise All or async with 2 await //

const fetchUser1 = () => {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => {
        resolve(res.json())
      })
      .catch((err) => {
        reject(new Error(err.message))
      })
  })
};

const fetchUser2 = () => {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/users/2')
      .then((res) => {
        resolve(res.json())
      })
      .catch((err) => {
        reject(new Error(err.message))
      })
  })
};

// for just distinguish this section with section above, i'll use the console.warn
(async function PromiseAll_or_AsyncWith2Await() {

  // for call 2 function promise you can do like this: (with 2 await)
  await fetchUser1().then((res) => console.warn(res))
  await fetchUser2().then((res) => console.warn(res))

  // or this: (with promise.All)
  Promise.all([fetchUser1(), fetchUser2()]).then(
    ([result1, result2]) => {
      console.warn(result1)
      console.warn(result2)
    }
  )
}());