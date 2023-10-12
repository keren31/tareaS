import React, { Component } from 'react';
import CryptoJS from 'crypto-js';
import './estilo.css'; // Importa tu archivo CSS

class CaesarCipherApp extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      action: 'encrypt', // Valor inicial para cifrar
      key: 0,
      result: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { text, action, key } = this.state;
    let result = '';

    if (action === 'encrypt') {
      result = CryptoJS.AES.encrypt(text, key.toString()).toString();
    } else if (action === 'decrypt') {
      try {
        const bytes = CryptoJS.AES.decrypt(text, key.toString());
        result = bytes.toString(CryptoJS.enc.Utf8);
      } catch (error) {
        result = 'Error al descifrar. Asegúrate de usar la clave correcta.';
      }
    }

    this.setState({ result });
  };

  render() {
    return (
      <div>
        <h1>Cifrado simetrico</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Texto:
            <input type="text" name="text" value={this.state.text} onChange={this.handleInputChange} />
          </label>
          <label>
            Acción:
            <select name="action" value={this.state.action} onChange={this.handleInputChange}>
              <option value="encrypt">Cifrar</option>
              <option value="decrypt">Descifrar</option>
            </select>
          </label>
          <label>
            Clave:
            <input type="text" name="key" value={this.state.key} onChange={this.handleInputChange} />
          </label>
          <button type="submit">Ejecutar</button>
        </form>
        <div>
          <h2>Resultado:</h2>
          <p>{this.state.result}</p>
        </div>
      </div>
    );
  }
}

export default CaesarCipherApp;
