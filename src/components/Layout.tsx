import { Outlet } from "react-router-dom"

export const Layout = () => {

    return (
    <>
    <h1>Zoo</h1>
    <main><Outlet></Outlet></main>
    </>
    )
}