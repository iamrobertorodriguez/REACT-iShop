import React from 'react';
import '../styles/footer.css'

const Footer = () => {
    return (
        <footer id='footer'>
            <div id="footer-info">
                <p>API consumption example</p>
                <p>Endpoint: https://ecommerce-api-react.herokuapp.com/api/v1/</p>
                <p>Contact:</p>
                <p>iamrobertorodriguez@proton.me</p>
                <p>iamrobertorodriguez.netlify.app</p>
                <p>Copyright © 2022: Roberto Rodríguez, México 55070</p>
                <p>Hecho con ❤ en Academlo.</p>
            </div>
        </footer>
    );
};

export default Footer;