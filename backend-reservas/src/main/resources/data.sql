INSERT INTO CATEGORY (name, image_url) VALUES
('Hoteles', 'https://images.unsplash.com/photo-1454388683759-ee76c15fee26?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Hostels', 'https://images.unsplash.com/photo-1626265774643-f1943311a86b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Departamentos', 'https://images.unsplash.com/photo-1563205237-bf0bdbf8f5a1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Bed and Breakfast', 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Resorts', 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Cabañas', 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Casas vacacionales', 'https://images.unsplash.com/photo-1607782984486-f1549c499162?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Habitaciones privadas', 'https://plus.unsplash.com/premium_photo-1670076505419-99468d952c61?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Camping / Glamping', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Alojamientos rurales', 'https://images.unsplash.com/photo-1716276012157-2b482bb344c3?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Motel', 'https://images.unsplash.com/photo-1563253814-b3055eafce93?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');



INSERT INTO usuario (name, last_name, email, password, age, conditions, role)
VALUES
('Admin','Admin','admin.example@gmail.com','$2a$12$Gchg6sUEd3K3tAB/cNA0SeYI8SuFlDdfpR8GPOJ8Ot5flQZtum6bi',19,true,'ADMIN'),
('Juan','Molano','juandmb98.jdm@gmail.com','$2a$12$Gchg6sUEd3K3tAB/cNA0SeYI8SuFlDdfpR8GPOJ8Ot5flQZtum6bi',19,true,'USER');


INSERT INTO product (name, description, category_id, city) VALUES
('Hotel Plaza', 'Hotel moderno con todas las comodidades', 1, 'Bogota'),
('Hostel Backpackers', 'Ideal para mochileros', 2, 'Cartagena'),
('Depto Palermo', 'Departamento acogedor en el centro', 3, 'Bogota'),
('Hotel Boutique Zen', 'Diseño y tranquilidad en un solo lugar', 1, 'Santa Marta'),
('Hostel Joven', 'Ambiente juvenil y desayuno incluido', 2, 'Santa Marta');




