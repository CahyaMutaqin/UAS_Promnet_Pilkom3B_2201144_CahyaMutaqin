import React, { Component } from "react";
import { Link } from "react-router-dom";
import KeuanganService from "../services/KeuanganService";

class ViewKeuanganComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      keuangan: {},
    };
  }

  componentDidMount() {
    KeuanganService.getKeuanganById(this.state.id).then((res) => {
      this.setState({ keuangan: res.data });
    });
  }

  render() {
    const { keuangan } = this.state;

    return (
      <div className="container mt-4">
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
                  Detail Transaksi
              </h2>
          </div>
    <div className="card mx-auto" style={{ width: "50%" }}>
        <div className="card-body">
            <div className="table-responsive">
                      <table className="table table-striped table-bordered" style={{ color: 'black', backgroundColor: 'white' }}>
                    <tbody>
                  <tr>
                    <td>ID :</td>
                    <td>{keuangan.id}</td>
                  </tr>
                  <tr>
                    <td>Receiver :</td>
                    <td>{keuangan.receiver}</td>
                  </tr>
                  <tr>
                    <td>Date :</td>
                    <td>{keuangan.date}</td>
                  </tr>
                  <tr>
                    <td>Jenis Kelamin :</td>
                    <td>{keuangan.jk}</td>
                  </tr>
                  <tr>
                    <td>Description :</td>
                    <td>{keuangan.description}</td>
                  </tr>
                  <tr>
                    <td>Nomor Telepon :</td>
                    <td>{keuangan.no_telp}</td>
                  </tr>
                  <tr>
                    <td>Amount :</td>
                    <td>{keuangan.amount}</td>
                  </tr>
                  <tr>
                    <td>Address :</td>
                    <td>{keuangan.address}</td>
                  </tr>
                  <tr>
                    <td>Status :</td>
                    <td>{keuangan.status}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center mt-3">
              <Link
                to="/"
                className="btn"
                style={{ backgroundColor: "#9370DB", color: "white" }}
              >
                Back
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewKeuanganComponent;
