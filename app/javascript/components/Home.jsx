import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

class Home extends React.Component {

    render() {
    return (  
		<div>
		  	<Header /> 
		  	<div className="page_container">
		  		<div className="titre_page">Ministère XX</div>
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Home;


