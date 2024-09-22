const Footer = () => {
  return (
    <footer className="mt-5 p-1 text-center fixed-bottom">
      <div className="bg-success mt-20 p-0 strip"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-secondary mb-0 pb-0">
            <p className="mb-0 ">&copy; {new Date().getFullYear()} &nbsp;&nbsp;
              <a className=" text-decoration-none fst-italic fw-bolder text-secondary" href="https://github.com/gracepbarros">Grace Barros,&nbsp; </a>
              <a className=" text-decoration-none fst-italic fw-bolder text-secondary" href="htps://www.linkedin.com/in/muniribrahimi/"> Munir Ibrahimi,&nbsp;</a>
              <a className=" text-decoration-none fst-italic fw-bolder text-secondary" href="https://github.com/harpreet1o" >Harpreet.&nbsp; </a>
              All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;