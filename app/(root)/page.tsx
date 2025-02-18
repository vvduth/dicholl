import React from 'react'
const delay = (ms : number) => new Promise(res => setTimeout(res, ms))
const Home = async () => {
  await delay(1000)
  return (
    <div>Home</div>
  )
}

export default Home