import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const UserData = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [showUsers, setShowUsers] = useState(true); 
    const [editableUserId, setEditableUserId] = useState(null); 
    const [editedUser, setEditedUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [editableProductId, setEditableProductId] = useState(null); 
    const [editedProduct, setEditedProduct] = useState({
        name: '',
        price: '',
        description: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userData = await axios.get('http://localhost:8080/users');
            setUsers(userData.data);

            const productData = await axios.get('http://localhost:8080/product');
            setProducts(productData.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:8080/product/${productId}`);
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleUserInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleProductInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const saveUserChanges = async (userId) => {
        try {
            await axios.patch(`http://localhost:8080/users/${userId}`, editedUser);
            setUsers(users.map(user => user._id === userId ? { ...user, ...editedUser } : user));
            setEditableUserId(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const saveProductChanges = async (productId) => {
        try {
            await axios.patch(`http://localhost:8080/product/${productId}`, editedProduct);
            setProducts(products.map(product => product._id === productId ? { ...product, ...editedProduct } : product));
            setEditableProductId(null);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="userDataContainer">
            <div className="sidebar">
                <button onClick={() => setShowUsers(true)}>Show Users</button>
                <button onClick={() => setShowUsers(false)}>Show Products</button>
            </div>
            <div className="dataSection">
                {showUsers ? (
                    <div>
                        <h2>Users</h2>
                        <div className="cardContainer">
                            {users.map(user => (
                                <div className="card" key={user._id}>
                                    <div className="cardDetails">
                                        {editableUserId === user._id ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    placeholder="Enter first name"
                                                    value={editedUser.firstName}
                                                    onChange={handleUserInputChange}
                                                />
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Enter last name"
                                                    value={editedUser.lastName}
                                                    onChange={handleUserInputChange}
                                                />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Enter email"
                                                    value={editedUser.email}
                                                    onChange={handleUserInputChange}
                                                />
                                                <input
                                                    type="password"
                                                    name="password"
                                                    placeholder="Enter password"
                                                    value={editedUser.password}
                                                    onChange={handleUserInputChange}
                                                />
                                                <button onClick={() => saveUserChanges(user._id)}>Save</button>
                                                <button onClick={() => setEditableUserId(null)}>Cancel</button>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>First Name: {user.firstName}</p>
                                                <p>Last Name: {user.lastName}</p>
                                                <p>Email: {user.email}</p>
                                                <p>Password: {user.password}</p>
                                                <button onClick={() => setEditableUserId(user._id)}>Update</button>
                                                <button onClick={() => deleteUser(user._id)}>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2>Products</h2>
                        <div className="cardContainer">
                            {products.map(product => (
                                <div className="card" key={product._id}>
                                    <img src={product.image} alt="Product" />
                                    <div className="cardDetails">
                                        {editableProductId === product._id ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Enter name"
                                                    value={editedProduct.name}
                                                    onChange={handleProductInputChange}
                                                />
                                                <input
                                                    type="number"
                                                    name="price"
                                                    placeholder="Enter price"
                                                    value={editedProduct.price}
                                                    onChange={handleProductInputChange}
                                                />
                                                <input
                                                    type="text"
                                                    name="description"
                                                    placeholder="Enter description"
                                                    value={editedProduct.description}
                                                    onChange={handleProductInputChange}
                                                />
                                                <button onClick={() => saveProductChanges(product._id)}>Save</button>
                                                <button onClick={() => setEditableProductId(null)}>Cancel</button>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>Name: {product.name}</p>
                                                <p>Price: {product.price}</p>
                                                <p>Description: {product.description}</p>
                                                <button onClick={() => setEditableProductId(product._id)}>Update</button>
                                                <button onClick={() => deleteProduct(product._id)}>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserData;