import React from 'react'
import fb from '../../img/sociel_img/facebook.png'
import linkedIn from '../../img/sociel_img/linkedIn.png'
import twitter from '../../img/sociel_img/twitter.png'
import Insta from '../../img/sociel_img/insta.png'
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="sb_footer  section_padding">
                <div className='namelink1'>
                    <div className='namelink2'>
                        <h4>For Bussiness</h4>
                        <a href='/employer'>
                            <p>Employer</p>
                        </a>
                        <a href='/healthplan'>
                            <p>Healthplan</p>
                        </a>
                        <a href='/individual'>
                            <p>Individual</p>
                        </a>

                    </div>
                    <div className='namelink2'>
                        <h4>Resouces</h4>
                        <a href='/resource'>
                            <p>Resouce Center</p>
                        </a>
                        <a href='/resource'>
                            <p>Testing</p>
                        </a>
                        <a href='/resource'>
                            <p>STV</p>
                        </a>

                    </div>
                    <div className='namelink2'>
                        <h4>Patners</h4>
                        <a href='/employer'>
                            <p>Swing tech</p>
                        </a>


                    </div>
                    <div className='namelink2'>
                        <h4>Company</h4>
                        <a href='/about'>
                            <p>AboutUs</p>
                        </a>
                        <a href='/press'>
                            <p>Press</p>
                        </a>
                        <a href='/career'>
                            <p>Career</p>
                        </a>
                        <a href='/contact'>
                            <p>Contact</p>
                        </a>


                    </div>
                    <div className='namelink2'>
                        <h4>Coming Soon on </h4>
                        <div className='social' >
                            <p><img src={fb} alt="" /></p>
                            <p><img src={twitter} alt="" /></p>
                            <p><img src={linkedIn} alt="" /></p>
                            <p><img src={Insta} alt="" /></p>

                        </div>
                    </div>

                </div>
                <hr style={{ width: '100%', color: 'white' }} />
                <div className='below'>
                    <div className='copyright'>
                        <p>
                            @{new Date().getFullYear()} IEH. All right reserved.
                        </p>

                    </div>
                    <div className='footer_below'>
                        <a href='/terms'><div><p>Terms and Conditions</p></div></a>
                        <a href='/privacy'><div><p>Privacy</p></div></a>
                        <a href='/security'><div><p>Security</p></div></a>
                        <a href='/cookie'><div><p>Cookie Declaration</p></div></a>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer;
