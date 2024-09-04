import {BrowserRouter,Routes,Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Landing } from './components/Landing'
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { BlogRead } from './components/BlogRead'
import { BlogWrite } from './components/BlogWrite'
import { DetailBlogRead } from './components/DetailBlogRead'
function App() {

  return (
    <>
     <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/blogs/read' element={<BlogRead/>} />
        <Route path='/blogs/write' element={<BlogWrite/>} />
        <Route path='/blogs/:id' element={<DetailBlogRead/>}/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
