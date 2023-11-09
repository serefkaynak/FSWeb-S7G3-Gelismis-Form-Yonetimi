    import React, { useEffect } from "react";
    import { useState } from "react";
    import axios from "axios";
    import * as Yup from "yup";

    export default function Form({ yeniKullaniciEkle }) {
      const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        kosul: false,
      });
      const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        password: "",
        kosul: "",
      });

      const [formValid, setFormValid] = useState(false);

      const formSchema = Yup.object().shape({
        name: Yup.string().required("İsim Soyisim alanı gereklidir."),
        email: Yup.string()
          .email("Geçerli bir email adresi giriniz.")
          .required("Email alanı gereklidir."),
        password: Yup.string()
          .required("Şifre alanı gereklidir.")
          .min(8, "Şifre en az 8 karakter olmalıdır."),
        kosul: Yup.boolean().oneOf(
          [true],
          "Kullanım Koşullarını Kabul Etmelisiniz."
        ),
      });

      const submitHandler = (e) => {
        e.preventDefault();

        if (formValid) {
          
          // dataları axios ile servea gönderiliyor
          axios
            .post("https://reqres.in/api/users", formData)
            .then((res) => {
              console.log("Server dan cevap geldi.", res.data);
              //yeni kullanıcıyı app componentine gönder
              yeniKullaniciEkle(res.data);
            })
            .catch((err) => {
              console.log("Server dan hata geldi.", err);
            });
        } else {
          // kullanıcıyı bilgilendir.
          console.warn("Form Datası valid değil");
        }
        console.log("formData > ", formData);
      };

      const inputChangeHandler = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });

        Yup.reach(formSchema, name)
          .validate(type === "checkbox" ? checked : value)
          .then((valid) => {
            setFormErrors({
              ...formErrors,
              [name]: "",
            });
          })
          .catch((err) => {
            setFormErrors({
              ...formErrors,
              [name]: err.errors[0],
            });
          });
      };

      useEffect(() => {
        formSchema.isValid(formData).then((valid) => setFormValid(valid));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [formData]);

      useEffect(() => {
        console.error("formError :", formErrors);
      }, [formErrors]);

      return (
        <div>
          <form onSubmit={submitHandler}>
            <h2>Kullanıcı Formu</h2>
            <hr></hr>
            <div>
              <label>
                İsim Soyisim:
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={inputChangeHandler}
                  value={formData.name}
                />
              </label>
              {formErrors.name && (
                <div className="input-error">{formErrors.name}</div>
              )}
            </div>

            <div>
              <label>
                Email:
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={inputChangeHandler}
                  value={formData.email}
                />
              </label>
              {formErrors.email && (
                <div className="input-error">{formErrors.email}</div>
              )}
            </div>

            <div>
              <label>
                Şifre:
                <input
                  id="password"
                  type="password"
                  placeholder="**********"
                  name="password"
                  onChange={inputChangeHandler}
                  value={formData.password}
                />
              </label>
              {formErrors.password && (
                <div className="input-error">{formErrors.password}</div>
              )}
            </div>

            <div>
              <label>
                Kullanım Şartları:
                <input
                  id="kosul"
                  type="checkbox"
                  name="kosul"
                  onChange={inputChangeHandler}
                  checked={formData.kosul}
                />
              </label>
              {formErrors.kosul && (
                <div className="input-error">{formErrors.kosul}</div>
              )}
            </div>
            <div>
              <button id="user-form-btn"
              type="submit" disabled={!formValid}>
                Gönder
              </button>
            </div>
          </form>
        </div>
      );
    }
