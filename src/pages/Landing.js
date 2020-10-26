import './Landing.css';


const LandingPage = () => {
    return (
        <div className="main">
          <header className="main-header">
            <h1 className="main-title">
              Connecting students virtually
            </h1>
            <a
              className="get-started"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get started
            </a>
            <div className='sub-title-container'>
                <h3 className='sub-title-prompt'> Are you a professor? </h3>
                <h3 className='sub-title-cta'> Add your class</h3>
            </div>
          </header>
        </div>
    );
}

export default LandingPage;