import React from 'react'
import Notes from '../../components/Notes'


function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Miniture Vite + React demo website.</p>
      <p>It uses NodeJs, Express, and MongoDB as a backend</p>

      <Notes/>
    </div>
  )
}

export default Home
