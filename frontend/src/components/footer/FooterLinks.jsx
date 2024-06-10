import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logoImg from "../../assets/images/blacklogo.png";
import { Link } from "react-router-dom";

function FooterLinks(){

    return(
        <>
                {/* Contact Section */}
            <section className="contact-section">
                <div className="container contact">
                    <div className="contact-icon">
                        <Link to="https://www.facebook.com/" target="blank">
                            <FaFacebookF className="i" />
                        </Link>
                        <Link to="https://x.com/" target="blank">
                            <FaTwitter className="i" />
                        </Link>
                
                    </div>

                    <h2>Nos réseaux sociaux</h2>

                    <div className="contact-icon">
                    <Link to="https://www.instagram.com/" target="blank">
                        <FaInstagram className="i" />
                    </Link>
                    <Link to="https://youtube.com/" target="blank">
                        <FaYoutube className="i" />
                    </Link>
                    </div>

                </div>

            </section>
            {/* Footer Links */}
            <section className="footer-section">
                <div className="container footer">
                <div className="footer-logo">
                    <img src={logoImg} alt="logo" />
                </div>

                <div className="footer-menu">
                    <p className="link-heading">Service clientèle</p>
                    <ul className="nav-ul footer-links">
                    <li>
                        <a href="#">Mentions légales</a>
                    </li>
                    <li>
                        <a href="#">Politique de confidentialité</a>
                    </li>
                    <li>
                        <a href="#">Politique de remboursement</a>
                    </li>
                    <li>
                        <a href="#">FAQ</a>
                    </li>
                    </ul>
                </div>

                <div className="footer-menu">
                    <p className="link-heading">K-BEAUTY</p>
                    <ul className="nav-ul footer-links">
                    <li>
                        <a href="#">Qui sommes-nous ?</a>
                    </li>
                    <li>
                        <a href="#">Conditions d'utilisation</a>
                    </li>
                    <li>
                        <a href="#">Support</a>
                    </li>
                    <li>
                        <a href="#">Docs</a>
                    </li>
                    </ul>
                </div>

                <div className="footer-menu">
                    <p className="link-heading">Info</p>
                    <ul>
                    <ul className="nav-ul footer-links">
                        <li>
                        <a href="#">Recherche</a>
                        </li>
                        <li>
                        <a href="#">Equipe</a>
                        </li>
                        <li>
                        <a href="#">Job</a>
                        </li>
                        <li>
                        <a href="#">Contact</a>
                        </li>
                    </ul>
                    </ul>
                </div>
                </div>
            </section>
        </>
  );
}

export default FooterLinks;