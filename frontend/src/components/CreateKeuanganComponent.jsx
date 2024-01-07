import React, { Component } from 'react';
import KeuanganService from '../services/KeuanganService';
import Swal from 'sweetalert2';

class CreateKeuanganComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      description: '',
      amount: '',
      status: '',
      receiver: '',
      jk: '',
      no_telp: '',
      address: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      date,
      description,
      amount,
      status,
      receiver,
      jk,
      no_telp,
      address,
    } = this.state;

    const newKeuangan = {
      date,
      description,
      amount,
      status,
      receiver,
      jk,
      no_telp,
      address,
    };


    KeuanganService.createKeuangan(newKeuangan).then((res) => {
      // Menampilkan notifikasi transaksi sukses dengan SweetAlert
      Swal.fire({
        title: 'Transaction Successful!',
        icon: 'success',
        confirmButtonText: 'OK',
        showCancelButton: false,
      }).then(() => {
        // Kembali ke halaman list setelah menekan OK
        this.props.history.push('/');
      });
    });
  }

  render() {
    return (
      <div className="container">
     <div className="text-center"> 
            <h2 className="font-weight-bold mt-5 mb-4" style={{
                color: 'white',
                borderBottom: '2px solid #9370DB',
                paddingBottom: '5px',
                textAlign: 'center',
                position: 'relative',
                transition: 'border-color 0.3s',
                display: 'inline-block',
                lineHeight: '1.2',
                margin: '0 auto',
            }}
            onMouseOver={(e) => { e.target.style.borderColor = '#764ABC' }}
            onMouseOut={(e) => { e.target.style.borderColor = '#9370DB' }}
            >
                Tambah Transaksi Baru
            </h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
          <table className="table table-striped table-bordered" style={{ color: 'black', backgroundColor: 'white' }}>
              <tbody>
                <tr>
                  <td>Date:</td>
                  <td>
                    <input
                      type="date"
                      name="date"
                      value={this.state.date}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Description:</td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Amount:</td>
                  <td>
                    <input
                      type="number"
                      name="amount"
                      value={this.state.amount}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                <td>Status:</td>
                <td>
                  <select
                    name="status"
                    value={this.state.status}
                    onChange={this.handleChange}
                    className="form-control"
                  >
                    <option value="">Pilih Status</option>
                    <option value="debit">Debit</option>
                    <option value="kredit">Kredit</option>
                  </select>
                </td>
              </tr>
                <tr>
                  <td>Receiver:</td>
                  <td>
                    <input
                      type="text"
                      name="receiver"
                      value={this.state.receiver}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                <td>Jenis Kelamin:</td>
                <td>
                  <select
                    name="jk"
                    value={this.state.jk}
                    onChange={this.handleChange}
                    className="form-control"
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="l">Laki-Laki</option>
                    <option value="p">Perempuan</option>
                  </select>
                </td>
              </tr>
                <tr>
                  <td>No Telepon:</td>
                  <td>
                    <input
                      type="text"
                      name="no_telp"
                      value={this.state.no_telp}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>
                    <input
                      type="text"
                      name="address"
                      value={this.state.address}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <form onSubmit={this.handleSubmit}>
              <div className="text-center">
              <button
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: '#9370DB', color: 'white' }}
            >
              Tambah Transaksi
            </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateKeuanganComponent;
