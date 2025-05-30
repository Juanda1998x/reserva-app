import { Outlet } from "react-router-dom"
import '../Styles/AuthLayout.css';
import { Footer } from "./Footer";

export const AuthLayout = () => {
  return (
    <div className="auth-layouth">
        <main className="auth-content">
            <Outlet />
        </main>
         <Footer/>
    </div>
  )
}
