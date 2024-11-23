
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./cmps/Home.jsx"
import { About } from "./pages/About.jsx"


const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM


export function RootCmp() {


    return (
        <Router>
        <section className="app main-layout">
            <AppHeader />
            <main>
            <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
               <Route path="/about" element={<About />} />
                          
                       
            </Routes>
            </main>
        </section>
    </Router>
    )
}