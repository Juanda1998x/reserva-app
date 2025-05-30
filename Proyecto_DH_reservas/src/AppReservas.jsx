import { Header } from "./components/Header"
import { Navigate, Route, Routes } from "react-router"
import { PaginaPrincipal } from "./pages/PaginaPrincipal"
import { CrearCuentaPage } from "./pages/CrearCuentaPage"
import { LoginPage } from "./pages/LoginPage"
import { MainLayouth } from "./components/MainLayouth"
import { AuthLayout } from "./components/AuthLayout"
import { AdminPage } from "./pages/AdminPage"
import { AddProductPage } from "./pages/AddProductPage"
import { ProductDetailPage } from "./pages/ProductDetailPage"
import { ProductProvider } from "./Context/ProductProvider"
import { AdminRoute } from "./components/AdminRoute"
import { ProductList } from "./pages/ProductList"


export const AppReservas = () => {
    return (
        <>
            <div className="container">
                <ProductProvider>
                    <Routes>

                        <Route element={<MainLayouth />}>
                            <Route path="/" element={<PaginaPrincipal />} />
                            <Route path="/ProductDetail/:id" element={<ProductDetailPage />} />
                        </Route>

                        <Route element={<AuthLayout />}>

                            <Route path="/crear_cuenta" element={<CrearCuentaPage />} />
                            <Route path="/login" element={<LoginPage />} />


                            <Route path="/admin" element={<AdminPage />} />
                            <Route path="/admin/agregar-producto" element={<AddProductPage />} />
                            <Route path="/admin/ver-productos" element={<ProductList />} />

                        </Route>


                        <Route path="/*" element={<Navigate to='/' />} />

                    </Routes>
                </ProductProvider>

            </div >

        </>
    )
}
