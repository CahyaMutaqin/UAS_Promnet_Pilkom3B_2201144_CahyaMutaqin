import React, { Component } from 'react';
import KeuanganService from '../services/KeuanganService';
import Swal from 'sweetalert2';

class UpdateKeuanganComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      date: '',
      description: '',
      amount: '',
      status: '',
      receiver: '',
      jk: '',
      no_telp: '',
      address: '',
      showNotification: false,
      notificationMessage: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    KeuanganService.getKeuanganById(this.state.id).then((res) => {
      let keuangan = res.data;
      this.setState({
        date: keuangan.date,
        description: keuangan.description,
        amount: keuangan.amount,
        status: keuangan.status,
        receiver: keuangan.receiver,
        jk: keuangan.jk || '',
        no_telp: keuangan.no_telp,
        address: keuangan.address,
      });
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleCancel() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your changes will not be saved!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.history.push('/');
      }
    });
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

    const updatedKeuangan = {
      date,
      description,
      amount,
      status,
      receiver,
      jk,
      no_telp,
      address,
    };

    KeuanganService.updateKeuangan(updatedKeuangan, this.state.id).then((res) => {
      Swal.fire({
        title: 'Success!',
        text: 'Data updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
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
                Update Data Transaksi
            </h2>
        </div>
        {this.state.showNotification && (
          <div className="alert alert-info text-center" role="alert">
            {this.state.notificationMessage}
          </div>
        )}
        <div className="row justify-content-center">
          <div className="col-md-8">
          <table className="table table-striped table-bordered" style={{ color: 'black', backgroundColor: 'white' }}>
              <tbody>
                <tr>
                  <td>Date:</td>
                  <td>
                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      value={this.state.date}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Description:</td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      className="form-control"
                      value={this.state.description}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Amount:</td>
                  <td>
                    <input
                      type="number"
                      name="amount"
                      className="form-control"
                      value={this.state.amount}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>
                    <select
                      name="status"
                      className="form-control"
                      value={this.state.status}
                      onChange={this.handleChange}
                    >
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
                      className="form-control"
                      value={this.state.receiver}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Jenis Kelamin:</td>
                  <td>
                    <select
                      name="jk"
                      className="form-control"
                      value={this.state.jk}
                      onChange={this.handleChange}
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
                      className="form-control"
                      value={this.state.no_telp}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>
                    <textarea
                      name="address"
                      className="form-control"
                      value={this.state.address}
                      onChange={this.handleChange}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-center">
            <button
  className="btn btn-success mr-2"
  type="submit"
  onClick={this.handleSubmit}
  style={{ backgroundColor: '#9370DB', color: 'white' }}
>
  Save
</button>

              <button
                className="btn btn-danger"
                type="button"
                onClick={this.handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateKeuanganComponent;
