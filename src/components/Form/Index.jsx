import { Container } from '@mui/material'
import Styles from "./form.module.css"
import React, { useState } from 'react'

export default function SingInForm() {
  const [data, setData] = useState({
    fullName: '',
    email: '',
    status: '',
    gender: '',
  });
// para pegar os inputs com useState
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      const newData = { ...prev, [name]: value };
      return newData;
    })
  };

  // calcular progresso do preenchimento do formulario
  const calculateProgress = () => {
    let value = 0 
    let addValue = 25
    if(data.fullName){
      const explodeString = data.fullName.split(' ')
      if(explodeString[1]){
        value += addValue;
      }
    }
    if(data.email){
      let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if(pattern.test(data.email)){
        value += addValue;
      }
    }
    if(data.status){
      value += addValue;
    }
    if(data.gender){
      value += addValue;
    }
    return value
  }

  calculateProgress();

  const handleClick = () => {
    alert("Formulário enviado com sucesso!");
    setData({
      fullName: '',
      email: '',
      status: '',
      gender: '',
    })
  }
  return (
    <Container sx={{
      width: "100%", 
      height: "60vh", 
      margin: "0 auto", 
      border: "1px solid black",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly"}}>

      <div className={Styles.barContainer}>
        <div className={Styles.bar} style={{width: `${calculateProgress()}%`}}></div>
      </div>
      <div className={Styles.formGroup}>
        <label htmlFor="">Nome Completo</label>
        <input name="fullName" value={data.fullName} onChange={handleChange} />
      </div>
      <div className={Styles.formGroup}>
        <label htmlFor="">E-mail</label>
        <input name="email" value={data.email} onChange={handleChange} />
      </div>
      <div className={Styles.formGroup}>
        <label htmlFor="">Estado Civil</label>
        <select name="status" value={data.status} onChange={handleChange} >
          <option value="">- selecione...</option>
          <option value="solteiro">Solteiro</option>
          <option value="casado">Casado</option>
          <option value="divorciado">Divorciado</option>
        </select>
      </div>
      <div className={Styles.formGroup}>
        <label htmlFor="">Gênero</label>
        <div className="radios-container">
          <span>
            <input type="radio" name='gender' 
              value="masculino" onChange={handleChange} 
              checked={data.gender === 'masculino'} /> Masculino
          </span>
          <span>
            <input type="radio" name='gender' 
              value="feminino" onChange={handleChange} 
              checked={data.gender === 'feminino'} /> Feminino
          </span>
          <span>
            <input type="radio" name='gender' 
              value="naoDeclarado" onChange={handleChange} 
              checked={data.gender === 'naoDeclarado'} /> Não declarar
          </span>
        </div>
      </div>
      <button onClick={handleClick} disabled={calculateProgress() !== 100}>
        Enviar Formulário
      </button>
    </Container>    

  )
}
