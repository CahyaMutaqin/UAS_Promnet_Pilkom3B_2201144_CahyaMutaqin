import React, { Component } from 'react';
import KeuanganService from '../services/KeuanganService';
import Swal from 'sweetalert2';

class ListKeuanganComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keuangan: [],
      originalKeuangan: [],
      searchValue: '',
    };

    this.addKeuangan = this.addKeuangan.bind(this);
    this.editKeuangan = this.editKeuangan.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    KeuanganService.getKeuangan().then((res) => {
      if (res.data == null) {
        this.props.history.push('/');
      }
      this.setState({ keuangan: res.data, originalKeuangan: res.data });
    });
  }

  deleteKeuangan(id) {
    KeuanganService.deleteKeuangan(id)
      .then(() => {
        return KeuanganService.getKeuangan();
      })
      .then((res) => {
        this.setState({ keuangan: res.data });
      })
      .catch((error) => {
        console.error('Gagal menghapus data:', error);
        Swal.fire(
          'Gagal dihapus!',
          'Terjadi kesalahan saat menghapus data.',
          'error'
        );
      });
  }

  viewKeuangan(id) {
    this.props.history.push(`/view/${id}`);
  }

  editKeuangan(id) {
    this.props.history.push(`/update/${id}`);
  }

  addKeuangan() {
    this.props.history.push('/add/_add');
  }

  handleChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  handleSearch() {
    const { searchValue, keuangan } = this.state;
    const filteredKeuangan = keuangan.filter((item) => {
      for (let key in item) {
        if (
          item[key] &&
          typeof item[key] === 'string' &&
          item[key].toLowerCase().includes(searchValue.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });

    this.setState({ keuangan: filteredKeuangan });
  }

  handleBack() {
    this.setState({ keuangan: this.state.originalKeuangan, searchValue: '' });
  }
  
  handleDelete(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        KeuanganService.deleteKeuangan(id)
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            ).then(() => {
              // Refresh halaman setelah menekan OK
              window.location.reload();
            });
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
            Swal.fire(
              'Failed to delete!',
              'An error occurred while deleting data.',
              'error'
            );
          });
      }
    });
  }


  render() {
    return (
        <div>
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
                Data Transaksi
            </h2>
        </div>

          <div className="row">
            <div className="col">
              <button
                className="btn btn-primary"
                style={{ backgroundColor: '#9370DB', color: 'white' }}
                onClick={this.addKeuangan}
              >
                Tambah Transaksi
              </button>
            </div>
            <div className="col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Cari Data Transaksi"
                value={this.state.searchValue}
                onChange={this.handleChange}
                style={{ marginRight: '10px' }}
              />
              <button
                className="btn btn-primary"
                style={{ backgroundColor: '#9370DB', color: 'white', marginRight: '10px' }}
                onClick={this.handleSearch}
              >
                Cari
              </button>
              <button
                className="btn btn-primary"
                style={{ backgroundColor: '#9370DB', color: 'white' }}
                onClick={this.handleBack}
              >
                Back
              </button>
            </div>
          </div>
          <br />
          <div className="row">
          <table className="table table-striped table-bordered" style={{ color: 'black', backgroundColor: 'white' }}>
            <thead>
            <tr style={{ backgroundColor: '#9370DB', color: 'white', textAlign: 'center' }}>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Receiver</th>
                <th>JK</th>
                <th>No Telepon</th>
                <th>Address</th>
                <th>Option</th>
              </tr>
            </thead>
         <tbody>
            {this.state.keuangan.map(keuangan => (
                <tr key={keuangan.id}>
                <td>{keuangan.date}</td>
                <td>{keuangan.description}</td>
                <td>{keuangan.amount}</td>
                <td>{keuangan.status}</td>
                <td>{keuangan.receiver}</td>
                <td>{keuangan.jk}</td>
                <td>{keuangan.no_telp}</td>
                <td>{keuangan.address}</td>
                <td>
                    <button
                    onClick={() => this.viewKeuangan(keuangan.id)}
                    className="btn btn-info"
                    style={{ backgroundColor: '#9370DB', color: 'white' }}
                    >
                    View
                    </button>
                    <button
                    onClick={() => this.editKeuangan(keuangan.id)}
                    className="btn btn-info"
                    style={{ backgroundColor: '#9370DB', color: 'white', marginLeft: '10px' }}
                    >
                    Update
                    </button>
                    <button
                    onClick={() => this.handleDelete(keuangan.id)}
                    className="btn btn-danger"
                    style={{ marginLeft: '10px' }}
                    >
                    Delete
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
                    </table>
                    </div>
                </div>
                );
            }
            }

export default ListKeuanganComponent;
