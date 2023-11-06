import React from 'react';
import { useState } from 'react';
import axios from 'axios';


export default function Form () {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        kosul: false,
        rol:'',
    })

    const [kullanicilar, setKullanicilar] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Form Datası Çekildi:`,formData);

        if ( formData.email === 'waffle@syrup.com') {
            setErrorMessage('Bu mail adresi daha önce kullanılmıştır.');
            return;
        }

        axios
        .post("https://reqres.in/api/users", formData)
        .then((res) => {
            setKullanicilar([...kullanicilar, res.data]);
            console.log(`Form Datası API'a gönderildi.:`,kullanicilar);
            setErrorMessage('');
        })
        .catch((err) => {
            console.log(err);
        });

        setFormData({
            name: '',
            email: '',
            password: '',
            kosul: false,
            rol:'',
        });
    };
    
    const handleFormDataChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData({...formData,[event.target.name]: value });
    };

    return (
        <div>
          {errorMessage && <p >{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name">
                Name:
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleFormDataChange}
                  value={formData.name}
                />
              </label>
            </div>
  
            <div>
              <label htmlFor="email">
                Email:
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleFormDataChange}
                  value={formData.email}
                />
              </label>
            </div>
  
            <div >
              <label htmlFor="password">
                Password:
                <input
                  id="password"
                  type="password"
                  placeholder="**********"
                  name="password"
                  onChange={handleFormDataChange}
                  value={formData.password}
                />
              </label>
            </div>
  
            <div>
              <label htmlFor="kosul">
                Okudum, Kabul Ediyorum:
                <input
                  id="kosul"
                  type="checkbox"
                  name="kosul"
                  onChange={handleFormDataChange}
                  checked={formData.kosul}
                />
              </label>
            </div>
  
            <div >
              <label htmlFor="role">
                Rol:
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleFormDataChange}
                >
                  <option value="">Seçiniz</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="visitor">Visitor</option>
                </select>
              </label>
            </div>
  
            <div >
              <button type="submit" disabled={!formData.kosul}>
                Submit
              </button>
            </div>
          </form>
          <h2>Kullanıcılar</h2>
          <div>
            {kullanicilar.map((user) => (
              <p key={user.id}>
                {user.name} {user.email} {user.password} {user.rol} {String(user.kosul)}
              </p>
            ))}
          </div>
        </div>
      );
  }