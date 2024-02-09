import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBBtn
} from 'mdb-react-ui-kit';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';


const Footer = () => {
    return (
        <MDBFooter className='bg-dark text-center text-white fixed-bottom mt-5'>
        <MDBContainer className='p-4 pb-0'>
          <section className='mb-4'>
            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <GitHubIcon href="https://github.com/BezzWax" />
            </MDBBtn>
  
            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <TelegramIcon href="https://t.me/eugene234" />
            </MDBBtn>
  
            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <LinkedInIcon href="https://www.linkedin.com/in/eugene-kolomiets-15a01b244/" />
            </MDBBtn>
            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <InstagramIcon />
            </MDBBtn>
  
          </section>
        </MDBContainer>
  
        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © {new Date().getFullYear()} Diploma project of Eugene Kolomiets
        </div>
      </MDBFooter>
    );
}

export default Footer;