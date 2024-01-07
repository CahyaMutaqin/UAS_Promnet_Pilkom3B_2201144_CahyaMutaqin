import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: ['Selamat datang', 'Web Cahya Mutaqin', 'Transaksi Keuangan'],
            currentIndex: 0,
            currentText: '',
        };
    }

    componentDidMount() {
        this.updateText();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateText() {
        const { titles, currentIndex } = this.state;
        const text = titles[currentIndex];

        let index = 0;
        this.interval = setInterval(() => {
            if (index === text.length) {
                clearInterval(this.interval);
                setTimeout(() => {
                    this.setState(
                        (prevState) => ({
                            currentIndex: (prevState.currentIndex + 1) % titles.length,
                        }),
                        () => {
                            setTimeout(() => {
                                this.updateText();
                            }, 1000); // Jeda sebelum teks baru dimulai
                        }
                    );
                }, 1000); // Jeda setelah teks terakhir selesai ditampilkan
            } else {
                this.setState({
                    currentText: text.substring(0, index + 1),
                });
                index++;
            }
        }, 100); // Jeda antara setiap karakter
    }

    render() {
        const { currentText } = this.state;

        return (
            <div>
                <header>
                    <nav className="navbar navbar-dark" style={{ backgroundColor: '#9370DB' }}>
                        <Link to="/listkeuangan" className="navbar-brand" style={{ marginLeft: '50px', fontWeight: 'bold', fontSize: '20px' }}>
                            {currentText}
                        </Link>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link" style={{ marginRight: '200px', fontWeight: 'bold', fontSize: '20px', color: 'white' }}>
                                    Home
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;
