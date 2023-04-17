import { Routes, Route } from "react-router-dom";
import React from "react"
import Content from "./Content"
import Nav from "./Nav";


export default function App() {
    return (
        
        <div>
        <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/Nav/:id" element={<Nav />} />
        </Routes>
        </div>
        
    )
}
