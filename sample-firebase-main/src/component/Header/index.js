import React from 'react';
import './index.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <img src="/images/national_logo.png" alt="App Logo" className="app-logo" />
                
                 <div className="logo-text">
                    <h1>My Studies</h1>
                    <p>Γραμματείες Πανεπιστημίου Αθηνών</p>
                </div>
            </div>
            <div className='national-and-kapodistrian'>
                <p>ΕΘΝΙΚΟΝ & ΚΑΠΟΔΙΣΤΡΙΑΚΟ ΠΑΝΕΠΙΣΤΗΜΙΟ ΑΘΗΝΩΝ</p>
            </div>
           
            {/* Add other header content or navigation links as needed */}
        </header>
    );
};

export default Header;