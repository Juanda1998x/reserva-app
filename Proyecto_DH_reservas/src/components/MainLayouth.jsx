import { Footer } from "./Footer"
import { Header } from "./Header"
import '../Styles/MainLayouth.css';
import { Outlet } from "react-router-dom";


export const MainLayouth = () => {
    return (
        <div className="main-layouth">
            <Header/>
            <main className="content">
                <Outlet />
            </main>
            <Footer/>
        </div>
    )
}
