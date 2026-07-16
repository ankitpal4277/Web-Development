import Navbar from "./components/Navbar"
import Card from "./components/Card"

function App() {

  return (
    <>
      <Navbar/>
      <div className="cards">
        <Card title="card 1" description=" This is card 1"/>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </>
  )
}

export default App
