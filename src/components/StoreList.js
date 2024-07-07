// src/components/StoreList.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';

const StoreList = () => {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axiosInstance.get('/stores');
                setStores(response.data);
            } catch (error) {
                console.error('Error fetching stores:', error);
            }
        };

        fetchStores();
    }, []);

    return (
        <div>
            <h1>Stores</h1>
            <ul>
                {stores.map(store => (
                    <li key={store.id}>{store.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default StoreList;
