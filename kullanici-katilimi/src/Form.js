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
        console.log(formData);
    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
    const handleFormDataChange = (event) => {
        setFormData({...formData,[event.target.name]: event.target.value })
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit} >
                    <p>
                    <label>
                    Name:
                    <input type="text"  placeholder='name giriniz' name="name" onChange={handleFormDataChange}/>
                    </label>
                    </p>

                    <p>
                    <label>
                    Email:
                    <input type="email" placeholder='email giriniz' name="email" onChange={handleFormDataChange}
                    />
                    </label>
                    </p>

                    <p>
                    <label>
                    Password
                    <input type="password" placeholder='*****' name="password" onChange={handleFormDataChange}/>
                    </label>
                    </p>

                    <p>
                    <label>
                    Okudum, Kabul Ediyorum.
                    <input type="checkbox" />
                    </label>
                    </p>

                    <p>
                    <button type='submit' onSubmit={handleSubmit}>
                        Submit
                    </button>
                    </p>
                    
                </form> 
            </div>
            
        </div>
    )
}