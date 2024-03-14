import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Show = () => {
  //1 - Configuracion de Hooks
  const [products, SetProducts] = useState([]);

  //2 - Referenciamos a la DB firestores
  const productsCollection = collection(db, "products");

  //3 - Funcion para mostrar TODOS los docs
  const getProducts = async () => {
    const data = await getDocs(productsCollection);

    SetProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //4 - Funcion para eliminar un doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    getProducts();
  };

  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = async (id) => {
    MySwal.fire({
      title: "Remove the product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Realiza la eliminación del producto
        await deleteProduct(id);

        // Muestra un cuadro de diálogo de éxito
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  //6 - Usamos UseEffect
  useEffect(() => {
    getProducts();
  }, []);

  //7 - Devolvemos vista de nuestro componente

  return (
    <>
      <div className="container">
        <h1  style={{ backgroundColor: '#023047', color: '#fff', padding: '5px 0 9px 0', borderRadius: "10px" }}>Create your Product</h1>
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <Link to="/create" className="btn btn-secondary mt-2 mb-2">
                Create
              </Link>
            </div>
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr keys={product.id}>
                    <td>{product.description}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Link
                        to={`/edit/${product.id}`}
                        
                        style={{fontSize: "1.2em", backgroundColor: "white", color: "black", padding: "5px 10px", borderRadius: "5px"}}
                      >
                        <i className="material-icons">create</i>
                      </Link>
                      <button
                        onClick={() => {
                          confirmDelete(product.id);
                        }}
                        style={{ padding: "4px 10px", transform: 'translate(2px,1px)', backgroundColor: "red", borderRadius: "5px"}}
                      >
                        <i className="material-icons">delete</i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
