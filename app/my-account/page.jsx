// pages/account/info.js
"use client";
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function AccountInformation() {
  const [editMode, setEditMode] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 (555) 123-4567',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      isDefault: true
    }
  ]);
  const [newAddress, setNewAddress] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    isDefault: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitNewAddress = (e) => {
    e.preventDefault();
    const newId = Math.max(...addresses.map(a => a.id)) + 1;
    const updatedAddresses = [...addresses, { ...newAddress, id: newId }];
    
    // If this new address is set as default, update others
    if (newAddress.isDefault) {
      updatedAddresses.forEach(addr => {
        addr.isDefault = addr.id === newId;
      });
    }
    
    setAddresses(updatedAddresses);
    setNewAddress({
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      isDefault: false
    });
    setShowAddAddress(false);
  };

  const setAsDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const removeAddress = (id) => {
    // Don't allow removing the last address
    if (addresses.length <= 1) return;
    
    // If removing default address, set another one as default
    const addressToRemove = addresses.find(a => a.id === id);
    const updatedAddresses = addresses.filter(a => a.id !== id);
    
    if (addressToRemove.isDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }
    
    setAddresses(updatedAddresses);
  };

  const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Account Information | Your E-Commerce Store</title>
        <meta name="description" content="Manage your account information" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <nav className="space-y-1">
              <Link href="/account/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Dashboard
              </Link>
              <Link href="/my-orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                My Orders
              </Link>
              <Link href="/account/info" className="block px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-md">
                Account Information
              </Link>
              <Link href="/account/addresses" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Address Book
              </Link>
              <Link href="/account/wishlist" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Wishlist
              </Link>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Sign Out
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Delivery Address</h2>
              <button
                onClick={() => setShowAddAddress(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add New Address
              </button>
            </div>

            {/* Default Address */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                Default Shipping Address
                <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  Default
                </span>
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {defaultAddress.firstName} {defaultAddress.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{defaultAddress.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-900">{defaultAddress.address}</p>
                    <p className="text-sm text-gray-900">
                      {defaultAddress.city}, {defaultAddress.state} {defaultAddress.zipCode}
                    </p>
                    <p className="text-sm text-gray-900">{defaultAddress.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Addresses */}
            {addresses.length > 1 && (
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Other Addresses</h3>
                <div className="space-y-4">
                  {addresses
                    .filter(addr => !addr.isDefault)
                    .map(address => (
                      <div key={address.id} className="border p-4 rounded-lg relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {address.firstName} {address.lastName}
                            </p>
                            <p className="text-sm text-gray-500">{address.phone}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-900">{address.address}</p>
                            <p className="text-sm text-gray-900">
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                            <p className="text-sm text-gray-900">{address.country}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-3">
                          <button
                            onClick={() => setAsDefault(address.id)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Set as Default
                          </button>
                          <button
                            onClick={() => removeAddress(address.id)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Add New Address Form */}
            {showAddAddress && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Address</h3>
                <form onSubmit={handleSubmitNewAddress}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={newAddress.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={newAddress.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={newAddress.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isDefault"
                        name="isDefault"
                        checked={newAddress.isDefault}
                        onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                        Set as default shipping address
                      </label>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={newAddress.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={newAddress.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={newAddress.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP/Postal Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={newAddress.zipCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={newAddress.country}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
}