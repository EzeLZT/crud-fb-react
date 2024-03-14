import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

// Componente 
const Create = () => {
  // Hook de estado que registra la descricion del producto
  const [description, SetDescription] = useState("");
  
  // Hook de estado que regitsra el stock del producto
  const [stock, SetStock] = useState(0);

  // Permite viajar entre diferentes rutas dentro de react
  const navigate = useNavigate();

  // Crea una referencia a la colección llamada "products" en Firebase Firestore
  const productsCollection = collection(db, "products");

  // funcion anonima en la que creamos de manera asincrona el nuevo producto, cuando se envia 
  const store = async (e) => {
    e.preventDefault();
    await addDoc(productsCollection, {
      description: description,
      stock: stock,
    });
  };

  console.log(description);
  console.log(stock);

  return (
    <div className="container" style={{ backgroundColor: '#333333', color: '#ffffff', borderRadius: "10px", padding: "20px" }}>
      <div className="row">
        <div className="col">
          <h1>Create Product</h1>

            {/* Formulario de Create Product */}
          <form onSubmit={store}>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                value={description}
                onChange={(e) => SetDescription(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input
                value={stock}
                onChange={(e) => SetStock(e.target.value)}
                type="number"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">Store</button>
          </form>
          <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>
          Go to Show Page
        </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
