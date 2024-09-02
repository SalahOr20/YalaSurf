import React from 'react';
import './Accueil.css';  // Assurez-vous que ce fichier est bien créé pour les styles
import videoSrc from '../assets/video/surf.mp4'; // Import de la vidéo

// Import des images pour la section blog
import blogImage1 from '../assets/bouznika.jpg';
import blogImage2 from '../assets/agadir.jpg';
import blogImage3 from '../assets/taghazout.jpg';

const Accueil = () => {
  return (
    <div className='AccueilPage'>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Digital Products For Business</h1>
          <p>Nunc lacus lacus sit amet accumsan est pulvinar non praesent tristique enim lorem phasellus auctor lacus.</p>
          <a href="#" className="cta-button">More Details</a>
        </div>
        <div className="scroll-indicator">
          <i className="fas fa-angle-down"></i>
        </div>
      </div>

      {/* "Meet Flowspark" Section */}
      <div className="meet-flowspark-section">
        <div className="meet-flowspark-content">
          <h2>Meet Flowspark</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis, lectus.</p>
        </div>
        <div className="meet-flowspark-details">
          <div className="video-placeholder">
            <video autoPlay loop muted>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="mission-statement">
            <h3>Our Mission</h3>
            <p>
              Aliquet risus feugiat in ante metus arcu dui vivamus arcu felis bibendum ut. Vestibulum lorem sed risus ultricies tristique nulla.
              Vitae et leo duis ut diam quam. Bibendum arcu vitae elementum curabitur vitae nunc. Dictumst vestibulum rhoncus est pellentesque.
              Lectus proin nibh nisl condimentum id. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.
            </p>
            <p>
              Massa id neque aliquam vestibulum morbi blandit. Nulla pellentesque dignissim enim sit amet venenatis.
            </p>
            <a href="/contact" className="cta-button">Contact Us</a>
          </div>
        </div>
      </div>

      {/* "Latest from Blog" Section */}
      <div className="latest-from-blog-section">
        <h2>Latest from Blog</h2>
        <p>Fusce dignissim blandit justo, eget elementum risus tristique. Nunc lacus lacus, sit amet accumsan est pulvinar non. Praesent tristique enim lorem.</p>
        <div className="blog-posts">
          <div className="blog-post">
            <img src={blogImage1} alt="Blog Post 1" />
            <div className="post-category">Agency News</div>
            <h3>Massa Vitae Toutor Condimentum Lacinia Quis</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
          </div>
          <div className="blog-post">
            <img src={blogImage2} alt="Blog Post 2" />
            <div className="post-category">News</div>
            <h3>Venenatis Urna Cursus Eget Nunc Scelerisque</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
          </div>
          <div className="blog-post">
            <img src={blogImage3} alt="Blog Post 3" />
            <div className="post-category">News</div>
            <h3>Donec Adipiscing Tristique Risus Nec Feugiat</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
