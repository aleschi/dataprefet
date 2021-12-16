import React from "react";
import Vueprogramme from "../components/Mouvements/Vueprogramme";
import IndexDB from "../components/DB/IndexDB";

class Home extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = { 
	      isLoggedIn: false,
	      statut: '',
	     };
	    
	}
	componentDidMount() {
      const url = "/check_user_status";
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ isLoggedIn: response.isLoggedIn, statut: response.statut }))
        .catch(() => this.props.history.push("/"));
  	}
    render() {
    return (  
		<div>
			{ (this.state.statut=="admin" || this.state.statut=="ministere") &&
			<IndexDB/>
			}
			{ (this.state.statut=="CBR" || this.state.statut=="prefet") &&
			<Vueprogramme />
			}
		</div>
    );
    }
}

export default Home;


