import './App.css';
import Form from './Form';
import React, { useState } from 'react';
import './index.css';



function App() {
  const [kullanicilar, setKullanicilar] = useState([]);
  
  const yeniKullaniciEkle = (yeniKullanici) => {
    setKullanicilar([...kullanicilar, yeniKullanici]);
  };

  return (
    <div className="App">
      {kullanicilar.map((kullanici) => (
        <div className='kullanici-container'>
          <p><strong>İsim:</strong>{kullanici.name}</p>
          <p><strong>Eposta:</strong>{kullanici.email}</p>
          <p>
            <strong>Kullanım Koşulları:</strong>
            {kullanici.kosul
              ? "Kullanıcı kosulları Onay"
              : "Kullanıcı kosulları Onay"}
          </p>
        </div>
      ))}
      <Form yeniKullaniciEkle={yeniKullaniciEkle} />
    </div>
  );
}

export default App;