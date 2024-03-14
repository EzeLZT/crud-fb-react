import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Edit = () => {
  const [description, SetDescription] = useState("");
  const [stock, SetStock] = useState(0);

  const navigate = useNavigate();
  const {id} = useParams();

  const update = async e => {
    e.preventDefault();
    const product = doc(db, "products", id);
    const data = {description: description, stock: stock}
    await updateDoc(product, data);
    navigate('/');
  }

  const getProductById = async id => {
    const product = await getDoc( doc(db, "products", id) )
    if(product.exists()) {
      // console.log(product.data());
      SetDescription(product.data().description);
      SetStock(product.data().stock)
    } else {
      console.log("Product not Found");
    }
  }

  useEffect(() => {
    // Llama a getProductById al montar el componente
    getProductById(id);
  }, [id]);


  return (
    <div className="container" style={{ backgroundColor: '#333333', color: '#ffffff', borderRadius: "10px", padding: "20px" }}>
      <div className="row">
        <div className="col">
          <h1>Edit Product</h1>

            {/* Formulario de Create Product */}
          <form onSubmit={update}>
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
            <button type="submit" className="btn btn-primary">Edit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit