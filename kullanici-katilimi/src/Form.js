import React from 'react';
import { useState } from 'react';
import axios from 'axios';


export default function Form () {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        kosul: false
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Form Datası Çekildi:`,formData);

        axios
        .post("https://reqres.in/api/users", formData)
        .then((res) => {console.log(`Form Datası API'a gönderildi.:`,res.data);})
        .catch((err) => {console.log(err);});

        setFormData({
            name: '',
            email: '',
            password: '',
            kosul: false
        });
    }
    
    const handleFormDataChange = (event) => {
        setFormData({...formData,[event.target.name]: event.target.value })
    }

    return (
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <p>
              <label>
                Name:
                <input
                  type="text"
                  placeholder="name giriniz"
                  name="name"
                  onChange={handleFormDataChange}
                  value={formData.name}
                />
              </label>
            </p>

            <p>
              <label>
                Email:
                <input
                  type="email"
                  placeholder="email giriniz"
                  name="email"
                  onChange={handleFormDataChange}
                  value={formData.email}
                />
              </label>
            </p>

            <p>
              <label>
                Password
                <input
                  type="password"
                  placeholder="*****"
                  name="password"
                  onChange={handleFormDataChange}
                  value={formData.password}
                />
              </label>
            </p>

            <p>
              <label>
                Okudum, Kabul Ediyorum.
                <input 
                    type="checkbox"
                    name="kosul"
                    onChange={handleFormDataChange}
                    checked={formData.kosul}
                    value={formData.kosul}
                />
              </label>
            </p>

            <p>
              <button 
                type="submit" 
                onSubmit={handleSubmit}
                value="Submit"
                disabled={formData.kosul ? false : true}
                style={{backgroundColor: formData.kosul ? "green" : "red"}}
              >
                Submit
              </button>
            </p>
          </form>
        </div>
      </div>
    );
}