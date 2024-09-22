const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <div className="bg-success mt-20 p-0 strip"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-warning">
            <p>&copy; {new Date().getFullYear()} 
              <a href="https://github.com/gracepbarros">Grace Barros, </a>
              <a href="hhtps://www.linkedin.com/in/muniribrahimi/" >Munir Ibrahimi,</a>
              <a href="https://github.com/harpreet1o" >Harpreet </a>
              . All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;