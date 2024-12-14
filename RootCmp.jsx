
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { Reviews } from "./cmps/Reviews.jsx"
import { AddReview } from "./cmps/AddReview.jsx"
import { AddBook } from "./cmps/AddBook.jsx"
import { AboutGoal } from "./cmps/AboutCmps/AboutGoal.jsx"
import { AboutTeam } from "./cmps/AboutCmps/AboutTeam.jsx"

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
               <Route path="/about" element={<About />}>
                            <Route path="/about/team" element={<AboutTeam />} />
                            <Route path="/about/goal" element={<AboutGoal />} />
                        </Route> 
               <Route path="/book" element={<BookIndex />} />
               <Route path="/book/add" element={<AddBook />} />
               <Route path="/book/:bookId" element={<BookDetails />} />
               <Route path="/book/edit" element={<BookEdit />} />
                <Route path="/book/edit/:bookId" element={<BookEdit />} />
    

                <Route path="*" element={<NotFound />} />
            </Routes>
            </main>
        </section>
    </Router>
    )
}