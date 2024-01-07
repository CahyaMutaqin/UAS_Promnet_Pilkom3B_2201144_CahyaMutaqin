import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {currentIndex: 0,
            texts: [
                'Teks Pertama',
                'Teks Kedua',
                'Teks Ketiga'
            ]
        };
    }

    componentDidMount() {
        this.transitionText();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    transitionText() {
        let index = 0;
        this.interval = setInterval(() => {
            this.setState({
                currentIndex: index,
            });
            index = (index + 1) % this.state.texts.length;
        }, 2000); // Ganti setiap 2 detik
    }

    render() {
        const footerStyle = {
            backgroundColor: '#9370DB',
            position: 'fixed',
            left: '0',
            right: '0',
            bottom: '0',
            textAlign: 'center',
            padding: '10px 0',
            color: 'white',
            width: '100%',
        };
      
        const contentStyle = {
            paddingBottom: '60px', // Sesuaikan tinggi footer di sini
        };

        return (
            <div>
                <div style={contentStyle}>
                    {/* Semua konten Anda di sini */}
                </div>
                <footer style={footerStyle}>
                    <span>© 2024 Cahya Mutaqin</span>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;
