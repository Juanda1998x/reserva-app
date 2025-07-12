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
import { EditProductPage } from "./pages/EditProductPage"
import { UserProvider } from "./Context/UserProvider"
import { ListUserPage } from "./pages/ListUserPage"
import { CharacteristicForm } from "./components/CharacteristicForm"
import { CharacteristicList } from "./pages/CharacteristicList"
import { AddCategoryPage } from "./pages/AddCategoryPage"


export const AppReservas = () => {
    return (
        <>
            <div className="container">

                <ProductProvider>
                    <UserProvider>
                
                    <Routes>

                        <Route element={<MainLayouth />}>
                            <Route path="/" element={<PaginaPrincipal />} />
                            <Route path="/ProductDetail/:id" element={<ProductDetailPage />} />
                        </Route>

                        <Route element={<AuthLayout />}>

                            <Route path="/auth/register" element={<CrearCuentaPage />} />
                            <Route path="/auth/login" element={<LoginPage />} />


                            <Route path="/admin" element={<AdminPage />} />
                            <Route path="/admin/agregar-producto" element={<AddProductPage />} />
                            <Route path="/admin/agregar-categoria" element={<AddCategoryPage />} />
                            <Route path="/admin/ver-productos" element={<ProductList />} />
                            <Route path="/admin/editar/:id" element={<EditProductPage />} />
                            <Route path="/admin/ver-usuarios" element={<ListUserPage />} />
                            <Route path="/admin/crear-caracteristica" element={<CharacteristicForm mode= "create"/>} />
                            <Route path="/admin/editar-caracteristica/:id" element={<CharacteristicForm mode= "edit"/>} />
                            <Route path="/admin/listar-caracteristica" element={<CharacteristicList />} />

                        </Route>


                        <Route path="/*" element={<Navigate to='/' />} />

                    </Routes>
                    </UserProvider>
                </ProductProvider>
                

            </div >

        </>
    )
}
